import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../../components/ui/InputField"
import Button from "../../components/ui/Button"
import AlertBanner from "../../components/ui/AlertBanner"

export default function Forgot() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        if (!email.trim()) {
            setError("Email wajib diisi")
            setLoading(false)
            return
        }

        // Reset password sederhana untuk belajar
        setSuccess("Link reset password telah dikirim! (Untuk demo, silakan login dengan password baru apapun)")
        
        setTimeout(() => {
            navigate("/login")
        }, 2000)
        
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda"
                    type="email"
                    required
                />

                <Button
                    type="submit"
                    loading={loading}
                    className="w-full h-[50px] text-[15px] font-bold"
                    variant="primary"
                >
                    📧 KIRIM LINK RESET PASSWORD
                </Button>
            </form>

            <div className="pt-4 text-center">
                <Link to="/login" className="text-primary font-bold hover:underline text-[13px]">
                    🔙 Kembali ke Halaman Login
                </Link>
            </div>
        </div>
    )
}
