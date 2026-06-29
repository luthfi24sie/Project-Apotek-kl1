import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  User,
  FileText,
  Settings,
  CheckCircle,
  Clock,
  Truck,
  Heart,
  Star,
  ArrowRight,
} from "lucide-react";

export default function MemberDashboard() {
  const user = JSON.parse(localStorage.getItem("userProfile") || '{"userName": "Member", "role": "Member"}');

  const stats = [
    { label: "Total Pesanan", value: "5", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pesanan Selesai", value: "3", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pesanan Diproses", value: "1", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Pesanan Dikirim", value: "1", icon: Truck, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const quickLinks = [
    { path: "/member/profile", icon: User, label: "Lihat Profil", desc: "Ubah data profil Anda" },
    { path: "/member/orders", icon: FileText, label: "Riwayat Pesanan", desc: "Lihat semua transaksi" },
    { path: "/member/settings", icon: Settings, label: "Pengaturan", desc: "Pengaturan akun" },
  ];

  const products = [
    { id: 1, name: "Paracetamol 500mg", price: "Rp 15.000", image: "https://images.unsplash.com/photo-1585435557343-3b092031a830?w=300&h=300&fit=crop" },
    { id: 2, name: "Vitamin C 1000mg", price: "Rp 45.000", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop" },
    { id: 3, name: "Obat Batuk Herbal", price: "Rp 35.000", image: "https://images.unsplash.com/photo-1587854692749-197908c92f57?w=300&h=300&fit=crop" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-yellow-400/20 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] rounded-full bg-white/10 blur-[60px]" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user.userName}! 👋</h1>
          <p className="text-white/90 text-lg max-w-xl">
            Kelola profil dan riwayat pesanan Anda dengan mudah di Apotek Sehat.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={28} />
            </div>
            <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          Menu Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <link.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{link.label}</h3>
                  <p className="text-sm text-slate-600">{link.desc}</p>
                </div>
                <ArrowRight size={20} className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          Rekomendasi Produk
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-all duration-300">
                  <Heart size={20} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
                <p className="text-primary font-bold text-lg mb-4">{product.price}</p>
                <button className="w-full bg-slate-100 hover:bg-primary hover:text-white text-slate-900 font-semibold py-3 rounded-xl transition-all duration-300">
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
