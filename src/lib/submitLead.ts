import { reachGoal } from '@/components/YandexMetrika';
import {
  checkRateLimit,
  recordSubmission,
  setSubmittingLock,
} from '@/lib/rateLimiter';
import {
  allocateVisitorMaxManager,
  AssignedManagerRecord,
} from '@/lib/maxRotator';

export interface LeadPayload {
  name?: string;
  phone: string;
  city?: string;
  service?: string;
  comment?: string;
  source?: string;
  pageUrl?: string;
  website?: string; // honeypot field
  isCalculator?: boolean;
  promoOption?: string;
  calculatorData?: {
    type?: string;
    profile?: string;
    dimensions?: string;
    options?: string[];
    estimate?: string;
    [key: string]: any;
  } | string;
}

export interface SubmitLeadResult {
  ok: boolean;
  message?: string;
  error?: string;
  assignedManager?: AssignedManagerRecord;
}

export const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/okna.c@mail.ru';

/**
 * Unified lead submission helper with anti-spam, per-IP/device rate limiting,
 * and 50/50 Round Robin MAX manager assignment.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  const {
    name,
    phone,
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

  // 1. Phone validation: at least 10 digits
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length < 10) {
    return {
      ok: false,
      error: 'Пожалуйста, укажите корректный номер телефона (не менее 10 цифр)',
    };
  }

  // 2. Pre-submission rate limit & anti-spam verification
  const check = await checkRateLimit(phone, website);

  // If flagged as honeypot bot or duplicate phone, absorb silently with a polite success message
  if (check.isFakeSuccess) {
    return {
      ok: true,
      message: check.fakeMessage || 'Спасибо! Ваша заявка принята. Мы свяжемся с вами.',
    };
  }

  // If rate limit, cooldown, or daily cap is exceeded, reject with a clear explanation
  if (!check.allowed) {
    return {
      ok: false,
      error: check.error || 'Пожалуйста, подождите перед отправкой следующей заявки.',
    };
  }

  // 3. Allocate 50/50 Round Robin manager
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

  const subject = isCalculator
    ? `Новая заявка из калькулятора (${assignedManager.managerLabel}) — «Окна Центр»`
    : promoOption
    ? `Акция на лоджии: ${promoOption} (${assignedManager.managerLabel}) — «Окна Центр»`
    : `Новая заявка с сайта (${assignedManager.managerLabel}) — «Окна Центр»`;

  const resolvedUrl =
    pageUrl || (typeof window !== 'undefined' ? window.location.href : 'https://окнацентр.рф/');

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
  if (comment && comment.trim()) body['Комментарий'] = comment.trim();
  if (formattedCalcData) body['Параметры калькулятора'] = formattedCalcData;
  if (source && source.trim()) body['Источник формы'] = source.trim();
  body['Назначенный менеджер (50/50)'] = assignedManager.managerLabel;
  body['Ссылка MAX менеджера'] = assignedManager.url;
  body['Страница'] = resolvedUrl;
  body['Дата и время'] = dateTimeStr;

  // Add client IP and sequence count to help the site owner verify authenticity
  if (check.clientIp && check.clientIp !== 'unknown') {
    body['IP-адрес'] = check.clientIp;
  }
  body['Заявок за сегодня с этого адреса'] = String((check.todayCount || 0) + 1);

  // Set active submission lock
  setSubmittingLock(true);

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
      // Record this submission in persistent storages to enforce IP cooldown and limits
      await recordSubmission(phone, check.clientIp);

      // Trigger Yandex Metrika goal strictly on successful delivery response
      reachGoal('form_submit', {
        source: source || 'form',
        service: service || '',
        city: city || '',
        isCalculator: Boolean(isCalculator),
        assignedManager: assignedManager.managerId,
      });

      return {
        ok: true,
        message: 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        assignedManager,
      };
    } else {
      return {
        ok: false,
        error:
          data.message ||
          'Не удалось автоматически отправить заявку. Пожалуйста, позвоните нам: 8 (423) 2-725-725.',
        assignedManager,
      };
    }
  } catch {
    return {
      ok: false,
      error:
        'Не удалось автоматически отправить заявку. Пожалуйста, позвоните нам: 8 (423) 2-725-725.',
      assignedManager,
    };
  } finally {
    setSubmittingLock(false);
  }
}
