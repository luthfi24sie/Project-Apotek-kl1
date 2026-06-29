import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings, 
  Bell, 
  MessageSquare, 
  Activity, 
  UserCheck,
  Zap,
  StickyNote,
  ShoppingCart,
  Users,
  Layers,
  Biohazard
} from "lucide-react";

export default function MainLayout() {
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem("userProfile");
        return saved ? JSON.parse(saved) : {
            userName: "User",
            role: "Super Admin",
            avatar: "https://avatar.iran.liara.run/public/28"
        };
    });

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";
    });

    useEffect(() => {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'orders', label: 'Pesanan', icon: ShoppingCart, path: '/orders' },
        { 
            id: 'crm', 
            label: 'CRM', 
            icon: Users, 
            submenu: [
                { label: 'Member', path: '/members' },
                { label: 'Pelanggan', path: '/customers' }
            ] 
        },
        { 
            id: 'inventory', 
            label: 'Inventory', 
            icon: Package, 
            submenu: [
                { label: 'Daftar Obat', path: '/medicines' },
                { label: 'Grup Obat', path: '/medicine-groups' },
                { label: 'Produk', path: '/products' }
            ] 
        },
        { 
            id: 'contact', 
            label: 'Manajemen Kontak', 
            icon: UserCheck, 
            submenu: [
                { label: 'Pemasok', path: '/suppliers' }
            ] 
        },
        { 
            id: 'reports', 
            label: 'Laporan', 
            icon: FileText, 
            submenu: [
                { label: 'Laporan Penjualan', path: '/reports/sales' },
                { label: 'Laporan Apotek', path: '/reports/pharmacy' }
            ] 
        },
        { id: 'covid', label: 'COVID-19', icon: Biohazard, path: '/covid-19' },
        { id: 'components', label: 'Komponen', icon: Layers, path: '/components' },
        { id: 'notes', label: 'Catatan', icon: StickyNote, path: '/notes' },
        { id: 'notifications', label: 'Notifikasi', icon: Bell, path: '/notifications', badge: '01' },
        { id: 'chat', label: 'Obrolan', icon: MessageSquare, path: '/chat' },
        { id: 'config', label: 'Konfigurasi', icon: Settings, path: '/config' },
        { id: 'settings', label: 'Pengaturan Aplikasi', icon: Settings, path: '/settings' },
    ];

    return (
        <div id="app-container" className={`min-h-screen flex ${darkMode ? "bg-slate-900" : "bg-page-bg"}`}>
            <Sidebar 
                menuItems={menuItems} 
                userName={userProfile.userName}
                role={userProfile.role}
                avatar={userProfile.avatar}
                onUpdateProfile={setUserProfile}
                darkMode={darkMode}
            />
            
            <div id="main-content" className="flex-1 flex flex-col ml-[240px]">
                <Header userName={userProfile.userName} darkMode={darkMode} />
                <main className="p-6 flex-1 overflow-x-hidden">
                    <Outlet context={{ darkMode, setDarkMode }} />
                </main>
            </div>
        </div>
    );
}
