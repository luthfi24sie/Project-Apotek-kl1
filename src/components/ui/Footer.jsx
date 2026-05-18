import React from 'react';

export default function Footer() { 
  return ( 
    <footer className="bg-[#1C1C1E] text-white py-8 mt-auto border-t border-gray-800"> 
      <div className="container mx-auto px-6"> 
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black tracking-tight mb-2"> 
              Pharma<span className="text-primary">One</span> 
            </h2> 
            <p className="text-gray-400 text-sm font-medium"> 
              Sistem Manajemen Apotek Modern & Terpercaya. 
            </p> 
          </div>

          <div className="flex justify-center gap-8 text-sm font-bold"> 
            <a href="#" className="text-gray-400 hover:text-white transition-colors"> 
              Beranda 
            </a> 
            <a href="#" className="text-gray-400 hover:text-white transition-colors"> 
              Obat 
            </a> 
            <a href="#" className="text-gray-400 hover:text-white transition-colors"> 
              Kontak 
            </a> 
          </div> 
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]"> 
            © 2026 PHARMAONE CRM. ALL RIGHTS RESERVED. 
          </p> 
          <p className="text-gray-500 text-[10px] font-bold">
            Versi 1.0.4 - Pertemuan Component
          </p>
        </div>
      </div> 
    </footer> 
  ); 
}
