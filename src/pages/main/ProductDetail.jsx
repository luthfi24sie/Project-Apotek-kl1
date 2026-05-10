import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function ProductDetail() {
    const { id } = useParams();
    const [productsById, setProductsById] = useState({});
    const [errorsById, setErrorsById] = useState({});

    useEffect(() => {
        let isActive = true;

        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                if (!isActive) return;
                if (response.status !== 200) {
                    setErrorsById((prev) => ({ ...prev, [id]: response.statusText || "Gagal mengambil data produk" }));
                    return;
                }
                setProductsById((prev) => ({ ...prev, [id]: response.data }));
            })
            .catch((err) => {
                if (!isActive) return;
                setErrorsById((prev) => ({ ...prev, [id]: err.message }));
            });

        return () => {
            isActive = false;
        };
    }, [id]);

    const product = productsById[id] || null;
    const error = errorsById[id] || null;

    if (error) {
        return (
            <div id="product-detail-container" className="pb-10">
                <PageHeader title="Medicine Detail" breadcrumb={["Dashboard", "Medicines", "Error"]}>
                    <Link to="/medicines" className="bg-hijau text-white px-4 py-2 rounded-lg font-bold">
                        Back
                    </Link>
                </PageHeader>
                <div className="px-5 mt-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-red-600 font-bold">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div id="product-detail-container" className="pb-10">
                <PageHeader title="Medicine Detail" breadcrumb={["Dashboard", "Medicines", String(id)]}>
                    <Link to="/medicines" className="bg-hijau text-white px-4 py-2 rounded-lg font-bold">
                        Back
                    </Link>
                </PageHeader>
                <div className="px-5 mt-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                        <div className="text-gray-400 font-bold">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="product-detail-container" className="pb-10">
            <PageHeader title="Medicine Detail" breadcrumb={["Dashboard", "Medicines", String(product.id)]}>
                <Link to="/medicines" className="bg-hijau text-white px-4 py-2 rounded-lg font-bold">
                    Back
                </Link>
            </PageHeader>

            <div className="px-5 mt-4">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 max-w-xl mx-auto">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="rounded-2xl mb-4 w-full h-56 object-cover"
                    />
                    <h2 className="text-2xl font-extrabold text-teks mb-2">{product.title}</h2>
                    <p className="text-gray-600 mb-1 font-medium">Kategori: {product.category}</p>
                    <p className="text-gray-600 mb-1 font-medium">Brand: {product.brand}</p>
                    <p className="text-gray-800 font-extrabold text-lg mt-3">
                        Harga: Rp {product.price * 1000}
                    </p>
                </div>
            </div>
        </div>
    );
}
