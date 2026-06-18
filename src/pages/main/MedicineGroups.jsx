import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import { Plus, Trash2, Edit, Pill } from "lucide-react";

// Data dummy
const initialMedicineGroups = [
    { id: 1, name: "Obat Generik", count: 45, description: "Obat dengan nama generik yang tidak dipatenkan" },
    { id: 2, name: "Obat Paten", count: 32, description: "Obat dengan hak paten dari produsen" },
    { id: 3, name: "Antibiotik", count: 18, description: "Obat untuk melawan infeksi bakteri" },
    { id: 4, name: "Vitamin & Suplemen", count: 27, description: "Suplemen untuk kesehatan tubuh" },
    { id: 5, name: "Alat Kesehatan", count: 12, description: "Alat-alat medis dan kesehatan" },
];

export default function MedicineGroups() {
    const { darkMode } = useOutletContext();
    const [groups, setGroups] = useState(initialMedicineGroups);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editGroup, setEditGroup] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        count: 0
    });

    const handleOpenAddModal = () => {
        setEditGroup(null);
        setFormData({
            name: "",
            description: "",
            count: 0
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setGroups(groups.filter(g => g.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGroup = {
            ...formData,
            id: editGroup ? editGroup.id : groups.length + 1
        };

        if (editGroup) {
            setGroups(groups.map(g => g.id === editGroup.id ? newGroup : g));
        } else {
            setGroups([...groups, newGroup]);
        }
        
        setIsModalOpen(false);
    };

    return (
        <div className="animate-in space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader 
                    title="Grup Obat" 
                    subtitle="Kelompokkan obat berdasarkan kategori"
                    breadcrumb={[
                        { label: "Dashboard", path: "/" },
                        { label: "Inventory", path: "/medicines" },
                        { label: "Grup Obat" }
                    ]}
                />
                <Button icon={Plus} onClick={handleOpenAddModal}>Tambah Grup</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div key={group.id} className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${darkMode ? "bg-slate-700 text-primary" : "bg-primary-light text-primary"}`}>
                                <Pill size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => {
                                        setEditGroup(group);
                                        setFormData(group);
                                        setIsModalOpen(true);
                                    }}
                                    className={`p-2 rounded-md transition-colors ${darkMode ? "text-slate-400 hover:text-blue-400 hover:bg-slate-700" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"}`}
                                >
                                    <Edit size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(group.id)}
                                    className={`p-2 rounded-md transition-colors ${darkMode ? "text-slate-400 hover:text-red-400 hover:bg-slate-700" : "text-gray-500 hover:text-red-600 hover:bg-red-50"}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-text-primary"}`}>{group.name}</h3>
                        <p className={`text-sm mb-4 ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>{group.description}</p>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>{group.count} Jenis Obat</span>
                            <span className="text-primary font-semibold text-sm">Lihat Detail →</span>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editGroup ? "Edit Grup" : "Tambah Grup Baru"}
                footer={
                    <div className="flex gap-2 justify-end">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                        <Button onClick={handleSubmit}>Simpan</Button>
                    </div>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Nama Grup"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <InputField
                        label="Deskripsi"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                    />
                    <InputField
                        label="Jumlah Obat"
                        type="number"
                        value={formData.count}
                        onChange={(e) => setFormData({...formData, count: Number(e.target.value)})}
                        required
                    />
                </form>
            </Modal>
        </div>
    );
}
