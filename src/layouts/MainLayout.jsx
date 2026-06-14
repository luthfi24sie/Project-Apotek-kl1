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
  StickyNote
} from "lucide-react";

export default function MainLayout() {
    // State for user profile with localStorage persistence
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem("userProfile");
        return saved ? JSON.parse(saved) : {
            userName: "Subash",
            role: "Super Admin",
            avatar: "https://avatar.iran.liara.run/public/28"
        };
    });

    useEffect(() => {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }, [userProfile]);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { 
            id: 'inventory', 
            label: 'Inventaris', 
            icon: Package, 
            submenu: [
                { label: 'Daftar Obat', path: '/medicines' },
                { label: 'Grup Obat', path: '/medicine-groups' }
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
        { id: 'config', label: 'Konfigurasi', icon: Settings, path: '/config' },
        { 
            id: 'contact', 
            label: 'Manajemen Kontak', 
            icon: UserCheck, 
            submenu: [
                { label: 'Pemasok', path: '/suppliers' },
                { label: 'Pelanggan', path: '/customers' }
            ] 
        },
        { id: 'notifications', label: 'Notifikasi', icon: Bell, path: '/notifications', badge: true },
        { id: 'chat', label: 'Chat Pengunjung', icon: MessageSquare, path: '/chat' },
        { id: 'settings', label: 'Pengaturan Aplikasi', icon: Settings, path: '/settings' },
        { id: 'covid-19', label: 'Covid-19', icon: Activity, path: '/covid-19' },
        { id: 'fitur-xyz', label: 'Fitur XYZ', icon: Zap, path: '/fitur-xyz' },
        { id: 'notes', label: 'Catatan', icon: StickyNote, path: '/notes' },
    ];

    return (
        <div id="app-container" className="bg-page-bg min-h-screen flex">
            {/* Sidebar fixed width 220px according to Figma */}
            <Sidebar 
                menuItems={menuItems} 
                userName={userProfile.userName}
                role={userProfile.role}
                avatar={userProfile.avatar}
                onUpdateProfile={setUserProfile}
            />
            
            <div id="main-content" className="flex-1 flex flex-col ml-[220px]">
                {/* TopBar height 60px */}
                <Header userName={userProfile.userName} />
                
                {/* Content area with 24px padding */}
                <main className="p-6 flex-1 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
