import { reachGoal } from '@/components/YandexMetrika';

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
}

export const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/okna.c@mail.ru';

/**
 * Unified lead submission helper for all site forms using FormSubmit AJAX.
 * Sends leads directly to okna.c@mail.ru without backend requirements.
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
    calculatorData,
  } = payload;

  // Phone validation: at least 10 digits
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length < 10) {
    return {
      ok: false,
      error: 'Пожалуйста, укажите корректный номер телефона (не менее 10 цифр)',
    };
  }

  // Honeypot field (hidden from real users)
  const honey = website ? String(website).trim() : '';

  // Timestamp in Vladivostok timezone
  const dateTimeStr = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Vladivostok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' (Владивосток)';

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
    ? 'Новая заявка из калькулятора — «Окна Центр»'
    : 'Новая заявка с сайта «Окна Центр»';

  const resolvedUrl = pageUrl || (typeof window !== 'undefined' ? window.location.href : 'https://окнацентр.рф/');

  // Build sanitized request body (no undefined/null/empty technical keys)
  const body: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
  };

  if (honey) {
    body._honey = honey;
  }

  if (name && name.trim()) body['Имя'] = name.trim();
  body['Телефон'] = phone.trim();
  if (city && city.trim()) body['Город'] = city.trim();
  if (service && service.trim()) body['Услуга'] = service.trim();
  if (comment && comment.trim()) body['Комментарий'] = comment.trim();
  if (formattedCalcData) body['Параметры калькулятора'] = formattedCalcData;
  if (source && source.trim()) body['Источник формы'] = source.trim();
  body['Страница'] = resolvedUrl;
  body['Дата и время'] = dateTimeStr;

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    // FormSubmit returns { success: "true" | true } on confirmed delivery
    const isSuccess = response.ok && (data.success === 'true' || data.success === true);

    if (isSuccess) {
      // Trigger Yandex Metrika goal strictly on successful delivery response
      reachGoal('form_submit', {
        source: source || 'form',
        service: service || '',
        city: city || '',
        isCalculator: Boolean(isCalculator),
      });

      return {
        ok: true,
        message: 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами.',
      };
    } else {
      return {
        ok: false,
        error: data.message || 'Не удалось автоматически отправить заявку. Свяжитесь с нами напрямую.',
      };
    }
  } catch {
    return {
      ok: false,
      error: 'Не удалось автоматически отправить заявку. Свяжитесь с нами напрямую.',
    };
  }
}
