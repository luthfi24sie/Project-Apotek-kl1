import React from 'react';
import PageHeader from "../../components/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Card from "../../components/ui/Card";
import ProductCard from "../../components/ui/ProductCard";
import Table from "../../components/ui/Table";
import Container from "../../components/ui/Container";
import { Pill, Layout, Database, Activity, ClipboardList } from "lucide-react";

export default function Components() {
    const headers = ["No", "Nama Obat", "Kategori", "Stok", "Harga", "Aksi"];
    const products = [
        { id: 1, name: "Amoxicillin 500mg", category: "Antibiotik", stock: "45 Strip", price: "Rp 12.000" },
        { id: 2, name: "Paracetamol Syrup", category: "Obat Bebas", stock: "12 Botol", price: "Rp 8.500" },
        { id: 3, name: "Vitamin C 1000mg", category: "Suplemen", stock: "28 Botol", price: "Rp 45.000" }
    ];

    return (
        <Container className="space-y-12 !py-0">
            <PageHeader title="Daftar Komponen" breadcrumb={["Admin", "UI Library"]} />

            {/* Layout Components Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <Layout className="text-primary" size={24} />
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">2. Layout Components</h2>
                </div>
                <div className="card p-8 space-y-6">
                    <p className="text-sm text-text-secondary font-medium italic">"Layout Components digunakan untuk menyusun struktur besar halaman CRM Apotek."</p>
                    <div className="p-6 bg-bg-page rounded-2xl border border-border">
                        <h3 className="text-lg font-black text-text-primary mb-2 flex items-center gap-2">
                            <Activity size={18} className="text-primary" />
                            Container & Layouting
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Seluruh halaman ini dibungkus menggunakan komponen <code>Container</code> untuk memastikan margin dan padding yang konsisten di seluruh aplikasi CRM PharmaOne.
                        </p>
                    </div>
                </div>
            </section>

            {/* Data Display Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <Database className="text-primary" size={24} />
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">3. Data Display Components (Pharma Theme)</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Card - Pharmacy Theme */}
                    <div className="space-y-6">
                        <div className="card p-8 space-y-6 h-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-text-primary tracking-tight">Obat Card</h3>
                                <Badge type="success">Katalog Obat</Badge>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <div className="max-w-xs w-full">
                                    <ProductCard 
                                        image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop" 
                                        title="Amoxicillin 500mg" 
                                        category="ANTIBIOTIK" 
                                        price="Rp 12.000" 
                                        description="Antibiotik spektrum luas untuk mengobati berbagai infeksi bakteri pada pasien." 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table - Pharmacy Theme */}
                    <div className="space-y-6">
                        <div className="card p-8 space-y-6 h-full">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-text-primary tracking-tight">Inventory Table</h3>
                                <Button size="sm" variant="secondary" icon={ClipboardList}>Export PDF</Button>
                            </div>
                            <Table headers={headers}>
                                {products.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-bg-page/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-text-secondary">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <Pill size={14} className="text-primary" />
                                                </div>
                                                <span className="text-sm font-black text-text-primary group-hover:text-primary transition-colors">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge type={product.category === "Antibiotik" ? "error" : "info"}>
                                                {product.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-text-secondary">{product.stock}</td>
                                        <td className="px-6 py-4 text-sm font-black text-primary">{product.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm">Detail</Button>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Basic Components Recap */}
            <section className="space-y-6 pb-12">
                <div className="card p-8 space-y-8">
                    <h3 className="text-xl font-black text-text-primary tracking-tight border-b border-border pb-4">Recap: Basic Components (CRM Styles)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <p className="text-xs font-black text-text-secondary uppercase tracking-widest">Buttons</p>
                            <div className="flex flex-wrap gap-3">
                                <Button type="success">Simpan Resep</Button>
                                <Button type="danger">Batal</Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="text-xs font-black text-text-secondary uppercase tracking-widest">Status Badges</p>
                            <div className="flex flex-wrap gap-3">
                                <Badge type="success">Tersedia</Badge>
                                <Badge type="error">Stok Habis</Badge>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="text-xs font-black text-text-secondary uppercase tracking-widest">Avatar Patient</p>
                            <div className="flex flex-wrap gap-3">
                                <Avatar name="Budi" size="md" />
                                <Avatar name="Siti" size="md" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}
