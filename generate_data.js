import fs from 'fs';

const NUM_ROWS = 800;
const FILE_NAME_CSV = "customer_dummy_800.csv";
const FILE_NAME_JSON = "customer_dummy_800.json";

const firstNames = ["Budi", "Siti", "Andi", "Dewi", "Rizky", "Nabila", "Ahmad", "Intan", "Dimas", "Putri", 
                  "Fajar", "Maya", "Rina", "Yusuf", "Sarah", "Gilang", "Ayu", "Hendra", "Tika", "Bagas",
                  "Rafi", "Vina", "Nanda", "Shinta", "Arif", "Dinda", "Kevin", "Anisa", "Doni", "Nia",
                  "Eko", "Laras", "Guruh", "Fitri", "Adit", "Ratna", "Bambang", "Wati", "Joko", "Siska"];
const lastNames = ["Santoso", "Aminah", "Wijaya", "Lestari", "Pratama", "Putri", "Fauzi", "Permata", "Saputra", "Aulia",
                 "Nugroho", "Sari", "Kurnia", "Ramadhan", "Nabila", "Prakoso", "Wulandari", "Gunawan", "Maharani", "Aditya",
                 "Akbar", "Melati", "Putra", "Ayu", "Setiawan", "Mahesa", "Pratama", "Rahma", "Haryanto", "Paramitha"];
const cities = ["Jakarta", "Bandung", "Surabaya", "Medan", "Semarang", "Makassar", "Palembang", "Yogyakarta", "Malang", "Denpasar"];
const genders = ["Laki-laki", "Perempuan"];
const membershipLevels = ["Bronze", "Silver", "Gold"];
const paymentMethods = ["Tunai", "Debit", "QRIS", "Transfer Bank"];
const products = ["Paracetamol 500mg", "Amoxicillin", "Vitamin C 1000mg", "Obat Batuk Syrup", "Antasida Doen", "Minyak Telon", "Masker Medis", "Sanitizer", "Plester Luka", "Thermometer Digital"];
const sources = ["Instagram", "TikTok", "Referral", "Walk-in", "Facebook", "Google Search"];
const promoStatus = ["Ya", "Tidak"];

function randomDate(startYear, endYear) {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const data = [];

for (let i = 1; i <= NUM_ROWS; i++) {
    const first = randomChoice(firstNames);
    const last = randomChoice(lastNames);
    const fullName = `${first} ${last}`;
    const username = `${first.toLowerCase()}${Math.floor(Math.random() * 90) + 10}`;
    const customerId = `PAT-${i.toString().padStart(4, '0')}`;
    const gender = randomChoice(genders);
    const birthDate = randomDate(1960, 2005);
    const phone = `08${Math.floor(Math.random() * 900000000) + 100000000}`;
    const email = `${username}@email.com`;
    const city = randomChoice(cities);
    const joinDate = randomDate(2020, 2024);
    const loyalty = randomChoice(membershipLevels);
    const statusActive = Math.random() > 0.1 ? "Aktif" : "Tidak Aktif";
    const totalTransaction = Math.floor(Math.random() * 4950000) + 50000;
    const paymentMethod = randomChoice(paymentMethods);
    const lastProduct = randomChoice(products);
    const lastTransactionDate = randomDate(2025, 2026);
    const feedback = randomChoice(["Sangat puas", "Cukup puas", "Pelayanan cepat", "Obat lengkap", "Harga bersahabat", "Biasa saja"]);
    const complaint = randomChoice(["Tidak ada", "Antrian agak lama", "Stok obat kosong", "Salah input data"]);
    const source = randomChoice(sources);
    const promo = randomChoice(promoStatus);

    const row = {
        "customerId": customerId,
        "customerName": fullName,
        "username": username,
        "gender": gender,
        "birthDate": birthDate,
        "phone": phone,
        "email": email,
        "city": city,
        "joinDate": joinDate,
        "loyalty": loyalty,
        "status": statusActive,
        "totalTransaction": totalTransaction,
        "paymentMethod": paymentMethod,
        "lastProduct": lastProduct,
        "lastTransactionDate": lastTransactionDate,
        "feedback": feedback,
        "complaint": complaint,
        "source": source,
        "promo": promo
    };
    data.push(row);
}

// Save as JSON
fs.writeFileSync(FILE_NAME_JSON, JSON.stringify(data, null, 4));

// Save as CSV
const headers = Object.keys(data[0]);
const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
        let val = row[header];
        if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
        return val;
    }).join(','))
].join('\n');

fs.writeFileSync(FILE_NAME_CSV, csvContent);

console.log(`Successfully generated ${NUM_ROWS} rows in ${FILE_NAME_CSV} and ${FILE_NAME_JSON}`);
