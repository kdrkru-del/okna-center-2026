import {
  reachGoal,
  getMetrikaClientId,
  buildConfirmLeadUrl,
  notifyMessengerLeadToEmail,
  getStoredUtmParams,
} from '@/components/YandexMetrika';
import {
  checkRateLimit,
  recordSubmission,
  setSubmittingLock,
} from '@/lib/rateLimiter';
import {
  allocateVisitorMaxManager,
  AssignedManagerRecord,
} from '@/lib/maxRotator';
import { validateRussianPhone } from '@/lib/phoneMask';
import { getCityContact } from '@/lib/cityDetector';

export { buildConfirmLeadUrl, notifyMessengerLeadToEmail };

export interface LeadPayload {
  name?: string;
  phone: string;
  consent: boolean; // 152-FZ required explicit consent
  city?: string;
  service?: string;
  comment?: string;
  source?: string;
  pageUrl?: string;
  website?: string; // honeypot field for bot trapping
  isCalculator?: boolean;
  promoOption?: string;
  calculatorData?:
    | {
        type?: string;
        profile?: string;
        dimensions?: string;
        options?: string[];
        estimate?: string;
        [key: string]: any;
      }
    | string;
}

export interface SubmitLeadResult {
  ok: boolean;
  message?: string;
  error?: string;
  assignedManager?: AssignedManagerRecord;
}

export const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/okna.c@mail.ru';

