# LAPORAN PROGRESS PROJEK CRM APOTEK SEHAT

## 1. Penjelasan Prototype Aplikasi
Projek CRM Apotek Sehat saat ini telah mencapai tahap prototype fungsional dengan fitur-fitur utama sebagai berikut:

*   **Dashboard Utama**: Menyediakan ringkasan eksekutif mengenai total obat, resep masuk, pasien baru, dan peringatan stok menipis. Dilengkapi dengan grafik tren penjualan (Line Chart) dan komposisi stok (Bar Chart) untuk mendukung pengambilan keputusan cepat.
*   **Manajemen Inventaris**: Prototype untuk mengelola database obat, kategori, harga, dan jumlah stok. Fitur ini krusial untuk memastikan ketersediaan produk bagi pelanggan.
*   **Manajemen Transaksi**: Prototype untuk mencatat setiap resep dan penjualan yang masuk, lengkap dengan status pembayaran dan total biaya.
*   **Manajemen Pasien (CRM)**: Fitur inti yang mengelola 800 data dummy pasien. Mencakup profil lengkap, level membership (Gold, Silver, Bronze), riwayat transaksi, dan status aktif. Prototype ini memungkinkan apotek untuk melakukan segmentasi pelanggan dan personalisasi layanan.

## 2. Penjelasan 4 Tipe CRM dalam Projek
Aplikasi Apotek Sehat diimplementasikan dengan mempertimbangkan 4 tipe CRM utama:

1.  **Strategic CRM**: Berfokus pada pengembangan budaya bisnis yang berpusat pada pelanggan. Dalam aplikasi, ini diwujudkan melalui sistem **Level Membership (Loyalty Program)**. Apotek memberikan nilai lebih kepada pelanggan setia (Gold/Silver) untuk mempertahankan retensi jangka panjang.
2.  **Operational CRM**: Berfokus pada otomatisasi proses bisnis yang berhadapan dengan pelanggan. Diimplementasikan pada fitur **Manajemen Transaksi dan Inventaris** yang mempercepat proses layanan resep dan pemantauan stok secara real-time agar pelanggan tidak kecewa karena stok kosong.
3.  **Analytical CRM**: Berfokus pada analisis data pelanggan untuk mendapatkan wawasan (insight). Diwujudkan dalam fitur **Dashboard Grafik** dan **Total Transaksi per Pasien**. Data 800 pasien yang ada dapat dianalisis untuk mengetahui produk paling laku atau kapan waktu tersibuk apotek.
4.  **Collaborative CRM**: Berfokus pada integrasi komunikasi antara berbagai departemen atau mitra untuk melayani pelanggan. Dalam konteks apotek, ini terlihat pada integrasi data antara **Bagian Gudang (Inventaris)** dan **Bagian Kasir (Transaksi)**, sehingga informasi obat yang tersedia selalu sinkron saat melayani pasien.

## 3. Data Dummy (800 Baris)
Sesuai instruksi, telah dibuat database sebanyak 800 baris data pasien dengan kolom-kolom relevan untuk studi kasus Apotek:
*   **Identitas**: Nama, Username, ID Customer, Gender, Tgl Lahir.
*   **Kontak**: No HP, Email, Kota.
*   **Membership**: Tgl Daftar, Level Membership, Status Aktif.
*   **Transaksi**: Total Transaksi, Metode Bayar, Produk Terakhir, Tgl Transaksi Terakhir.
*   **Engagement**: Feedback/Review, Riwayat Komplain, Sumber User, Status Promo.

Data ini tersedia dalam format **CSV (untuk Excel)** dan **JSON (untuk integrasi aplikasi)**.
