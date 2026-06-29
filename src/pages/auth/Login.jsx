import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import AlertBanner from "../../components/ui/AlertBanner";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!dataForm.email.trim() || !dataForm.password.trim()) {
      setError("Email dan password wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email: dataForm.email,
        password: dataForm.password,
      });

      if (authError) throw authError;

      if (user) {
        const userRole = user.user_metadata?.role || "Member";
        const userName = user.user_metadata?.name || user.email?.split("@")[0] || "User";

        const userProfile = {
          userName,
          role: userRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
        };

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        if (userRole === "Super Admin") {
          navigate("/dashboard");
        } else {
          navigate("/member/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Masuk ke Akun</h1>
        <p className="text-slate-600">Masukkan email dan password Anda untuk melanjutkan</p>
      </div>

      {error && (
        <AlertBanner variant="error" onDismiss={() => setError("")} className="mb-6">
          {error}
        </AlertBanner>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail size={16} className="text-slate-500" />
            Email
          </label>
          <InputField
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            type="email"
            required
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Lock size={16} className="text-slate-500" />
              Password
            </label>
            <Link
              to="/forgot"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Lupa Password?
            </Link>
          </div>
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

        <Button
          type="submit"
          loading={loading}
          className="w-full h-[52px] text-[16px] font-semibold group"
        >
          {loading ? (
            "Memproses..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Masuk ke Sistem
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <p className="text-slate-600 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
            Daftar Sekarang
          </Link>
        </p>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-xs text-yellow-700 font-medium mb-1">Admin Demo:</p>
        <p className="text-xs text-yellow-600 font-mono">
          Email: admin@apoteksehat.com | Pass: admin123
        </p>
      </div>
    </div>
  );
}
