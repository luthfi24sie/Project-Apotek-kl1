import React from "react";
import { Link } from "react-router-dom";
import { 
    ShoppingBag, 
    User, 
    FileText, 
    Settings,
    CheckCircle,
    Clock,
    Truck
} from "lucide-react";

export default function MemberDashboard() {
    const user = JSON.parse(localStorage.getItem("userProfile") || '{"userName": "Member", "role": "Member"}');

    const stats = [
        { label: "Total Pesanan", value: "5", icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
        { label: "Pesanan Selesai", value: "3", icon: CheckCircle, color: "text-green-600 bg-green-100" },
        { label: "Pesanan Diproses", value: "1", icon: Clock, color: "text-yellow-600 bg-yellow-100" },
        { label: "Pesanan Dikirim", value: "1", icon: Truck, color: "text-purple-600 bg-purple-100" },
    ];

    const quickLinks = [
        { path: "/member/profile", icon: User, label: "Lihat Profil" },
        { path: "/member/orders", icon: FileText, label: "Riwayat Pesanan" },
        { path: "/member/settings", icon: Settings, label: "Pengaturan" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Selamat Datang, {user.userName}! 👋
                </h1>
                <p className="text-white/90">
                    Kelola profil dan riwayat pesanan Anda di sini.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-border-default shadow-sm">
                        <div className={`p-3 rounded-lg w-fit mb-4 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className="bg-white p-6 rounded-xl border border-border-default shadow-sm hover:shadow-md transition-all flex items-center gap-4"
                        >
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <link.icon className="text-yellow-600 size-6" />
                            </div>
                            <span className="text-slate-900 font-medium">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
