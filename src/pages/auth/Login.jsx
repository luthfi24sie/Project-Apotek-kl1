import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import InputField from "../../components/ui/InputField"
import Button from "../../components/ui/Button"
import AlertBanner from "../../components/ui/AlertBanner"
import { supabase } from "../../lib/supabaseClient"

export default function Login() {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
    const [loadingDemo, setLoadingDemo] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (!dataForm.email.trim() || !dataForm.password.trim()) {
            setError("Email dan password wajib diisi")
            setLoading(false)
            return
        }

        const { data: _data, error: err } = await supabase.auth.signInWithPassword({
            email: dataForm.email,
            password: dataForm.password,
        })

        if (err) {
            setError(err.message || "Terjadi kesalahan saat login")
        } else {
            navigate("/")
        }
        
        setLoading(false)
    }

    const handleDemoLogin = async () => {
        setLoadingDemo(true)
        setError("")
        
        // Akun demo untuk belajar
        const { data: _data, error: err } = await supabase.auth.signInWithPassword({
            email: "demo@apoteksehat.com",
            password: "demo123",
        })

        if (err) {
            setError("Gagal login demo. Silakan gunakan akun demo: demo@apoteksehat.com / demo123")
        } else {
            navigate("/")
        }
        
        setLoadingDemo(false)
    }

    return (
        <div className="space-y-6">
            {error && (
                <AlertBanner variant="error" onDismiss={() => setError("")}>
                    {error}
                </AlertBanner>
            )}

            {/* Tombol Login Demo */}
            <Button
                type="button"
                loading={loadingDemo}
                className="w-full h-[44px] text-[14px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                onClick={handleDemoLogin}
            >
                🚀 LOGIN DEMO (CEPET!)
            </Button>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-default"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-white text-text-muted font-medium">
                        ATAU LOGIN DENGAN AKUN SENDIRI
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    placeholder="Masukkan email (contoh: user@apoteksehat.com)"
                    type="email"
                    required
                />

                <div className="space-y-1">
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        required
                    />
                    <div className="text-right">
                        <Link to="/forgot" className="text-[12px] font-medium text-primary hover:underline">
                            Lupa Password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    loading={loading}
                    className="w-full h-[44px] text-[14px]"
                    variant="primary"
                >
                    MASUK DENGAN AKUN SENDIRI
                </Button>
            </form>

            <div className="text-center">
                <span className="text-text-muted text-[13px]">Belum punya akun? </span>
                <Link to="/register" className="text-primary font-bold hover:underline text-[13px]">
                    Daftar Akun Baru
                </Link>
            </div>
        </div>
    )
}
