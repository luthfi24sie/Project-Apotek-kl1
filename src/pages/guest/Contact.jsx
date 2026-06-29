import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Hubungi Kami
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Ada pertanyaan atau butuh bantuan? Silakan hubungi kami!
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Info Kontak */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Informasi Kontak</h2>

                    {[
                        { icon: MapPin, title: "Alamat", desc: "Jl. Kesehatan No. 123, Jakarta Pusat" },
                        { icon: Phone, title: "Telepon", desc: "(021) 1234-4567" },
                        { icon: Mail, title: "Email", desc: "info@apoteksehat.com" },
                        { icon: Clock, title: "Jam Operasional", desc: "Setiap hari: 08:00 - 21:00" },
                    ].map((item, index) => (
                        <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-border-default">
                            <div className="bg-yellow-100 p-2 rounded-lg shrink-0">
                                <item.icon className="text-yellow-600 size-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Kontak */}
                <div className="bg-white p-8 rounded-xl border border-border-default">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Kirim Pesan
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Nama"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Masukkan nama Anda"
                            required
                        />
                        <InputField
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Masukkan email Anda"
                            required
                        />
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-900">
                                Pesan
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tulis pesan Anda di sini..."
                                rows={5}
                                className="w-full px-3 py-2 rounded-lg border border-border-default focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSent}
                        >
                            {isSent ? "Pesan Terkirim!" : "Kirim Pesan"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
