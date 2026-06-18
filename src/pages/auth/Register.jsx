import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../../components/ui/InputField"
import Button from "../../components/ui/Button"
import AlertBanner from "../../components/ui/AlertBanner"

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

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        if (!dataForm.email.trim() || !dataForm.password.trim()) {
            setError("Email dan password wajib diisi")
            setLoading(false)
            return
        }

        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter")
            setLoading(false)
            return
        }

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Konfirmasi password tidak sama")
            setLoading(false)
            return
        }

        // Daftar berhasil untuk belajar
        setSuccess("Pendaftaran berhasil! Silakan login dengan email dan password Anda")
        
        setTimeout(() => {
            navigate("/login")
        }, 1500)
        
        setLoading(false)
    }

    return (
        <div className="space-y-5">
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

            <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                    label="Email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    placeholder="Masukkan email (contoh: user@apotek.com)"
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
                    placeholder="Masukkan password lagi"
                    required
                />

                <Button
                    type="submit"
                    loading={loading}
                    className="w-full h-[50px] text-[15px] font-bold"
                    variant="primary"
                >
                    ✅ DAFTAR AKUN BARU
                </Button>
            </form>

            <div className="pt-4 text-center">
                <span className="text-text-muted text-[13px]">Sudah punya akun? </span>
                <Link to="/login" className="text-primary font-bold hover:underline text-[13px]">
                    Masuk ke Akun Disini
                </Link>
            </div>
        </div>
    )
}
