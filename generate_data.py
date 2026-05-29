import csv
import json
import random
from datetime import datetime, timedelta

# Configuration
NUM_ROWS = 800
FILE_NAME_CSV = "customer_dummy_800.csv"
FILE_NAME_JSON = "customer_dummy_800.json"

# Data pools
first_names = ["Budi", "Siti", "Andi", "Dewi", "Rizky", "Nabila", "Ahmad", "Intan", "Dimas", "Putri", 
               "Fajar", "Maya", "Rina", "Yusuf", "Sarah", "Gilang", "Ayu", "Hendra", "Tika", "Bagas",
               "Rafi", "Vina", "Nanda", "Shinta", "Arif", "Dinda", "Kevin", "Anisa", "Doni", "Nia",
               "Eko", "Laras", "Guruh", "Fitri", "Adit", "Ratna", "Bambang", "Wati", "Joko", "Siska"]
last_names = ["Santoso", "Aminah", "Wijaya", "Lestari", "Pratama", "Putri", "Fauzi", "Permata", "Saputra", "Aulia",
              "Nugroho", "Sari", "Kurnia", "Ramadhan", "Nabila", "Prakoso", "Wulandari", "Gunawan", "Maharani", "Aditya",
              "Akbar", "Melati", "Putra", "Ayu", "Setiawan", "Mahesa", "Pratama", "Rahma", "Haryanto", "Paramitha"]
cities = ["Jakarta", "Bandung", "Surabaya", "Medan", "Semarang", "Makassar", "Palembang", "Yogyakarta", "Malang", "Denpasar"]
genders = ["Laki-laki", "Perempuan"]
membership_levels = ["Bronze", "Silver", "Gold"]
payment_methods = ["Tunai", "Debit", "QRIS", "Transfer Bank"]
products = ["Paracetamol 500mg", "Amoxicillin", "Vitamin C 1000mg", "Obat Batuk Syrup", "Antasida Doen", "Minyak Telon", "Masker Medis", "Sanitizer", "Plester Luka", "Thermometer Digital"]
sources = ["Instagram", "TikTok", "Referral", "Walk-in", "Facebook", "Google Search"]
promo_status = ["Ya", "Tidak"]

def random_date(start_year, end_year):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    return (start + timedelta(days=random.randint(0, (end - start).days))).strftime("%Y-%m-%d")

data = []

for i in range(1, NUM_ROWS + 1):
    first = random.choice(first_names)
    last = random.choice(last_names)
    full_name = f"{first} {last}"
    username = f"{first.lower()}{random.randint(10, 99)}"
    customer_id = f"PAT-{str(i).padStart(4, '0')}" if hasattr(str, 'padStart') else f"PAT-{str(i).zfill(4)}"
    gender = random.choice(genders)
    birth_date = random_date(1960, 2005)
    phone = f"08{random.randint(100000000, 999999999)}"
    email = f"{username}@email.com"
    city = random.choice(cities)
    join_date = random_date(2020, 2025)
    loyalty = random.choice(membership_levels)
    status_active = random.choice(["Aktif", "Tidak Aktif"])
    total_transaction = random.randint(50000, 5000000)
    payment_method = random.choice(payment_methods)
    last_product = random.choice(products)
    last_transaction_date = random_date(2025, 2026)
    feedback = random.choice(["Sangat puas", "Cukup puas", "Pelayanan cepat", "Obat lengkap", "Harga bersahabat", "Biasa saja"])
    complaint = random.choice(["Tidak ada", "Antrian agak lama", "Stok obat kosong", "Salah input data"])
    source = random.choice(sources)
    promo = random.choice(promo_status)

    row = {
        "ID Customer": customer_id,
        "Nama Lengkap": full_name,
        "Username": username,
        "Jenis Kelamin": gender,
        "Tanggal Lahir": birth_date,
        "Nomor HP": phone,
        "Email": email,
        "Kota": city,
        "Tanggal Daftar": join_date,
        "Level Membership": loyalty,
        "Status Aktif": status_active,
        "Total Transaksi (Rp)": total_transaction,
        "Metode Pembayaran": payment_method,
        "Produk Terakhir": last_product,
        "Tanggal Transaksi Terakhir": last_transaction_date,
        "Feedback/Review": feedback,
        "Riwayat Komplain": complaint,
        "Sumber User": source,
        "Status Promo": promo
    }
    data.append(row)

# Save as CSV
with open(FILE_NAME_CSV, mode='w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)

# Save as JSON
with open(FILE_NAME_JSON, mode='w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print(f"Successfully generated {NUM_ROWS} rows in {FILE_NAME_CSV} and {FILE_NAME_JSON}")
