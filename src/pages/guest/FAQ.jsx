import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqList = [
        {
            question: "Bagaimana cara mendaftar menjadi member?",
            answer: "Klik tombol 'Daftar' di pojok kanan atas, isi data diri Anda, dan akun member Anda akan langsung aktif!"
        },
        {
            question: "Apakah ada biaya untuk menjadi member?",
            answer: "Tidak ada biaya apapun! Pendaftaran member di Apotek Sehat adalah 100% gratis."
        },
        {
            question: "Bagaimana cara memesan obat?",
            answer: "Untuk saat ini, pemesanan dapat dilakukan secara langsung di toko. Fiturnya untuk online akan segera hadir!"
        },
        {
            question: "Apakah obat di Apotek Sehat terjamin keasliannya?",
            answer: "Tentu saja! Semua produk di Apotek Sehat berasal dari supplier resmi dan terjamin keasliannya."
        },
        {
            question: "Bagaimana jika ingin konsultasi dengan apoteker?",
            answer: "Anda bisa langsung mengunjungi apotek kami atau menghubungi nomor kontak yang tersedia untuk konsultasi."
        },
    ];

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Pertanyaan yang Sering Diajukan
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Temukan jawaban dari pertanyaan umum tentang Apotek Sehat di sini.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqList.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl border border-border-default shadow-sm"
                    >
                        <button
                            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <span className="font-semibold text-slate-900">{faq.question}</span>
                            {openFAQ === index ? (
                                <Minus className="text-primary size-5" />
                            ) : (
                                <Plus className="text-slate-500 size-5" />
                            )}
                        </button>
                        {openFAQ === index && (
                            <div className="px-6 pb-6 text-slate-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
