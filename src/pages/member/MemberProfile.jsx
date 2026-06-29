import React, { useState } from "react";
import { User, Save } from "lucide-react";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

export default function MemberProfile() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userProfile") || '{"userName": "Member", "email": "member@apoteksehat.com", "phone": "", "address": ""}')
    );
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem("userProfile", JSON.stringify(user));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-border-default shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-yellow-100 p-4 rounded-full">
                        <User className="text-yellow-600 size-12" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{user.userName}</h1>
                        <p className="text-slate-600">{user.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <InputField
                        label="Nama Lengkap"
                        value={user.userName}
                        onChange={(e) => setUser({ ...user, userName: e.target.value })}
                        placeholder="Masukkan nama Anda"
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        value={user.email}
                        disabled
                    />
                    <InputField
                        label="Nomor Telepon"
                        value={user.phone || ""}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        placeholder="+62..."
                    />
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-900">Alamat</label>
                        <textarea
                            value={user.address || ""}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                            placeholder="Masukkan alamat Anda"
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg border border-border-default focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>

                    <Button
                        type="submit"
                        icon={Save}
                        disabled={isSaved}
                    >
                        {isSaved ? "Disimpan!" : "Simpan Perubahan"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
