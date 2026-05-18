import { useState } from "react"
import axios from "axios"
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (!dataForm.email.trim() || !dataForm.password.trim()) {
            setError("Username dan password wajib diisi")
            setLoading(false)
            return
        }

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data?.message || "Terjadi kesalahan")
                    return 
                }
                navigate("/")
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data?.message || "Terjadi kesalahan")
                } else {
                    setError(err.message || "Kesalahan tidak diketahui")
                }
            })
            .finally(() => {
                setLoading(false) 
            })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <AlertBanner variant="error" onDismiss={() => setError("")}>
                    {error}
                </AlertBanner>
            )}

            <InputField
                label="Username"
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                placeholder="Masukkan username (contoh: emilys)"
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
                className="w-full h-[40px] text-[14px]"
                variant="primary"
            >
                MASUK
            </Button>
        </form>
    )
}
