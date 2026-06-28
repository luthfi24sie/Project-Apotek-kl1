# PRD v3 — Landing Page CRM (Komplit & Production-Ready)

## Konteks

Kamu adalah AI Code Agentic yang melanjutkan pekerjaan dari **PRD v1** dan **PRD v2**.

Struktur yang sudah ada setelah PRD v1 & v2:
- `components/landing/Navbar.tsx` — sticky, hamburger mobile, active state scroll
- `components/landing/HeroSection.tsx` — pre-title, headline, 2 CTA, mockup visual
- `components/landing/FeatureSection.tsx` — 3 card fitur, animasi scroll
- `components/landing/TrustSection.tsx` — statistik + 3 testimonial card, animasi scroll
- `components/landing/FAQSection.tsx` — 5 FAQ Accordion, animasi scroll
- `components/landing/Footer.tsx` — logo + copyright + links
- `lib/hooks/useScrollAnimation.ts` — custom hook
- `app/page.tsx` — merakit semua komponen

**Jangan ubah atau hapus yang sudah ada.** PRD v3 menambahkan fitur final untuk menjadikan landing page ini production-ready.

---

## Tugas PRD v3 — Pricing, Form Registrasi, Dark Mode & SEO

---

### 1. Pricing Section (Area MIDDLE → BOTTOM)

Buat komponen `components/landing/PricingSection.tsx` dan sisipkan **setelah** `<FAQSection />`.

Section id: `id="harga"`

Judul: `Pilih Paket yang Tepat untuk Bisnis Kamu`
Subjudul: `Mulai gratis, upgrade kapan saja. Tidak ada kontrak.`

Buat **3 Pricing Card** menggunakan `Card` dari Shadcn. Layout: grid 3 kolom desktop / 1 kolom mobile. **Card tengah (Pro) harus ditonjolkan** dengan `border-primary border-2` dan badge "Paling Populer".

#### Paket Starter (Gratis)
- Harga: **Rp 0** / bulan
- Fitur:
  - ✓ Hingga 100 kontak
  - ✓ 1 pengguna
  - ✓ Pipeline penjualan dasar
  - ✓ Email support
  - ✗ Laporan lanjutan
  - ✗ Integrasi API
- CTA: `<Button variant="outline" className="w-full">Mulai Gratis</Button>`

#### Paket Pro ⭐ (Ditonjolkan)
- Harga: **Rp 199.000** / bulan
- Badge: `<Badge>Paling Populer</Badge>` di atas kartu
- Fitur:
  - ✓ Unlimited kontak
  - ✓ Hingga 10 pengguna
  - ✓ Pipeline & otomasi follow-up
  - ✓ Laporan & analitik lengkap
  - ✓ Integrasi API & Webhook
  - ✓ Priority support
- CTA: `<Button className="w-full">Coba 14 Hari Gratis</Button>`

#### Paket Enterprise (Custom)
- Harga: **Hubungi Kami**
- Fitur:
  - ✓ Semua fitur Pro
  - ✓ Unlimited pengguna
  - ✓ Custom onboarding
  - ✓ SLA 99.9% uptime
  - ✓ Dedicated account manager
  - ✓ Integrasi kustom
- CTA: `<Button variant="outline" className="w-full">Jadwalkan Demo</Button>`

---

### 2. CTA Final Section (Area BOTTOM)

Buat komponen `components/landing/CTASection.tsx` dan sisipkan **setelah** `<PricingSection />`.

Desain: full-width section dengan background `bg-primary text-primary-foreground`, padding besar.

Isi:
- Judul besar: `Siap Mengubah Cara Kamu Mengelola Pelanggan?`
- Subjudul: `Bergabunglah dengan 500+ bisnis yang sudah berkembang bersama NexCRM.`
- Satu tombol CTA: `<Button size="lg" variant="secondary">Mulai Gratis Sekarang →</Button>`
- Klik tombol ini membuka **modal form registrasi** (lihat poin 3)

---

### 3. Form Registrasi Modal

Buat komponen `components/landing/RegisterModal.tsx` menggunakan `Dialog` dari Shadcn.

Modal ini dipanggil dari:
- Tombol "Mulai Gratis" di Navbar
- Tombol Primary CTA di HeroSection
- Tombol CTA di PricingSection (Starter & Pro)
- Tombol CTA di CTASection

Buat context atau state sederhana untuk mengontrol buka/tutup modal. Gunakan `"use client"`.

#### Field Form:

```
1. Nama Lengkap        — input text, required, min 3 karakter
2. Email Bisnis        — input email, required, validasi format email
3. Nama Perusahaan     — input text, required
4. Nomor HP            — input tel, opsional, placeholder "+62..."
5. Jumlah Karyawan     — Select dari Shadcn:
                         "1–10 karyawan"
                         "11–50 karyawan"
                         "51–200 karyawan"
                         "200+ karyawan"
```

