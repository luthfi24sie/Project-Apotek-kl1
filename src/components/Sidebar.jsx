import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronRight,
  MoreVertical,
  ShoppingCart,
  User,
  Camera,
  Save,
  X as CloseIcon
} from "lucide-react";
import Modal from "./ui/Modal";
import InputField from "./ui/InputField";
import Button from "./ui/Button";

/**
 * Sidebar Component - Apotek Sehat Design System
 * Sidebar width: 220px
 * Background: #1A1F2E
 */
export default function Sidebar({ 
  menuItems = [], 
  userName = "Subash", 
  role = "Super Admin", 
  avatar = "https://avatar.iran.liara.run/public/28",
  onUpdateProfile
}) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ userName, role, avatar });

  const toggleMenu = (id) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEditProfile = () => {
    setEditForm({ userName, role, avatar });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(editForm);
    }
    setIsEditModalOpen(false);
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
    <div id="sidebar" className="w-[220px] bg-sidebar-bg min-h-screen flex flex-col fixed left-0 top-0 z-40 shadow-xl font-inter">
      {/* Logo Apotek Sehat */}
      <div className="h-[60px] flex items-center px-5 border-b border-white/5">
        <div className="flex items-center gap-2">
            <ShoppingCart className="text-primary size-[18px]" />
            <span className="font-semibold text-[16px] text-white tracking-tight">Apotek Sehat</span>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 group relative">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative group/avatar cursor-pointer" onClick={handleEditProfile}>
              <img src={avatar} className="size-9 rounded-full border border-white/10 object-cover" alt={userName} />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <Camera size={12} className="text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate leading-none mb-1">{userName}</p>
              <p className="text-[11px] text-sidebar-text font-medium truncate leading-none">{role}</p>
            </div>
          </div>
          <button 
            onClick={handleEditProfile}
            className="text-sidebar-text hover:text-white p-1 rounded-md hover:bg-white/5 transition-all"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-grow px-3 space-y-0.5 overflow-y-auto custom-scrollbar pb-6">
        {menuItems.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive = location.pathname === item.path;
          const isMenuOpen = openMenus[item.id];

          if (hasSubmenu) {
            return (
              <div key={item.id} className="space-y-0.5">
                <button 
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-[6px] transition-all text-[13px] ${isMenuOpen ? 'text-white' : 'text-sidebar-text hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon size={16} />}
                    <span>{item.label}</span>
                  </div>
                  {isMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                
                {isMenuOpen && (
                  <div className="space-y-0.5 animate-in slide-in-from-top-1 duration-200">
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
                <span className="size-2 bg-primary rounded-full"></span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
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
            <div className="relative group cursor-pointer">
              <img src={editForm.avatar} className="size-24 rounded-full border-4 border-page-bg object-cover shadow-md" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
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

          <InputField 
            label="URL Foto Profil" 
            value={editForm.avatar}
            onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
            placeholder="https://..."
            icon={Camera}
          />
        </div>
      </Modal>
    </div>
  );
}
