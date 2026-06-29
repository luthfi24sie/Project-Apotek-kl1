import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Users, TrendingUp, Shield, Check } from "lucide-react";

export default function Home() {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-16">
                <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mb-6">
                    ✨ Apotek Terpercaya Sejak 2020
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Solusi Kesehatan Terlengkap
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                    Apotek Sehat menyediakan obat-obatan berkualitas dan layanan farmasi profesional untuk kebutuhan kesehatan keluarga Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/register"
                        className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Daftar Sekarang
                    </Link>
                    <Link
                        to="/about"
                        className="border-2 border-primary text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/5 transition-colors"
                    >
                        Lihat Tentang Kami
                    </Link>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-12">
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
                    Kenapa Memilih Apotek Sehat?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: ShoppingCart, title: "Produk Lengkap", desc: "Obat dan produk kesehatan terlengkap" },
                        { icon: Users, title: "Apoteker Profesional", desc: "Siap konsultasi dan memberikan saran" },
                        { icon: TrendingUp, title: "Harga Terjangkau", desc: "Kualitas premium dengan harga terbaik" },
                        { icon: Shield, title: "Aman & Terpercaya", desc: "Semua produk terjamin keaslian" },
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-border-default shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-yellow-100 p-3 rounded-lg w-fit mb-4">
                                <feature.icon className="text-yellow-600 size-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-12 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Bergabung Sekarang dan Dapatkan Diskon Spesial!
                </h2>
                <p className="text-white/90 mb-6">
                    Daftar menjadi member untuk mendapatkan keuntungan eksklusif!
                </p>
                <Link
                    to="/register"
                    className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors"
                >
                    Daftar Member
                </Link>
            </section>
        </div>
    );
}
