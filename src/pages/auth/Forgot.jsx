import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import AlertBanner from "../../components/ui/AlertBanner";
import { supabase } from "../../lib/supabaseClient";

export default function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/login",
      });

      if (err) throw err;
      setSuccess("Link reset password telah dikirim! Silakan cek email Anda");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Lupa Password?</h1>
        <p className="text-slate-600">Masukkan email Anda untuk mereset password</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail size={16} className="text-slate-500" />
            Email
          </label>
          <InputField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            type="email"
            required
          />
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
              Kirim Link Reset
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <Link to="/login" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
          ← Kembali ke Halaman Login
        </Link>
      </div>
    </div>
  );
}
