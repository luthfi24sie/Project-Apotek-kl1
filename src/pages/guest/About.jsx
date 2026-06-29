import React from "react";
import { Info, Heart, Users, Building } from "lucide-react";

export default function About() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Tentang Apotek Sehat
                </h1>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    Apotek Sehat berkomitmen menyediakan layanan farmasi terbaik untuk masyarakat Indonesia sejak tahun 2020.
                </p>
            </div>

            {/* Tentang Kami */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="bg-yellow-100 p-3 rounded-lg w-fit mb-4">
                        <Info className="text-yellow-600 size-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Sejarah Apotek Sehat</h2>
                    <p className="text-slate-600 mb-4">
                        Apotek Sehat didirikan dengan visi menyediakan obat-obatan berkualitas dan layanan farmasi yang profesional dan terpercaya.
                    </p>
                    <p className="text-slate-600">
                        Mulai dari satu apotek kecil di Jakarta, kini Apotek Sehat telah berkembang menjadi salah satu apotek terpercaya dengan beberapa cabang.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-xl border border-border-default shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">Nilai Kami</h3>
                    <ul className="space-y-4">
                        {[
                            { icon: Heart, title: "Peduli", desc: "Selalu mengutamakan kesehatan pelanggan" },
                            { icon: Users, title: "Profesional", desc: "Tim apoteker dan staf yang berpengalaman" },
                            { icon: Building, title: "Terpercaya", desc: "Semua produk terjamin keaslian" },
                        ].map((item, index) => (
                            <li key={index} className="flex gap-4 items-start">
                                <div className="bg-yellow-100 p-2 rounded-lg shrink-0">
                                    <item.icon className="text-yellow-600 size-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">{item.title}</h4>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
