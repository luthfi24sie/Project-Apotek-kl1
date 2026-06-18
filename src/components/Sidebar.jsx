import React, { useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
    ChevronDown, 
    ChevronRight,
    MoreVertical,
    ShoppingCart,
    User,
    Camera,
    Save,
    LogOut
} from "lucide-react";
import Modal from "./ui/Modal";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { supabase } from "../lib/supabaseClient";

/**
 * Sidebar Component - Apotek Sehat Design System
 * Sidebar width: 220px
 * Background: #c4cd22ff (lebih terang)
 */
export default function Sidebar({ 
    menuItems = [], 
    userName = "Subash", 
    role = "Super Admin", 
    avatar = "https://avatar.iran.liara.run/public/28",
    onUpdateProfile,
    darkMode = false
}) {
    const _location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [openMenus, setOpenMenus] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editForm, setEditForm] = useState({ userName, role, avatar });

    const toggleMenu = (id) => {
        setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleEditProfile = () => {
        setEditForm({ userName, role, avatar });
        setIsEditModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
        setIsDropdownOpen(false);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (onUpdateProfile) {
            onUpdateProfile(editForm);
        }
        setIsEditModalOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const navItemClass = (isActive) => 
        `flex items-center justify-between gap-3 px-3 py-2 rounded-[6px] transition-all duration-200 group relative text-[13px]
        ${isActive ? 
            "bg-primary text-white font-medium" : 
            "text-sidebar-text hover:text-white"
        }`;

    const subNavItemClass = (isActive) => 
        `flex items-center gap-3 pl-9 pr-3 py-1.5 rounded-[6px] transition-all duration-200 text-[12px]
        ${isActive ? 
            "text-white font-medium" : 
            "text-sidebar-text hover:text-white"
        }`;

    return (
        <div id="sidebar" className={`w-[220px] h-screen flex flex-col fixed left-0 top-0 z-40 shadow-xl font-inter ${darkMode ? "bg-slate-900" : "bg-sidebar-bg"}`}>
            {/* Logo Apotek Sehat dengan background kuning seperti Figma */}
            <div className={`h-[60px] flex items-center px-5 border-b flex-shrink-0 ${darkMode ? "border-slate-800" : "border-white/5"} ${darkMode ? "bg-slate-800" : "bg-sidebar-bg-light"}`}>
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 p-1.5 rounded-lg">
                        <ShoppingCart className="text-slate-900 size-5" />
                    </div>
                    <span className="font-bold text-[16px] text-white tracking-tight">Apotek Sehat</span>
                </div>
            </div>

            {/* User Profile Section dengan Dropdown dan Warna Emas Super Admin */}
            <div className="px-4 py-6 relative flex-shrink-0">
                <div className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-white/5 hover:bg-white/10"}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="relative">
                            <img src={avatar} className="size-11 rounded-full border border-white/10 object-cover" alt={userName} />
                            <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 ${darkMode ? "border-slate-900 bg-green-500" : "border-sidebar-bg bg-green-500"}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-white truncate leading-none mb-1">{userName}</p>
                            <p className="text-[11px] font-bold text-[var(--color-gold-bright)] truncate leading-none drop-shadow-[0_0_4px_rgba(255,215,0,0.4)]">{role}</p>
                        </div>
                    </div>
                    <button className="text-sidebar-text hover:text-white p-1 rounded-md hover:bg-white/5 transition-all">
                        <MoreVertical size={16} />
                    </button>
                </div>

                {/* Dropdown Menu My Profile & Logout */}
                {isDropdownOpen && (
                    <div className={`absolute left-4 right-4 mt-2 rounded-lg shadow-xl border overflow-hidden animate-in z-50 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-700 border-white/10"}`}>
                        <button 
                            onClick={handleEditProfile}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                        >
                            <User size={16} />
                            My Profile
                        </button>
                        <button 
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/10 transition-colors border-t ${darkMode ? "border-slate-700 text-red-400" : "border-white/10 text-red-400"}`}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation List (SEMUA MENU TETAP SAMA PERSIS!) */}
            <div className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-6 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#FFC107 transparent' }}>
                {menuItems.map((item) => {
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isMenuOpen = openMenus[item.id];

                    if (hasSubmenu) {
                        return (
                            <div key={item.id} className="space-y-0.5">
                                <button 
                                    onClick={() => toggleMenu(item.id)}
                                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-[6px] transition-all text-[13px] ${isMenuOpen ? "text-white" : "text-sidebar-text hover:text-white"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon && <item.icon size={16} />}
                                        <span>{item.label}</span>
                                    </div>
                                    {isMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                                
                                {isMenuOpen && (
                                    <div className="space-y-0.5 animate-in">
                                        {item.submenu.map((sub) => (
                                            <NavLink 
                                                key={sub.path} 
                                                to={sub.path} 
                                                className={({ isActive }) => subNavItemClass(isActive)}
                                            >
                                                {sub.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <NavLink 
                            key={item.id} 
                            to={item.path} 
                            className={({ isActive }) => navItemClass(isActive)}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && <item.icon size={16} />}
                                <span>{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t ${darkMode ? "border-slate-800" : "border-white/5"}`}>
                <p className="text-[10px] text-sidebar-text font-medium opacity-50 uppercase tracking-widest">Powered by Apotek Sehat</p>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Profil"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Batal</Button>
                        <Button onClick={handleSaveProfile} icon={Save}>Simpan Perubahan</Button>
                    </>
                }
            >
                <div className="space-y-5">
                    <div className="flex flex-col items-center gap-3 mb-2">
                        <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                            <img src={editForm.avatar} className={`size-24 rounded-full border-4 object-cover shadow-md ${darkMode ? "border-slate-800" : "border-page-bg"}`} alt="Preview" />
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </div>
                        <p className="text-[12px] text-text-secondary">Klik foto untuk mengganti avatar</p>
                    </div>

                    <InputField 
                        label="Nama Lengkap" 
                        value={editForm.userName}
                        onChange={(e) => setEditForm({...editForm, userName: e.target.value})}
                        placeholder="Masukkan nama Anda"
                        icon={User}
                    />
                    
                    <InputField 
                        label="Role / Jabatan" 
                        value={editForm.role}
                        onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                        placeholder="Contoh: Super Admin"
                    />
                </div>
            </Modal>
        </div>
    );
}
