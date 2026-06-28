# PRD v1 — Landing Page CRM (Struktur Dasar)

## Konteks Project

Kamu adalah AI Code Agentic yang membantu mahasiswa membuat tugas mata kuliah **Pemrograman Framework Lanjutan**.

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Bahasa**: TypeScript
- **Tujuan**: Membuat Landing Page untuk produk **CRM (Customer Relationship Management)**
- **Struktur**: Project Next.js sudah ada, kamu hanya perlu menambahkan halaman landing page

---

## Tugas PRD v1 — Buat Struktur Dasar Landing Page

Buat halaman landing page di `app/page.tsx` (atau `app/(landing)/page.tsx` jika ada route group).

### Yang harus dibuat:

---

### 1. Navbar (Area TOP)

Buat komponen `components/landing/Navbar.tsx`:

- Logo teks "NexCRM" di sebelah kiri (gunakan font bold + warna primary)
- Menu navigasi: **Fitur**, **Harga**, **Tentang**, **Kontak** — sebagai anchor link (`href="#fitur"` dst.)
- Tombol CTA di kanan: `<Button>` dari Shadcn → teks **"Coba Gratis"**
- Navbar harus **sticky** (`sticky top-0 z-50`) dengan `backdrop-blur`
- Di mobile: sembunyikan menu, tampilkan hamburger icon menggunakan `Sheet` dari Shadcn

---

### 2. Hero Section (Area TOP)

Buat komponen `components/landing/HeroSection.tsx`:

- **Pre-title**: badge kecil bertuliskan `✦ CRM #1 untuk Bisnis Indonesia` — gunakan `Badge` dari Shadcn
- **Headline**: `Kelola Pelanggan Lebih Cerdas, Bisnis Tumbuh Lebih Cepat`
- **Sub-headline**: `NexCRM membantu tim penjualan Anda melacak prospek, otomasi follow-up, dan menutup lebih banyak deal — dalam satu platform.`
- **Primary CTA**: `<Button size="lg">` → `Mulai Gratis 14 Hari`
- **Secondary CTA**: `<Button variant="outline" size="lg">` → `Lihat Demo`
- Visual kanan: kotak placeholder dengan kelas Tailwind yang menyerupai mockup dashboard (gunakan `rounded-xl border bg-muted` dengan beberapa baris div sebagai "row" data palsu)
- Layout: 2 kolom di desktop (`grid grid-cols-2`), 1 kolom di mobile

---

### 3. Feature Section (Area MIDDLE)

Buat komponen `components/landing/FeatureSection.tsx`:

- Section id: `id="fitur"`
- Judul section: `Semua yang Kamu Butuhkan untuk Mengelola Pelanggan`
- Subjudul: `Fitur lengkap, antarmuka sederhana.`
- Tampilkan **3 Feature Card** menggunakan `Card` dari Shadcn, layout grid 3 kolom desktop / 1 kolom mobile:

| Icon | Judul | Deskripsi |
|------|-------|-----------|
| 📊 | Manajemen Kontak | Simpan dan kelola semua data pelanggan dalam satu tempat yang terorganisir. |
| 🔔 | Otomasi Follow-up | Atur pengingat otomatis agar tidak ada prospek yang terlewat. |
| 📈 | Laporan & Analitik | Pantau performa tim penjualan dengan laporan real-time yang mudah dipahami. |

- Gunakan ikon dari `lucide-react` (Users, Bell, BarChart3)

---

### 4. Footer Sederhana (Area BOTTOM)

Buat komponen `components/landing/Footer.tsx`:

- Logo + nama "NexCRM" di kiri
- Teks copyright: `© 2025 NexCRM. All rights reserved.`
- Link: Privasi | Syarat & Ketentuan
- Background: `bg-muted` atau `bg-slate-900 text-white`

---

### 5. Rakit di `app/page.tsx`

```tsx
import Navbar from "@/components/landing/Navbar"
import HeroSection from "@/components/landing/HeroSection"
import FeatureSection from "@/components/landing/FeatureSection"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </main>
  )
}
```

---

## Catatan Teknis

- Gunakan **App Router** bukan Pages Router
- Semua komponen adalah **Server Component** kecuali Navbar (butuh `"use client"` untuk toggle mobile menu)
- Warna utama: gunakan CSS variable dari Shadcn (`bg-primary`, `text-primary-foreground`)
- Pastikan **fully responsive** (mobile-first)
- Jangan install library baru — hanya gunakan yang sudah ada: Shadcn/UI, Tailwind, lucide-react

---

## Hasil yang Diharapkan

- [ ] `components/landing/Navbar.tsx` — sticky, ada hamburger mobile
- [ ] `components/landing/HeroSection.tsx` — pre-title, headline, 2 CTA, mockup visual
- [ ] `components/landing/FeatureSection.tsx` — 3 card fitur dengan ikon
- [ ] `components/landing/Footer.tsx` — logo + copyright + links
- [ ] `app/page.tsx` — merakit semua komponen di atas

Setelah selesai, jalankan `npm run dev` dan pastikan halaman tampil tanpa error.
