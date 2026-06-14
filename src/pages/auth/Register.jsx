import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import InputField from "../../components/ui/InputField"
import Button from "../../components/ui/Button"
import AlertBanner from "../../components/ui/AlertBanner"
import { supabase } from "../../lib/supabaseClient"

export default function Register() {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
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
        setSuccess("")

        if (!dataForm.email.trim() || !dataForm.password.trim()) {
            setError("Email dan password wajib diisi")
            setLoading(false)
            return
        }

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan konfirmasi password tidak sesuai")
            setLoading(false)
            return
        }

        if (dataForm.password.length < 6) {
            setError("Password harus minimal 6 karakter")
            setLoading(false)
            return
        }

        const { data, error: err } = await supabase.auth.signUp({
            email: dataForm.email,
            password: dataForm.password,
        })

        if (err) {
            setError(err.message || "Terjadi kesalahan saat pendaftaran")
        } else {
            setSuccess("Pendaftaran berhasil! Silakan login dengan akun baru Anda.")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
        
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <AlertBanner variant="error" onDismiss={() => setError("")}>
                    {error}
                </AlertBanner>
            )}
            {success && (
                <AlertBanner variant="success" onDismiss={() => setSuccess("")}>
                    {success}
                </AlertBanner>
            )}

            <InputField
                label="Email"
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                placeholder="Masukkan email Anda"
                type="email"
                required
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                placeholder="Masukkan password (min 6 karakter)"
                required
            />

            <InputField
                label="Konfirmasi Password"
                type="password"
                name="confirmPassword"
                value={dataForm.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan password kembali"
                required
            />

            <Button
                type="submit"
                loading={loading}
                className="w-full h-[40px] text-[14px]"
                variant="primary"
            >
                DAFTAR
            </Button>
            
            <div className="text-center mt-4">
                <span className="text-text-muted text-[13px]">Sudah punya akun? </span>
                <Link to="/login" className="text-primary font-medium hover:underline text-[13px]">
                    Masuk disini
                </Link>
            </div>
        </form>
    )
}
