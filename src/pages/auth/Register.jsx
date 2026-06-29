import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight } from "lucide-react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import AlertBanner from "../../components/ui/AlertBanner";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!dataForm.name.trim() || !dataForm.email.trim() || !dataForm.password.trim()) {
      setError("Semua kolom wajib diisi");
      setLoading(false);
      return;
    }

    if (dataForm.password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Konfirmasi password tidak sama");
      setLoading(false);
      return;
    }

    // Bypass register for demo purposes
    setSuccess("Pendaftaran berhasil! Silakan login dengan email dan password Anda");
    setTimeout(() => navigate("/login"), 2000);
    setLoading(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Daftar Akun Baru</h1>
        <p className="text-slate-600">Isi data berikut untuk membuat akun</p>
      </div>

      {error && (
        <AlertBanner variant="error" onDismiss={() => setError("")} className="mb-6">
          {error}
        </AlertBanner>
      )}
      {success && (
        <AlertBanner variant="success" onDismiss={() => setSuccess("")} className="mb-6">
          {success}
        </AlertBanner>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <User size={16} className="text-slate-500" />
            Nama Lengkap
          </label>
          <InputField
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail size={16} className="text-slate-500" />
            Email
          </label>
          <InputField
            name="email"
            type="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Lock size={16} className="text-slate-500" />
            Password
          </label>
          <div className="relative">
            <InputField
              name="password"
              type={showPassword ? "text" : "password"}
              value={dataForm.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Lock size={16} className="text-slate-500" />
            Konfirmasi Password
          </label>
          <div className="relative">
            <InputField
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={dataForm.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full h-[52px] text-[16px] font-semibold mt-2 group"
        >
          {loading ? (
            "Memproses..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              <UserPlus size={18} />
              Daftar Akun
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <p className="text-slate-600 text-sm">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
