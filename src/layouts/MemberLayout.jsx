import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { 
    ShoppingCart, 
    Home, 
    User, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    FileText,
    CreditCard
} from "lucide-react";

export default function MemberLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("userProfile") || '{"userName": "Member", "role": "Member"}');

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        navigate("/home");
    };

    const menuItems = [
        { path: "/member/dashboard", icon: Home, label: "Dashboard" },
        { path: "/member/profile", icon: User, label: "Profil" },
        { path: "/member/orders", icon: FileText, label: "Riwayat Pesanan" },
        { path: "/member/settings", icon: Settings, label: "Pengaturan" },
    ];

    return (
        <div className="min-h-screen bg-page-bg font-inter">
            {/* Navbar Member */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-default shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/member/dashboard" className="flex items-center gap-2">
                            <div className="bg-yellow-400 p-2 rounded-lg">
                                <ShoppingCart className="text-slate-900 size-6" />
                            </div>
                            <span className="font-bold text-xl text-slate-900">Apotek Sehat</span>
                        </Link>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex items-center gap-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                                        location.pathname === item.path
                                            ? "text-primary"
                                            : "text-slate-600 hover:text-primary"
                                    }`}
                                >
                                    <item.icon size={16} />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* User & Logout */}
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <User className="text-yellow-600 size-4" />
                                </div>
                                <span className="text-sm font-medium text-slate-900">{user.userName}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                            >
                                <LogOut size={16} />
                                Keluar
                            </button>
                        </div>

                        {/* Toggle Mobile Menu */}
                        <button
                            className="md:hidden text-slate-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-border-default">
                        <div className="px-4 py-4 space-y-3">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-2 text-sm font-medium p-2 rounded-lg ${
                                        location.pathname === item.path
                                            ? "text-primary bg-primary/5"
                                            : "text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm font-medium text-red-600 p-2 rounded-lg w-full"
                            >
                                <LogOut size={18} />
                                Keluar
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Konten Utama */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
