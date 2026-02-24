# Images — Aplix Site Assets

Bu papka Framer site'dan yuklab olingan rasmlar uchun.

## Papka tuzilmasi

```
public/images/
├── hero/           ← Hero section rasmlari (dashboard screenshot va boshqalar)
├── features/       ← Features / BentoGrid bo'limidagi rasmlar
├── logos/          ← Brand logolar va ikonkalar
├── avatars/        ← Testimonial/review sahifalar uchun avatar rasmlar
└── og/             ← Open Graph meta rasmlar (SEO uchun)
```

## Framer URL → Lokal fayl o'zgarishi

Faylllarni yuklab olib joylashtirgandan keyin, kodni quyidagicha o'zgartiring:

**Oldin (Framer URL):**

```tsx
<Image src="https://framerusercontent.com/images/9LKnnWcx8OELyDZDpkOLbWnlkk.webp" ... />
```

**Keyin (lokal fayl):**

```tsx
<Image src="/images/hero/dashboard.webp" ... />
```

## Asosiy rasmlar ro'yxati

| Fayl nomi                        | Qayerda ishlatiladi           |
| -------------------------------- | ----------------------------- |
| `hero/dashboard.webp`            | Hero section va FeaturesTab   |
| `features/api-health-chart.webp` | BentoGrid - Card 1            |
| `logos/aplix-logo.svg`           | Navbar, Footer                |
| `avatars/marcus-reed.jpg`        | Testimonials - Marcus Reed    |
| `avatars/laura-mitchell.jpg`     | Testimonials - Laura Mitchell |
