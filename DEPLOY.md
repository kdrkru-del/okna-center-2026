# Инструкция по развертыванию сайта «Окна Центр» (DEPLOY.md)

**Домен:** `https://окнацентр.рф/` (`https://xn--80aknmcbtp7a.xn--p1ai/`)  
**Дата актуализации:** 19 сентября 2026 г.  
**Архитектура:** Статический JAMstack (Next.js Static Export `out/`) + FormSubmit (доставка на `okna.c@mail.ru`) + Nginx + Let's Encrypt SSL.

---

## 1. Архитектура производственной среды

```
                             [ Интернет / Пользователь ]
                                          │
                               HTTPS (порт 443)
                                          ▼
                         ┌──────────────────────────────────┐
                         │       Nginx Web Server           │
                         │  (SSL, Gzip, HSTS, 301 Redirects)│
                         └────────────────┬─────────────────┘
                                          │
                            / (Чистая отдача статики)
                                          ▼
                         ┌──────────────────────────────────┐
                         │   /var/www/okna-center/out/      │
                         │   (HTML, CSS, JS, WebP, SVG)     │
                         └──────────────────────────────────┘

                  [ Браузер клиента ] ───(AJAX POST)───> [ FormSubmit.co ]
                                                               │ (Email)
                                                               ▼
                                                      [ okna.c@mail.ru ]
```

### Преимущества бессерверной архитектуры:
- **0 запущенных демонов Node.js на сервере:** Нет Express API, нет `systemd`, нет риска падения фонового процесса.
- **Максимальная скорость отдачи:** Nginx раздает статику напрямую из файловой системы со скоростью ~1-2 мс.
- **Высокая отказоустойчивость:** Даже при сбое внешнего почтового сервиса форма не зависает — пользователю мгновенно предлагаются прямые кнопки связи по телефону (`+7 (423) 274-42-42`) и в WhatsApp.
- **Экологичность данных:** Персональные данные не оседают в базе данных сервера, а сразу направляются на защищенную почту компании.

---

## 2. Обработка заявок (FormSubmit)

- **Шлюз:** `https://formsubmit.co/ajax/okna.c@mail.ru`
- **Email получения:** `okna.c@mail.ru`
- **Шаблон:** `_template: "table"` (удобочитаемая таблица в письме)
- **Защита от спама:** Поле-ловушка `_honey` (скрытое honeypot поле)
- **Цели Яндекс.Метрики:** Идентификатор счетчика `43431474`, цель `form_submit` срабатывает **исключительно** при получении HTTP 200 / success от почтового шлюза.
- **Первая активация FormSubmit:** После отправки первой тестовой заявки на ящик `okna.c@mail.ru` приходит письмо от сервиса FormSubmit со ссылкой активации. Владельцу почты необходимо **один раз нажать на ссылку "Activate Form"**, после чего все последующие заявки поступают без подтверждений.

---

## 3. Развертывание на боевой сервер (Ubuntu / Debian + Nginx)

### 3.1. Установка Nginx и Certbot

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
```

### 3.2. Локальная сборка проекта

```bash
# Обычная production-сборка (без префикса GitHub Pages)
npm run build

# Результат помещается в директорию: ./out
```

### 3.3. Перенос статики на сервер

```bash
# Создание директории на сервере
ssh root@SERVER_IP "mkdir -p /var/www/okna-center/out"

# Синхронизация файлов через rsync
rsync -avz --delete ./out/ root@SERVER_IP:/var/www/okna-center/out/
```

### 3.4. Конфигурация Nginx

Скопируйте подготовленный файл `nginx.conf` в `/etc/nginx/sites-available/okna-center`:

```nginx
server {
    listen 80;
    server_name xn--80aknmcbtp7a.xn--p1ai www.xn--80aknmcbtp7a.xn--p1ai;
    return 301 https://xn--80aknmcbtp7a.xn--p1ai$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.xn--80aknmcbtp7a.xn--p1ai;
    ssl_certificate /etc/letsencrypt/live/xn--80aknmcbtp7a.xn--p1ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xn--80aknmcbtp7a.xn--p1ai/privkey.pem;
    return 301 https://xn--80aknmcbtp7a.xn--p1ai$request_uri;
}

server {
    listen 443 ssl http2;
    server_name xn--80aknmcbtp7a.xn--p1ai;

    ssl_certificate /etc/letsencrypt/live/xn--80aknmcbtp7a.xn--p1ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xn--80aknmcbtp7a.xn--p1ai/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/okna-center/out;
    index index.html;

    # 10 Legacy 301 Redirects (сохранение позиций старого сайта)
    location = /kalkuliator_okon { return 301 /kalkulyator; }
    location = /balkony_i_lodzhii_pod_kliuch { return 301 /balkony_i_lodzhii; }
    location = /otdielka_balkonov { return 301 /otdelka_balkonov; }
    location = /uteplenie_balkonov_i_lodzhii { return 301 /uteplenie_balkona; }
    location = /krysha_na_balkon_ustanovka_i_montazh { return 301 /krysha_na_balkon; }
    location = /rasshirienie_i_vynos_balkonov { return 301 /vynos_balkona; }
    location = /aliuminiievyie_vitrazhi { return 301 /alyuminievye_konstrukcii; }
    location = /stoimost_i_tseny { return 301 /tseny; }
    location = /o_kompanii_okna_tsentr { return 301 /o_nas; }
    location = /otzyvy_klientov { return 301 /otzyvy; }

    # Кэширование статических ассетов
    location /_next/static {
        alias /var/www/okna-center/out/_next/static;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images/ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Роутинг статических страниц HTML
    location / {
        try_files $uri $uri.html $uri/ /404.html =404;
    }
}
```

Активация сайта:
```bash
sudo ln -sf /etc/nginx/sites-available/okna-center /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 4. Предпросмотр на GitHub Pages

- **Репозиторий:** `https://github.com/kdrkru-del/okna-center-2026`
- **Адрес публикации:** `https://kdrkru-del.github.io/okna-center-2026/`
- **Workflow:** `.github/workflows/pages.yml` (автоматическая сборка при каждом push в ветку `main`).
- **Изоляция:** Режим предпросмотра собирается с флагом `GITHUB_PAGES=true`, автоматически выставляет:
  - `basePath: '/okna-center-2026'`
  - Запрет индексации поисковиками: `<meta name="robots" content="noindex,nofollow">` и `robots.txt` с `Disallow: /`.
  - Все канонические ссылки (`canonical`) указывают на основной боевой домен `https://окнацентр.рф/`.
