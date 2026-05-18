import React from "react";
import { Outlet } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-page-bg flex items-center justify-center p-6 font-inter">
            {/* Centered Login Card 420px according to Figma */}
            <div className="w-full max-w-[420px] bg-white rounded-[10px] border border-border-default shadow-sm p-10 sm:p-12">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-primary p-2 rounded-lg">
                            <ShoppingCart className="text-white size-6" />
                        </div>
                        <span className="font-semibold text-[20px] text-text-primary tracking-tight">Apotek Sehat</span>
                    </div>
                    <h1 className="text-[22px] font-semibold text-text-primary">Selamat Datang Kembali</h1>
                    <p className="text-[13px] text-text-secondary mt-1">Silakan masuk ke akun Anda</p>
                </div>

                <Outlet />
                
                <div className="mt-8 pt-6 border-t border-border-default text-center">
                    <p className="text-[11px] text-text-muted font-bold uppercase tracking-widest">
                        Apotek Sehat &copy; 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
