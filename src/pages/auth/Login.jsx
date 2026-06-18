import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import InputField from "../../components/ui/InputField"
import Button from "../../components/ui/Button"
import AlertBanner from "../../components/ui/AlertBanner"

export default function Login() {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
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

    const handleSimpleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Login SANGAT MUDAH untuk belajar
        if (!dataForm.email.trim() || !dataForm.password.trim()) {
            setError("Email dan password wajib diisi")
            setLoading(false)
            return
        }

        // Bisa login dengan email apapun, minimal password 6 karakter!
        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter")
            setLoading(false)
            return
        }

        // Simpan data user di localStorage
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userEmail", dataForm.email)
        
        // Beri jeda agar terasa seperti login sungguhan
        setTimeout(() => {
            navigate("/")
        }, 800)
        
        setLoading(false)
    }

    const handleQuickLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        
        // Login Cepat - 1 klik langsung masuk!
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userEmail", "admin@apoteksehat.com")
        
        setTimeout(() => {
            navigate("/")
        }, 500)
        
        setLoading(false)
    }

    return (
        <div className="space-y-5">
            {error && (
                <AlertBanner variant="error" onDismiss={() => setError("")}>
                    {error}
                </AlertBanner>
            )}

            {/* TOMBOL LOGIN CEPAT - TANPA KETIK APA-APA! */}
            <Button
                type="button"
                loading={loading}
                className="w-full h-[50px] text-[15px] font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 shadow-lg shadow-green-500/30"
                onClick={handleQuickLogin}
            >
                ⚡ LOGIN CEPAT - 1 KLIK!
            </Button>

            {/* Pemisah */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-white text-slate-500 font-bold uppercase tracking-wider">
                        Atau Login Manual
                    </span>
                </div>
            </div>

            <form onSubmit={handleSimpleLogin} className="space-y-5">
                <InputField
                    label="Email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    placeholder="Masukkan email apapun (contoh: user@apotek.com)"
                    type="email"
                    required
                />

                <div className="space-y-2">
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        placeholder="Masukkan password (min 6 karakter)"
                        required
                    />
                    <div className="text-right">
                        <Link to="/forgot" className="text-[12px] font-bold text-primary hover:underline">
                            Lupa Password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    loading={loading}
                    className="w-full h-[50px] text-[15px] font-bold"
                    variant="primary"
                >
                    🔐 MASUK KE APOTEK SEHAT
                </Button>
            </form>

            <div className="pt-4 text-center">
                <span className="text-text-muted text-[13px]">Belum punya akun? </span>
                <Link to="/register" className="text-primary font-bold hover:underline text-[13px]">
                    Daftar Akun Baru Disini
                </Link>
            </div>
        </div>
    )
}
