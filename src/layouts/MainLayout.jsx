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
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem("userProfile");
        return saved ? JSON.parse(saved) : {
            userName: "User",
            role: "Admin",
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
        { 
            id: 'inventory', 
            label: 'Inventory', 
            icon: Package, 
            submenu: [
                { label: 'List of Medicines', path: '/medicines' },
                { label: 'Medicine Groups', path: '/medicine-groups' }
            ] 
        },
        { 
            id: 'reports', 
            label: 'Reports', 
            icon: FileText, 
            submenu: [
                { label: 'Sales Report', path: '/reports/sales' },
                { label: 'Payment Report', path: '/reports/payment' }
            ] 
        },
        { id: 'config', label: 'Configuration', icon: Settings, path: '/config' },
        { 
            id: 'contact', 
            label: 'Contact Management', 
            icon: UserCheck, 
            submenu: [
                { label: 'Suppliers', path: '/suppliers' },
                { label: 'Customers', path: '/customers' }
            ] 
        },
        { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', badge: '01' },
        { id: 'chat', label: 'Chat with Visitors', icon: MessageSquare, path: '/chat' },
        { id: 'settings', label: 'Application Settings', icon: Settings, path: '/settings' },
        { id: 'notes', label: 'Catatan', icon: StickyNote, path: '/notes' },
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
