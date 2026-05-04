import React, { useState } from 'react';
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { customersSeed } from "./customersSeed";

export default function Customers() {
    const [customers, setCustomers] = useState(customersSeed);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [form, setForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        loyalty: "Bronze",
    });

    const loyaltyClass = (loyalty) => {
        if (loyalty === "Gold") return "text-yellow-700 bg-yellow-50";
        if (loyalty === "Silver") return "text-gray-700 bg-gray-100";
        return "text-amber-700 bg-amber-50";
    };

    const createNextCustomerId = (currentCustomers) => {
        const maxNumber = currentCustomers.reduce((acc, item) => {
            const match = String(item.customerId).match(/(\d+)$/);
            const n = match ? Number(match[1]) : 0;
            return Math.max(acc, n);
        }, 0);
        return `CUST-${String(maxNumber + 1).padStart(4, "0")}`;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!form.customerName.trim()) return;
        if (!form.email.trim()) return;
        if (!form.phone.trim()) return;

        const next = {
            customerId: createNextCustomerId(customers),
            customerName: form.customerName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            loyalty: form.loyalty,
        };

        setCustomers([next, ...customers]);
        setIsAddOpen(false);
        setForm({ customerName: "", email: "", phone: "", loyalty: "Bronze" });
    };

    return (
        <div id="customers-container" className="pb-10">
            <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
                <button
                    type="button"
                    onClick={() => setIsAddOpen(true)}
                    className="bg-hijau text-white px-4 py-2 rounded-lg font-bold"
                >
                    Add Customer
                </button>
            </PageHeader>
            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-teks">Daftar Customer</h2>
                            <p className="text-sm text-gray-400 font-medium">Total data: {customers.length}</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {customers.map((customer) => (
                                    <tr key={customer.customerId} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-sm">
                                            <Link to={`/customers/${customer.customerId}`} className="text-hijau hover:underline">
                                                {customer.customerId}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                                                    {customer.customerName.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-teks">{customer.customerName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{customer.email}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{customer.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${loyaltyClass(customer.loyalty)}`}>
                                                {customer.loyalty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/customers/${customer.customerId}`} className="text-hijau text-sm font-bold hover:underline">
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setIsAddOpen(false)}
                    />
                    <div className="relative w-full max-w-xl mx-4 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-teks">Add Customer</h3>
                                <p className="text-sm text-gray-400 font-medium">Isi form sesuai atribut JSON Customers</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddOpen(false)}
                                className="px-3 py-2 rounded-xl hover:bg-gray-50 font-bold text-gray-400 hover:text-teks transition-colors"
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-teks">Customer Name</label>
                                    <input
                                        value={form.customerName}
                                        onChange={(e) => setForm((prev) => ({ ...prev, customerName: e.target.value }))}
                                        className="border border-gray-100 p-3 rounded-xl outline-none focus:border-hijau transition-all"
                                        placeholder="Nama customer"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-teks">Loyalty</label>
                                    <select
                                        value={form.loyalty}
                                        onChange={(e) => setForm((prev) => ({ ...prev, loyalty: e.target.value }))}
                                        className="border border-gray-100 p-3 rounded-xl outline-none focus:border-hijau transition-all bg-white"
                                    >
                                        <option value="Bronze">Bronze</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-teks">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                    className="border border-gray-100 p-3 rounded-xl outline-none focus:border-hijau transition-all"
                                    placeholder="nama@mail.com"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-teks">Phone</label>
                                <input
                                    value={form.phone}
                                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                                    className="border border-gray-100 p-3 rounded-xl outline-none focus:border-hijau transition-all"
                                    placeholder="08xx-xxxx-xxxx"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddOpen(false)}
                                    className="px-5 py-3 rounded-xl font-bold text-gray-500 hover:text-teks hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-hijau text-white px-5 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
                                >
                                    Save Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
