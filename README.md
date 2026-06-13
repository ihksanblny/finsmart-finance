# FinSmart

FinSmart adalah aplikasi pengelola keuangan *all-in-one* dan platform edukasi finansial yang dirancang dengan antarmuka premium dan modern. Aplikasi ini membantu pengguna melacak pengeluaran, memperhitungkan daya beli berdasarkan inflasi riil, serta membandingkan gaji dengan standar pasar.

![FinSmart MVP](https://img.shields.io/badge/Status-MVP_Live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-06B6D4)
![Supabase](https://img.shields.io/badge/Supabase-Integrated-3ECF8E)

---

## 🌟 Fitur Utama

### 1. Expense Tracker (Dashboard Eksklusif)
*   Melacak arus kas harian (Pemasukan & Pengeluaran).
*   Visualisasi grafik pengeluaran dan pemasukan bulanan yang interaktif.
*   Ringkasan Saldo, Pengeluaran, dan Pemasukan di layar utama.
*   *Membutuhkan pembuatan akun (Login/Register).*

### 2. Kalkulator Inflasi Pendapatan (Free Tool)
*   Menghitung daya beli *(real income)* gajimu dari tahun lalu dibandingkan dengan tahun ini.
*   Dapat memilih profil inflasi (Lokal, Menengah, Global) atau memasukkan angka persentase secara manual.
*   Visualisasi data komparatif yang membantumu menyadari apakah kamu benar-benar "bertambah kaya" atau sekadar mengejar inflasi.
*   *Fitur publik, dapat diakses tanpa login.*

### 3. Skill & Salary Benchmark (Free Tool)
*   Membandingkan gajimu saat ini dengan rata-rata *(market value)* di industri berdasarkan profesi.
*   Memberikan rekomendasi *skill* spesifik yang perlu dipelajari untuk meningkatkan nilai jual di pasar kerja.
*   Visualisasi kurva nilai pasar untuk memberikan gambaran kompetitif.
*   *Fitur publik, dapat diakses tanpa login.*

---

## 🎨 Design System & UI/UX

FinSmart dibangun dengan pendekatan **Premium Editorial Design**:
*   **Tipografi:** Plus Jakarta Sans untuk memberikan kesan profesional, modern, dan sangat mudah dibaca.
*   **Tema:** Perpaduan harmonis antara *Dark Mode* (`#0e2917`) untuk ruang publik dan *Light Mode* (Putih bersih) dengan sentuhan *Glassmorphism* untuk Dashboard internal.
*   **Aksen:** Warna *Emerald* (`#b5f164`) digunakan secara strategis untuk *Call to Action* (CTA) dan indikator positif.
*   **Ikonografi:** Menggunakan *Heroicons SVG* yang bersih dan minimalis untuk menggantikan emoji bawaan.

---

## 🛠 Teknologi yang Digunakan

*   **Frontend Library:** React (Vite)
*   **Bahasa Pemrograman:** TypeScript
*   **Styling:** Tailwind CSS (dengan utilitas desain kustom)
*   **Data Visualization:** Recharts
*   **Backend & Authentication:** Supabase
*   **Routing:** React Router v6
*   **Ikon:** Heroicons

---

## 🚀 Cara Menjalankan Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di perangkat Anda.

1.  **Kloning repositori ini:**
    ```bash
    git clone https://github.com/ihksanblny/finsmart-finance.git
    cd finsmart-finance
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan Variabel Lingkungan (Environment Variables):**
    Buat file `.env.local` di root direktori proyek Anda dan tambahkan kunci Supabase Anda:
    ```env
    VITE_SUPABASE_URL=URL_SUPABASE_ANDA
    VITE_SUPABASE_ANON_KEY=ANON_KEY_SUPABASE_ANDA
    ```

4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

5.  Buka browser dan kunjungi `http://localhost:5173` (atau port yang tertera pada terminal).

---

## 📌 Status Pengembangan (MVP)

Proyek ini saat ini berada dalam tahap Minimum Viable Product (MVP).
*   [x] Konfigurasi Autentikasi (Supabase)
*   [x] Integrasi CRUD Expense Tracker (Supabase)
*   [x] Modernisasi Antarmuka & Tipografi (Plus Jakarta Sans)
*   [x] Fitur Kalkulator Inflasi (Guest Mode)
*   [x] Fitur Benchmark Gaji (Guest Mode)
*   [ ] Integrasi Supabase untuk Data Benchmark Gaji Dinamis (Mendatang)
*   [ ] Fitur Personalisasi Target Keuangan (Mendatang)

---

Dibuat dengan ❤️ untuk membantu generasi muda mencapai kebebasan finansial yang sebenarnya.
