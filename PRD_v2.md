# PRD v2 — Landing Page CRM (Trust, FAQ & Animasi)

## Konteks

Kamu adalah AI Code Agentic yang melanjutkan pekerjaan dari **PRD v1**.

Landing page dasar sudah selesai di PRD v1 dengan struktur:
- `components/landing/Navbar.tsx`
- `components/landing/HeroSection.tsx`
- `components/landing/FeatureSection.tsx`
- `components/landing/Footer.tsx`
- `app/page.tsx`

**Jangan ubah atau hapus komponen yang sudah ada.** Tugas PRD v2 adalah **menambahkan** tiga bagian baru dan **memperbaiki** beberapa detail yang ada.

---

## Tugas PRD v2 — Tambahkan Trust, FAQ & Animasi

---

### 1. Trust Section (Area MIDDLE) — Bangun Kepercayaan

Buat komponen `components/landing/TrustSection.tsx` dan sisipkan **setelah** `<FeatureSection />` di `app/page.tsx`.

Section id: `id="tentang"`

#### 1a. Statistik (Top Slab)

Tampilkan 3 angka besar berdampingan (grid 3 kolom):

| Angka | Label |
|-------|-------|
| 500+ | Perusahaan Aktif |
| 99.9% | Uptime Terjamin |
| 4.8/5 | Rating Pengguna |

Gunakan angka berukuran besar (`text-4xl font-bold text-primary`) dengan label kecil di bawahnya.

#### 1b. Testimonial Cards (Middle Slab)

Tampilkan **3 kartu testimonial** menggunakan `Card` dari Shadcn, layout grid 3 kolom desktop / 1 kolom mobile:

```
Kartu 1:
- Nama: Budi Santoso
- Jabatan: Sales Manager, PT Maju Bersama
- Kutipan: "NexCRM mengubah cara tim kami bekerja. Follow-up jadi otomatis, tidak ada lagi deal yang terlewat."
- Rating: ★★★★★

Kartu 2:
- Nama: Rina Wijaya
- Jabatan: Direktur, CV Cahaya Digital
- Kutipan: "Dashboard-nya intuitif. Dalam 2 minggu, konversi kami naik 30%. Sangat direkomendasikan!"
- Rating: ★★★★★

Kartu 3:
- Nama: Agus Pratama
- Jabatan: Founder, Startup Nusantara
- Kutipan: "Harga terjangkau untuk fitur sebesar ini. Tim support-nya juga responsif dan membantu."
- Rating: ★★★★☆
```

Setiap kartu: avatar inisial (gunakan `Avatar` dari Shadcn dengan fallback inisial nama), nama bold, jabatan muted, kutipan italic, bintang rating.

---

### 2. FAQ Section (Area MIDDLE) — Hilangkan Keraguan

Buat komponen `components/landing/FAQSection.tsx` dan sisipkan **setelah** `<TrustSection />`.

Section id: `id="faq"`

Gunakan komponen `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` dari Shadcn.

Judul section: `Pertanyaan yang Sering Ditanyakan`

Isi 5 FAQ:

```
Q: Apakah ada biaya untuk mencoba NexCRM?
A: Tidak. Kamu bisa mencoba semua fitur selama 14 hari penuh tanpa kartu kredit.

Q: Berapa banyak pengguna yang bisa saya tambahkan?
A: Paket Starter mendukung 3 pengguna, paket Pro unlimited, dan Enterprise bisa dikustomisasi sesuai kebutuhan.

Q: Apakah data saya aman?
A: Ya. Semua data dienkripsi dengan SSL 256-bit dan di-backup setiap hari ke server terpisah.

Q: Bagaimana cara memulai?
A: Klik tombol "Mulai Gratis", isi form registrasi singkat, dan akun kamu langsung aktif dalam 60 detik.

Q: Apakah saya terikat kontrak jangka panjang?
A: Tidak. Kamu bisa upgrade, downgrade, atau batalkan langganan kapan saja tanpa penalti.
```

---

### 3. Animasi Scroll (Seluruh Halaman)

Buat utility `lib/hooks/useScrollAnimation.ts`:

```ts
"use client"
import { useEffect, useRef, useState } from "react"

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
```

Gunakan hook ini di `FeatureSection`, `TrustSection`, dan `FAQSection` untuk efek **fade-in + slide-up** saat section masuk viewport:

```tsx
// Contoh penggunaan di sebuah section
const { ref, isVisible } = useScrollAnimation()

<div
  ref={ref}
  className={`transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  {/* konten */}
</div>
```

Komponen yang menggunakan hook ini wajib tambahkan `"use client"` di baris pertama.

---

### 4. Perbaikan Komponen Lama

#### HeroSection — Perbarui CTA Button

Ubah warna Primary CTA menjadi lebih mencolok. Tambahkan kelas `shadow-lg hover:shadow-xl transition-shadow` pada tombol utama.

#### Navbar — Tambah Active State

Saat user scroll melewati section tertentu, menu nav yang aktif mendapat style berbeda (`text-primary font-semibold`). Implementasikan dengan `IntersectionObserver` di `Navbar.tsx`.

---

### 5. Update `app/page.tsx`

```tsx
import Navbar from "@/components/landing/Navbar"
import HeroSection from "@/components/landing/HeroSection"
import FeatureSection from "@/components/landing/FeatureSection"
import TrustSection from "@/components/landing/TrustSection"
import FAQSection from "@/components/landing/FAQSection"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <TrustSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
```

---

## Catatan Teknis

- Install Shadcn Accordion jika belum ada: `npx shadcn@latest add accordion`
- Install Shadcn Avatar jika belum ada: `npx shadcn@latest add avatar`
- Semua komponen baru yang menggunakan hook atau state wajib `"use client"`
- Animasi hanya menggunakan Tailwind CSS + native Intersection Observer — tanpa library animasi tambahan

---

## Hasil yang Diharapkan

- [ ] `components/landing/TrustSection.tsx` — statistik 3 angka + 3 testimonial card
- [ ] `components/landing/FAQSection.tsx` — 5 FAQ menggunakan Shadcn Accordion
- [ ] `lib/hooks/useScrollAnimation.ts` — custom hook fade-in
- [ ] Animasi scroll diterapkan di FeatureSection, TrustSection, FAQSection
- [ ] Navbar active state saat scroll
- [ ] `app/page.tsx` diperbarui dengan komponen baru

Jalankan `npm run dev` dan pastikan semua section tampil dan animasi berjalan saat scroll.
