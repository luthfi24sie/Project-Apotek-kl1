import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Button from "../../components/ui/Button";

export default function ErrorPage({ errorCode, description, imageUrl }) {
    return (
        <div id="error-page-container" className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="w-full max-w-2xl text-center">
                <div className="bg-white rounded-3xl shadow-xl border border-border p-12 relative overflow-hidden">
                    {/* Abstract background */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mt-16 blur-2xl"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        {imageUrl ? (
                            <div className="bg-bg-page p-8 rounded-2xl mb-8 border border-border">
                                <img 
                                    src={imageUrl} 
                                    alt={`Error ${errorCode}`} 
                                    className="w-48 h-48 object-contain drop-shadow-xl"
                                />
                            </div>
                        ) : (
                            <div className="bg-error/10 p-6 rounded-full text-error mb-8">
                                <AlertCircle size={64} />
                            </div>
                        )}
                        
                        <h1 className="text-8xl font-black text-primary leading-none tracking-tighter mb-4">{errorCode}</h1>
                        <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">Terjadi Kesalahan Sistem</h2>
                        <p className="text-text-secondary font-medium mb-10 max-w-md mx-auto leading-relaxed">
                            {description || "Maaf, halaman yang Anda cari tidak tersedia atau terjadi gangguan pada server."}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/">
                                <Button icon={ArrowLeft} size="lg">Kembali ke Dashboard</Button>
                            </Link>
                            <Button variant="secondary" size="lg" onClick={() => window.location.reload()}>Muat Ulang Halaman</Button>
                        </div>
                    </div>
                </div>
                
                <p className="mt-8 text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">Apotek PharmaOne CRM &copy; 2026</p>
            </div>
        </div>
    );
}
