# Сайт компании «Окна Центр» (Владивосток)

Официальный веб-сайт компании «Окна Центр»: производство и монтаж пластиковых окон, остекление балконов и лоджий под ключ во Владивостоке и Приморском крае.

- **Основной домен:** [https://окнацентр.рф/](https://xn--80aknmcbtp7a.xn--p1ai/)
- **Демо-стенд (GitHub Pages):** [https://kdrkru-del.github.io/okna-center-2026/](https://kdrkru-del.github.io/okna-center-2026/)
- **Email для заявок:** `okna.c@mail.ru`
- **Телефон:** +7 (423) 274-42-42 / +7 (902) 524-42-42

---

## Архитектура проекта

- **Фреймворк:** Next.js 16 (App Router) со статической генерацией (`output: 'export'`).
- **Стилизация:** Tailwind CSS + Lucide React.
- **Доставка заявок:** FormSubmit (`https://formsubmit.co/ajax/okna.c@mail.ru`) с табличным форматированием (`_template: table`), защитой от спама honeypot (`_honey`) и прямыми fallback-кнопками звонка / WhatsApp при отсутствии интернета.
- **Аналитика:** Яндекс.Метрика (счетчик `43431474`), регистрация цели `form_submit` только при подтверждении успешной доставки.
- **SEO & Canonical:** 24 канонических страницы, 10 legacy 301 редиректов, robots.txt, sitemap.xml.

---

## Локальная разработка и сборка

```bash
# Установка зависимостей
npm install

# Запуск локального сервера разработки
npm run dev

# Продакшн-сборка (для боевого сервера окнацентр.рф)
npm run build

# Сборка для GitHub Pages (с префиксом /okna-center-2026 и noindex)
npm run build:gh-pages
```

---

## Документация

- [DEPLOY.md](./DEPLOY.md) — регламент развертывания на боевом сервере с Nginx.
- [LAUNCH-GATE.md](./LAUNCH-GATE.md) — протокол готовности к релизу и статусы проверок.
- [MIGRATION-CHECKLIST.md](./MIGRATION-CHECKLIST.md) — пошаговый чеклист миграции со старого uKit CMS.
- [SEO-MIGRATION.md](./SEO-MIGRATION.md) — карта URL и метаданных.
- [PHOTO-AUDIT.md](./PHOTO-AUDIT.md) — аудит фотоматериалов.
- [ADDRESS-VERIFICATION.md](./ADDRESS-VERIFICATION.md) — аудит адресов.
