import React from "react";
import { Outlet } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Hero Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary via-primary/80 to-yellow-600 p-10 text-white flex-col justify-between relative overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-yellow-400/30 blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[60px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <ShoppingCart className="text-primary size-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Apotek Sehat</h2>
                <p className="text-white/80 text-sm">Sistem Manajemen Apotek</p>
              </div>
            </div>

            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4">
              Selamat Datang Kembali
            </h1>
            <p className="text-white/90 text-lg max-w-sm">
              Kelola apotek Anda dengan lebih profesional dan efisien bersama Apotek Sehat.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              </div>
              <div>
                <p className="font-semibold">100% Aman & Terpercaya</p>
                <p className="text-white/70 text-sm">Data Anda terlindungi</p>
              </div>
            </div>
            <p className="text-xs text-white/50">© 2026 Apotek Sehat. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
