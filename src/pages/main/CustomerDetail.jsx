import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { customersSeed } from "./customersSeed";

export default function CustomerDetail() {
    const { id } = useParams();

    const customer = customersSeed.find((item) => String(item.customerId) === String(id));

    if (!customer) {
        return (
            <div id="customer-detail-container" className="pb-10">
                <PageHeader title="Customer Detail" breadcrumb={["Dashboard", "Customers", "Not Found"]} />
                <div className="px-5 mt-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
                        <h2 className="text-2xl font-extrabold text-teks mb-2">Customer tidak ditemukan</h2>
                        <p className="text-gray-400 font-medium mb-6">ID: {id}</p>
                        <Link to="/customers" className="inline-flex bg-hijau text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                            Kembali ke Customers
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="customer-detail-container" className="pb-10">
            <PageHeader
                title="Customer Detail"
                breadcrumb={["Dashboard", "Customers", customer.customerId]}
            >
                <Link to="/customers" className="bg-hijau text-white px-4 py-2 rounded-lg font-bold">
                    Back
                </Link>
            </PageHeader>

            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-hijau/10 text-hijau flex items-center justify-center font-extrabold text-xl">
                            {customer.customerName.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-teks">{customer.customerName}</h2>
                            <p className="text-sm text-gray-400 font-medium">{customer.customerId}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                            <p className="text-teks font-bold">{customer.email}</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                            <p className="text-teks font-bold">{customer.phone}</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-gray-100 md:col-span-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Loyalty</p>
                            <p className="text-teks font-bold">{customer.loyalty}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