#### Perilaku Form:
- Validasi real-time: tampilkan pesan error merah di bawah field jika tidak valid (saat blur)
- Tombol submit: `<Button type="button" className="w-full">Buat Akun Gratis</Button>`
- Loading state: saat submit, tombol berubah menjadi `disabled` dengan teks `"Memproses..."`
- Setelah submit (simulasikan dengan `setTimeout 1500ms`): tampilkan pesan sukses di dalam modal:
  ```
  ✅ Akun berhasil dibuat!
  Cek email kamu untuk link aktivasi.
  ```
- Tidak perlu koneksi ke backend nyata — cukup simulasi

---

### 4. Dark Mode

#### 4a. Setup

Pastikan `next-themes` sudah terinstall. Jika belum: `npm install next-themes`

Bungkus layout di `app/layout.tsx` dengan `ThemeProvider`:

```tsx
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### 4b. Toggle Button di Navbar

Tambahkan toggle di sisi kanan Navbar (sebelum tombol CTA):

```tsx
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

// Di dalam Navbar:
const { theme, setTheme } = useTheme()

<Button
  variant="ghost"
  size="icon"
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
>
  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
</Button>
```

Shadcn/UI sudah mendukung dark mode via CSS variables — tidak perlu konfigurasi tambahan.

---

### 5. SEO — Metadata Next.js

Update `app/page.tsx` atau buat `app/metadata.ts` untuk menambahkan metadata:

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NexCRM — Kelola Pelanggan Lebih Cerdas | CRM untuk Bisnis Indonesia",
  description:
    "NexCRM membantu tim penjualan melacak prospek, otomasi follow-up, dan menutup lebih banyak deal. Coba gratis 14 hari, tanpa kartu kredit.",
  keywords: ["CRM", "manajemen pelanggan", "software CRM Indonesia", "NexCRM"],
  openGraph: {
    title: "NexCRM — CRM untuk Bisnis Indonesia",
    description: "Kelola pelanggan lebih cerdas dengan NexCRM. Gratis 14 hari.",
    type: "website",
    locale: "id_ID",
    url: "https://nexcrm.id",
    siteName: "NexCRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexCRM — CRM untuk Bisnis Indonesia",
    description: "Kelola pelanggan lebih cerdas dengan NexCRM.",
  },
}
```

---

### 6. Update `app/page.tsx` (Final)

```tsx
import Navbar from "@/components/landing/Navbar"
import HeroSection from "@/components/landing/HeroSection"
import FeatureSection from "@/components/landing/FeatureSection"
import TrustSection from "@/components/landing/TrustSection"
import FAQSection from "@/components/landing/FAQSection"
import PricingSection from "@/components/landing/PricingSection"
import CTASection from "@/components/landing/CTASection"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <TrustSection />
      <FAQSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
```

---

## Catatan Teknis

- Install yang dibutuhkan jika belum ada:
  ```bash
  npm install next-themes
  npx shadcn@latest add dialog select
  ```
- `RegisterModal` butuh state management ringan — gunakan React `useState` biasa atau buat Context sederhana
- Semua komponen yang menggunakan `useState`, `useTheme`, atau browser API wajib `"use client"`
- Pastikan `ThemeProvider` di `layout.tsx` sudah `suppressHydrationWarning` pada `<html>`
- Dark mode bekerja otomatis karena Shadcn/UI menggunakan CSS variables (`.dark` class)

---

## Struktur File Akhir (Setelah v1 + v2 + v3)

```
app/
├── layout.tsx                        ← ThemeProvider + metadata global
├── page.tsx                          ← Rakit semua komponen landing
components/
└── landing/
    ├── Navbar.tsx                    ← Sticky, mobile menu, dark toggle, active scroll
    ├── HeroSection.tsx               ← Badge, headline, 2 CTA, mockup visual
    ├── FeatureSection.tsx            ← 3 card fitur + animasi scroll
    ├── TrustSection.tsx              ← Statistik + 3 testimonial + animasi scroll
    ├── FAQSection.tsx                ← 5 FAQ Accordion + animasi scroll
    ├── PricingSection.tsx            ← 3 paket harga, Pro ditonjolkan
    ├── CTASection.tsx                ← Full-width CTA akhir
    ├── RegisterModal.tsx             ← Dialog form registrasi + validasi + simulasi submit
    └── Footer.tsx                    ← Logo + links + copyright
lib/
└── hooks/
    └── useScrollAnimation.ts        ← Custom hook fade-in
```

---

## Hasil yang Diharapkan

- [ ] `components/landing/PricingSection.tsx` — 3 paket harga, Pro highlighted
- [ ] `components/landing/CTASection.tsx` — full-width CTA dengan background primary
- [ ] `components/landing/RegisterModal.tsx` — modal form + validasi + loading + sukses state
- [ ] Dark mode toggle berfungsi di Navbar (Sun/Moon icon)
- [ ] `app/layout.tsx` diperbarui dengan `ThemeProvider`
- [ ] `app/page.tsx` diperbarui dengan metadata SEO dan semua komponen baru
- [ ] Semua tombol "Mulai Gratis" di seluruh halaman membuka modal yang sama

Jalankan `npm run dev`, uji dark mode, klik semua tombol CTA, isi form registrasi, dan pastikan tampilan responsif di mobile.
