import React, { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/ui/DataTable";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import { Plus, ArrowRight } from "lucide-react";
import medicinesData from "./medicines.json";

export default function Medicines() {
    const { darkMode } = useOutletContext();
    const [query, setQuery] = useState("");
    const [medicines, setMedicines] = useState(medicinesData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMedicine, setEditMedicine] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        description: "",
        image: "https://source.unsplash.com/640x420/?pills,medicine&sig=new"
    });

    const fallbackImageUrl = (item) => {
        const text = encodeURIComponent(item?.name || item?.code || "Medicine");
        return `https://dummyjson.com/image/80x80?text=${text}`;
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return medicines;
        return medicines.filter((item) => {
            const haystack = `${item.name} ${item.code} ${item.category} ${item.brand}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [query, medicines]);

    const handleOpenAddModal = () => {
        setEditMedicine(null);
        setFormData({
            name: "",
            code: `MED-${String(medicines.length + 1).padStart(4, "0")}`,
            category: "Tablet",
            brand: "",
            price: "",
            stock: "",
            description: "",
            image: "https://source.unsplash.com/640x420/?pills,medicine&sig=new"
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMedicine = {
            ...formData,
            id: editMedicine ? editMedicine.id : medicines.length + 1,
            price: Number(formData.price),
            stock: Number(formData.stock)
        };

        if (editMedicine) {
            setMedicines(medicines.map(m => m.id === editMedicine.id ? newMedicine : m));
        } else {
            setMedicines([...medicines, newMedicine]);
        }
        
        setIsModalOpen(false);
    };

    const columns = [
        { 
            header: "Medicine Name", 
            accessor: "name", 
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.image}
                        alt={val}
                        className="w-10 h-10 rounded-md object-cover border border-border-default"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImageUrl(row);
                        }}
                    />
                    <Link to={`/medicines/${row.id}`} className="text-primary font-semibold hover:underline">
                        {val}
                    </Link>
                </div>
            )
        },
        { header: "Medicine ID", accessor: "code" },
        { header: "Medicine Group", accessor: "category" },
        { header: "Stock in Qty", accessor: "stock" },
        { 
            header: "Action", 
            accessor: "id",
            render: (val) => (
                <Link to={`/medicines/${val}`} className="p-2 text-primary hover:bg-primary-light rounded-md transition-colors inline-flex">
                    <ArrowRight size={16} />
                </Link>
            )
        },
    ];

    return (
        <div id="medicines-container" className="space-y-6 animate-in">
            <div className="flex items-center justify-between">
                <PageHeader 
                    title="List of Medicines" 
                    subtitle="List of medicines available for sales"
                    breadcrumb={[
                        { label: "Inventory", path: "/" },
                        { label: "List of Medicines" }
                    ]}
                />
                <Button icon={Plus} onClick={handleOpenAddModal}>Add New Medicine</Button>
            </div>

            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}>
                <div className="p-6 border-b border-border-default dark:border-slate-700 flex items-center gap-4 flex-wrap">
                    <SearchInput 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for medicine name"
                        className="max-w-sm"
                    />
                    <select className={`border rounded-md px-4 py-2 text-sm ${darkMode ? "bg-slate-800 border-slate-600 text-white" : "border-border-default"}`}>
                        <option>Select Group</option>
                    </select>
                </div>
                <DataTable 
                    columns={columns} 
                    data={filtered}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editMedicine ? "Edit Medicine" : "Add New Medicine"}
                footer={
                    <div className="flex gap-2 justify-end">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                        <Button onClick={handleSubmit}>Simpan</Button>
                    </div>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Nama Obat"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <InputField
                        label="Kode Obat"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                        required
                    />
                    <InputField
                        label="Kategori"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                    />
                    <InputField
                        label="Brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        required
                    />
                    <InputField
                        label="Harga"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                    />
                    <InputField
                        label="Stok"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        required
                    />
                    <InputField
                        label="Deskripsi"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                    />
                </form>
            </Modal>
        </div>
    );
}
