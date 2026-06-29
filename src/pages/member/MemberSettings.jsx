import React from "react";
import { Bell, Lock, User } from "lucide-react";

export default function MemberSettings() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    Pengaturan Akun
                </h1>
                <p className="text-slate-600">
                    Atur preferensi dan keamanan akun Anda.
                </p>
            </div>

            <div className="space-y-4">
                {[
                    { icon: Bell, title: "Notifikasi", desc: "Atur notifikasi untuk update pesanan" },
                    { icon: Lock, title: "Keamanan", desc: "Ganti kata sandi dan pengaturan keamanan" },
                    { icon: User, title: "Akun", desc: "Kelola data akun dan preferensi Anda" },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-border-default shadow-sm flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <item.icon className="text-yellow-600 size-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                        <button className="text-sm font-medium text-primary">
                            Atur →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
