import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/ui/Button';
import { Bell, Moon, Sun, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useOutletContext();
  
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    autoLogout: 30,
  });

  return (
    <div className="animate-in space-y-6">
      <PageHeader 
        title="Pengaturan Aplikasi"
        subtitle="Pengaturan preferensi pengguna"
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Pengaturan' },
        ]}
      />

      <div className={`rounded-xl shadow-sm border p-6 max-w-3xl space-y-6 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <Bell size={20} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-text-primary"}`}>Notifikasi Push</p>
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>Terima pemberitahuan penting</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications}
              onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full dark:bg-yellow-900">
              {darkMode ? <Moon size={20} className="text-yellow-600 dark:text-yellow-300" /> : <Sun size={20} className="text-yellow-600 dark:text-yellow-300" />}
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-text-primary"}`}>Mode Gelap</p>
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>Ubah tampilan menjadi gelap</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
              <Lock size={20} className="text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-text-primary"}`}>Logout Otomatis</p>
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>Menit sebelum logout otomatis</p>
            </div>
          </div>
          <select 
            value={settings.autoLogout}
            onChange={(e) => setSettings({...settings, autoLogout: e.target.value})}
            className={`border rounded-lg px-3 py-2 text-sm ${darkMode ? "bg-slate-800 border-slate-600 text-white" : "border-border-default"}`}
          >
            <option value={15}>15 Menit</option>
            <option value={30}>30 Menit</option>
            <option value={60}>1 Jam</option>
            <option value={0}>Nonaktif</option>
          </select>
        </div>

        <div className="pt-4">
          <Button>Simpan Pengaturan</Button>
        </div>
      </div>
    </div>
  );
}