/**
 * Unified lead submission helper with 152-FZ consent validation, anti-spam,
 * idempotent multi-channel delivery (Gateway -> FormSubmit fallback),
 * and 50/50 Round Robin MAX manager assignment.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const {
    name,
    phone,
    consent,
    city,
    service,
    comment,
    source,
    pageUrl,
    website,
    isCalculator,
    promoOption,
    calculatorData,
  } = payload;

  const cityContact = getCityContact(city);

  // 1. Strict 152-FZ consent verification
  if (consent !== true) {
    return {
      ok: false,
      error: 'Для отправки заявки необходимо согласие на обработку персональных данных в соответствии с 152-ФЗ РФ.',
    };
  }

  // 2. Strict Russian phone validation (code + 10 national digits)
  const phoneValidation = validateRussianPhone(phone);
  if (!phoneValidation.isValid) {
    return {
      ok: false,
      error: phoneValidation.error || 'Пожалуйста, укажите корректный номер телефона',
    };
  }
  const cleanPhone = phoneValidation.cleanPhone || phone;

  // 3. Pre-submission rate limit & anti-spam verification
  const check = await checkRateLimit(cleanPhone, website);

  // If flagged as automated honeypot bot, absorb silently without sending email or triggering Metrika goal
  if (check.isFakeSuccess) {
    return {
      ok: true,
      message: check.fakeMessage || 'Спасибо! Ваша заявка принята.',
    };
  }

  // If rate limit, cooldown, or daily cap is exceeded, reject with an honest explanation
  if (!check.allowed) {
    return {
      ok: false,
      error: check.error || `Пожалуйста, подождите перед отправкой следующей заявки либо позвоните нам: ${cityContact.phoneDisplay}.`,
    };
  }

  // 4. Lock mutex during the entire active network flow to prevent double-tap submissions
  setSubmittingLock(true);

  try {
    // 5. Unique client idempotency key to prevent duplicates if both channels process the request
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 6. Allocate 50/50 Round Robin manager
    const assignedManager = await allocateVisitorMaxManager(
      'lead_form',
      source || 'lead_form'
    );

    // Timestamp in local Primorye timezone
    const dateTimeStr =
      new Date().toLocaleString('ru-RU', {
        timeZone: 'Asia/Vladivostok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' (Приморское время)';

    // Format calculator data into human-readable text
    let formattedCalcData = '';
    if (typeof calculatorData === 'string' && calculatorData.trim()) {
      formattedCalcData = calculatorData.trim();
    } else if (calculatorData && typeof calculatorData === 'object') {
      const parts: string[] = [];
      if (calculatorData.type) parts.push(`Тип: ${calculatorData.type}`);
      if (calculatorData.profile) parts.push(`Профиль: ${calculatorData.profile}`);
      if (calculatorData.dimensions) parts.push(`Размеры: ${calculatorData.dimensions}`);
      if (Array.isArray(calculatorData.options) && calculatorData.options.length > 0) {
        parts.push(`Опции: ${calculatorData.options.join(', ')}`);
      }
      if (calculatorData.estimate) parts.push(`Оценка: ${calculatorData.estimate}`);
      formattedCalcData = parts.join(' | ');
    }

    // Build subject line
    const repeatTag = check.isDuplicatePhone ? ' [ПОВТОРНАЯ ЗАЯВКА]' : '';
    const subject = isCalculator
      ? `Новая заявка из калькулятора (${assignedManager.managerLabel})${repeatTag} — «Окна Центр»`
      : promoOption
      ? `Акция на лоджии: ${promoOption} (${assignedManager.managerLabel})${repeatTag} — «Окна Центр»`
      : `Новая заявка с сайта (${assignedManager.managerLabel})${repeatTag} — «Окна Центр»`;

    const resolvedUrl =
      pageUrl || (typeof window !== 'undefined' ? window.location.href : 'https://окнацентр.рф/');

    // Retrieve preserved UTM parameters from initial landing session
    const storedUtms = getStoredUtmParams();

    // Build sanitized request body for FormSubmit
    const body: Record<string, string> = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
    };

    if (name && name.trim()) body['Имя'] = name.trim();
    body['Телефон'] = phone.trim();
    if (city && city.trim()) body['Город'] = city.trim();
    if (service && service.trim()) body['Услуга'] = service.trim();
    if (promoOption && promoOption.trim()) body['Выбранный вариант по акции'] = promoOption.trim();
    
    let finalComment = comment || '';
    if (check.isDuplicatePhone) {
      finalComment = `[Повторное обращение клиента в течение 15 минут] ${finalComment}`.trim();
    }
    if (finalComment) body['Комментарий'] = finalComment;

    if (formattedCalcData) body['Параметры калькулятора'] = formattedCalcData;
    if (source && source.trim()) body['Источник формы'] = source.trim();
    body['Назначенный менеджер (50/50)'] = assignedManager.managerLabel;
    body['Ссылка MAX менеджера'] = assignedManager.url;
    body['Страница'] = resolvedUrl;
    body['Дата и время'] = dateTimeStr;
    body['ID заявки (Idempotency Key)'] = leadId;
    body['Согласие на обработку ПД (152-ФЗ)'] = 'Да, предоставлено пользователем';

    // Add UTM tags to email table
    if (Object.keys(storedUtms).length > 0) {
      body['UTM-метки источника'] = Object.entries(storedUtms)
        .map(([k, v]) => `${k}=${v}`)
        .join(' | ');
    }

    // Add client IP and sequence count
    if (check.clientIp && check.clientIp !== 'unknown') {
      body['IP-адрес'] = check.clientIp;
    }
    body['Заявок за сегодня с этого адреса'] = String((check.todayCount || 0) + 1);

    // Add Yandex.Metrika ClientID (_ym_uid) and 1-click confirmation links
    const metrikaClientId = getMetrikaClientId();
    if (metrikaClientId) {
      body['ID Яндекс.Метрики (_ym_uid)'] = metrikaClientId;
    }
    body['✅ Подтвердить реальный лид (Обучить Яндекс)'] = buildConfirmLeadUrl({
      clientId: metrikaClientId || 'unknown',
      status: 'qualified_lead',
      channel: 'email',
      manager: assignedManager.managerLabel,
      phone: phone.trim(),
    });
    body['📐 Подтвердить запись на замер'] = buildConfirmLeadUrl({
      clientId: metrikaClientId || 'unknown',
      status: 'measurement_booked',
      channel: 'email',
      manager: assignedManager.managerLabel,
      phone: phone.trim(),
    });
    body['🤖 Отметить как Спам / Бот'] = buildConfirmLeadUrl({
      clientId: metrikaClientId || 'unknown',
      status: 'spam_bot',
      channel: 'email',
      manager: assignedManager.managerLabel,
      phone: phone.trim(),
    });

    // 7. PRIMARY CHANNEL: Lead Gateway (152-ФЗ РФ)
    const leadGatewayUrl =
      process.env.NEXT_PUBLIC_LEAD_GATEWAY_URL &&
      !process.env.NEXT_PUBLIC_LEAD_GATEWAY_URL.includes('localhost')
        ? process.env.NEXT_PUBLIC_LEAD_GATEWAY_URL
        : '';

    if (leadGatewayUrl) {
      try {
        const gwController = new AbortController();
        const gwTimeout = setTimeout(() => gwController.abort(), 2500);
        const gwRes = await fetch(leadGatewayUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            project: 'okna',
            leadId,
            name,
            phone: cleanPhone,
            city: city || cityContact.city,
            service,
            comment: formattedCalcData ? `${finalComment} [${formattedCalcData}]` : finalComment,
            consent: true,
            pageUrl: resolvedUrl,
            source: source || 'lead_form',
            utm: storedUtms,
          }),
          signal: gwController.signal,
        });
        clearTimeout(gwTimeout);

        if (gwRes.ok) {
          await recordSubmission(cleanPhone, check.clientIp);

          // Goal 679698808: lead_submit - triggered ONLY after confirmed server acceptance
          reachGoal('lead_submit', {
            leadId,
            source: source || 'form',
            service: service || '',
            city: city || cityContact.city,
            isCalculator: Boolean(isCalculator),
            assignedManager: assignedManager.managerId,
          });

          return {
            ok: true,
            message: 'Спасибо! Ваша заявка успешно принята и зафиксирована.',
            assignedManager,
          };
        }
      } catch (gwErr) {
        console.warn('Lead Gateway offline or unreachable, using fallback channel...', (gwErr as any)?.message);
      }
    }

    // 8. FALLBACK CHANNEL: FormSubmit to okna.c@mail.ru
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => ({}));
      const isSuccess = response.ok && (data.success === 'true' || data.success === true);

      if (isSuccess) {
        await recordSubmission(cleanPhone, check.clientIp);

        // Goal 679698808: lead_submit - triggered ONLY after confirmed FormSubmit acceptance
        reachGoal('lead_submit', {
          leadId,
          source: source || 'form',
          service: service || '',
          city: city || cityContact.city,
          isCalculator: Boolean(isCalculator),
          assignedManager: assignedManager.managerId,
        });

        return {
          ok: true,
          message: 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.',
          assignedManager,
        };
      } else {
        const errorDetail = data.message ? ` (${data.message})` : '';
        return {
          ok: false,
          error:
            `Не удалось автоматически отправить заявку${errorDetail}. Пожалуйста, позвоните нам: ${cityContact.phoneDisplay}.`,
          assignedManager,
        };
      }
    } catch {
      return {
        ok: false,
        error:
          `Не удалось автоматически отправить заявку. Пожалуйста, позвоните нам: ${cityContact.phoneDisplay} или напишите в WhatsApp: +7 (994) 010-03-00.`,
        assignedManager,
      };
    }
  } finally {
    setSubmittingLock(false);
  }
}
