import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../../components/ui/InputField"
import Button from "../../components/ui/Button"
import AlertBanner from "../../components/ui/AlertBanner"
import { supabase } from "../../lib/supabaseClient"

export default function Forgot() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        if (!email.trim()) {
            setError("Email wajib diisi")
            setLoading(false)
            return
        }

        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/login"
        })

        if (err) {
            setError(err.message || "Terjadi kesalahan saat mengirim email reset password")
        } else {
            setSuccess("Link reset password telah dikirim ke email Anda! Silakan cek kotak masuk atau spam.")
            setTimeout(() => {
                navigate("/login")
            }, 3000)
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                type="email"
                required
            />

            <Button
                type="submit"
                loading={loading}
                className="w-full h-[40px] text-[14px]"
                variant="primary"
            >
                KIRIM LINK RESET
            </Button>

            <div className="text-center">
                <Link to="/login" className="text-[13px] font-medium text-primary hover:underline">
                    Kembali ke Login
                </Link>
            </div>
        </form>
    )
}
