import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { ShoppingCart, Home, Info, MessageSquare, LogIn, UserPlus } from "lucide-react";

export default function GuestLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-page-bg font-inter">
            {/* Navbar Guest */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-default shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/home" className="flex items-center gap-2">
                            <div className="bg-yellow-400 p-2 rounded-lg">
                                <ShoppingCart className="text-slate-900 size-6" />
                            </div>
                            <span className="font-bold text-xl text-slate-900">Apotek Sehat</span>
                        </Link>

                        {/* Menu Navigasi */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link
                                to="/home"
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === "/home" ? "text-primary" : "text-slate-600 hover:text-primary"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Home size={16} />
                                    Beranda
                                </div>
                            </Link>
                            <Link
                                to="/about"
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === "/about" ? "text-primary" : "text-slate-600 hover:text-primary"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Info size={16} />
                                    Tentang
                                </div>
                            </Link>
                            <Link
                                to="/faq"
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === "/faq" ? "text-primary" : "text-slate-600 hover:text-primary"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} />
                                    FAQ
                                </div>
                            </Link>
                            <Link
                                to="/contact"
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === "/contact" ? "text-primary" : "text-slate-600 hover:text-primary"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} />
                                    Kontak
                                </div>
                            </Link>
                        </div>

                        {/* Tombol Login/Register */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <LogIn size={16} />
                                Masuk
                            </Link>
                            <Link
                                to="/register"
                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
                            >
                                <UserPlus size={16} />
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Konten Utama */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-yellow-400 p-2 rounded-lg">
                                    <ShoppingCart className="text-slate-900 size-6" />
                                </div>
                                <span className="font-bold text-xl text-white">Apotek Sehat</span>
                            </div>
                            <p className="text-sm text-slate-400">
                                Apotek terpercaya untuk kebutuhan kesehatan Anda.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/home" className="hover:text-yellow-400">Beranda</Link></li>
                                <li><Link to="/about" className="hover:text-yellow-400">Tentang</Link></li>
                                <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
                                <li><Link to="/contact" className="hover:text-yellow-400">Kontak</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Kontak</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Jl. Kesehatan No. 123, Jakarta</li>
                                <li>Telp: (021) 1234-4567</li>
                                <li>Email: info@apoteksehat.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
                        &copy; 2026 Apotek Sehat. Semua hak cipta dilindungi.
                    </div>
                </div>
            </footer>
        </div>
    );
}
