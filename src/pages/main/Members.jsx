import React, { useState, useMemo } from 'react';
import { UserPlus, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectDropdown from "../../components/ui/SelectDropdown";
import PageHeader from "../../components/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import { membersSeed } from "./membersSeed";

export default function Members() {
    const [members, setMembers] = useState(membersSeed);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [filterMembership, setFilterMembership] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        memberName: "",
        email: "",
        phone: "",
        membershipLevel: "Bronze",
        gender: "Laki-laki",
        city: "Jakarta",
        dateOfBirth: "",
        address: "",
        status: "Aktif"
    });

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    };

    const columns = [
      { header: "ID Member", accessor: "memberId", render: (val) => <span className="font-semibold text-primary">{val}</span> },
      { header: "Nama Member", accessor: "memberName", render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className={`size-8 rounded-full flex items-center justify-center text-[11px] font-semibold ${row.gender === 'Perempuan' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
            {val.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-[13px] font-medium text-text-primary">{val}</p>
            <p className="text-[11px] text-text-secondary">{row.email}</p>
          </div>
        </div>
      )},
      { header: "Level", accessor: "membershipLevel", render: (val) => (
        <Badge variant={val === 'Gold' ? 'warning' : val === 'Silver' ? 'neutral' : 'info'}>
          {val}
        </Badge>
      )},
      { header: "Poin", accessor: "points", render: (val) => (
          <span className="text-[13px] font-medium text-amber-600">{val.toLocaleString()}</span>
      )},
      { header: "Total Belanja", accessor: "totalSpent", render: (val) => (
          <span className="text-[13px] font-medium">{formatRupiah(val)}</span>
      )},
      { header: "Kota", accessor: "city" },
      { header: "Status", accessor: "status", render: (val) => (
          <Badge variant={val === 'Aktif' ? 'success' : 'error'}>{val}</Badge>
      )},
      { header: "Tgl Gabung", accessor: "joinDate", render: (val) => <span className="text-[12px] text-text-secondary">{val}</span> },
      { header: "Aksi", accessor: "actions", render: (_, row) => (
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            icon={Eye} 
            onClick={() => navigate(`/members/${row.memberId}`)}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            icon={Edit} 
            onClick={() => console.log('Edit', row)}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            icon={Trash2} 
            onClick={() => console.log('Delete', row)}
          />
        </div>
      )}
    ];

    const createNextMemberId = (currentMembers) => {
        const maxNumber = currentMembers.reduce((acc, item) => {
            const match = String(item.memberId).match(/(\d+)$/);
            const n = match ? Number(match[1]) : 0;
            return Math.max(acc, n);
        }, 0);
        return `MBR-${(maxNumber + 1).toString().padStart(4, '0')}`;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const next = {
            ...form,
            memberId: createNextMemberId(members),
            joinDate: new Date().toISOString().split('T')[0],
            points: 0,
            totalSpent: 0,
            notes: ""
        };
        setMembers([next, ...members]);
        setIsAddOpen(false);
        setForm({ memberName: "", email: "", phone: "", membershipLevel: "Bronze", gender: "Laki-laki", city: "Jakarta", dateOfBirth: "", address: "", status: "Aktif" });
    };

    const filteredMembers = useMemo(() => {
        return members.filter(m => {
            const matchesQuery = m.memberName.toLowerCase().includes(query.toLowerCase()) || 
                               m.email.toLowerCase().includes(query.toLowerCase()) ||
                               m.memberId.toLowerCase().includes(query.toLowerCase());
            const matchesMembership = filterMembership === "All" || m.membershipLevel === filterMembership;
            const matchesStatus = filterStatus === "All" || m.status === filterStatus;
            
            return matchesQuery && matchesMembership && matchesStatus;
        });
    }, [members, query, filterMembership, filterStatus]);

    return (
        <div id="members-container" className="space-y-6">
            <PageHeader 
                title="Manajemen Member (CRM)" 
                subtitle="Kelola database member, membership level, poin, dan riwayat transaksi Apotek Sehat."
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "CRM", path: "/members" },
                    { label: "Member" }
                ]}
            >
                <div className="flex gap-2">
                    <Button variant="secondary" icon={Download}>Export Excel</Button>
                    <Button icon={UserPlus} onClick={() => setIsAddOpen(true)}>Tambah Member</Button>
                </div>
            </PageHeader>

            {/* Stats Cards for Members */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-100 p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Total Member</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{members.length}</h3>
                </div>
                <div className="bg-white dark:bg-slate-100 p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider">Member Aktif</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{members.filter(m => m.status === 'Aktif').length}</h3>
                </div>
                <div className="bg-white dark:bg-slate-100 p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-yellow-600 uppercase tracking-wider">Gold Member</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{members.filter(m => m.membershipLevel === 'Gold').length}</h3>
                </div>
                <div className="bg-white dark:bg-slate-100 p-4 rounded-[8px] border border-border-default shadow-sm">
                    <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Total Poin</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{members.reduce((sum, m) => sum + m.points, 0).toLocaleString()}</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-100 rounded-[8px] border border-border-default shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-default flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="text-[12px] font-bold text-text-secondary dark:text-slate-400 mb-1 block">Cari Member</label>
                        <SearchInput 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari ID, Nama, atau Email..." 
                            className="w-full"
                        />
                    </div>
                    <div className="w-full md:w-[180px]">
                        <SelectDropdown 
                            label="Level Membership"
                            value={filterMembership}
                            onChange={(e) => setFilterMembership(e.target.value)}
                            options={[
                                { label: "Semua Level", value: "All" },
                                { label: "Gold", value: "Gold" },
                                { label: "Silver", value: "Silver" },
                                { label: "Bronze", value: "Bronze" },
                            ]}
                        />
                    </div>
                    <div className="w-full md:w-[180px]">
                        <SelectDropdown 
                            label="Status"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            options={[
                                { label: "Semua Status", value: "All" },
                                { label: "Aktif", value: "Aktif" },
                                { label: "Tidak Aktif", value: "Tidak Aktif" },
                            ]}
                        />
                    </div>
                </div>
                <DataTable 
                    columns={columns} 
                    data={filteredMembers} 
                />
            </div>

            <Modal 
              isOpen={isAddOpen} 
              onClose={() => setIsAddOpen(false)}
              title="Tambah Member Baru"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Batal</Button>
                  <Button onClick={onSubmit}>Daftarkan Member</Button>
                </>
              }
            >
                <form className="space-y-4">
                    <InputField 
                        label="Nama Lengkap" 
                        value={form.memberName} 
                        onChange={(e) => setForm({...form, memberName: e.target.value})}
                        placeholder="Nama lengkap member"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Email" 
                            type="email"
                            value={form.email} 
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            placeholder="email@contoh.com"
                        />
                        <InputField 
                            label="No. Telepon" 
                            value={form.phone} 
                            onChange={(e) => setForm({...form, phone: e.target.value})}
                            placeholder="0812..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <SelectDropdown 
                            label="Jenis Kelamin" 
                            value={form.gender}
                            onChange={(e) => setForm({...form, gender: e.target.value})}
                            options={[
                                { label: "Laki-laki", value: "Laki-laki" },
                                { label: "Perempuan", value: "Perempuan" },
                            ]}
                        />
                        <SelectDropdown 
                            label="Level Membership" 
                            value={form.membershipLevel}
                            onChange={(e) => setForm({...form, membershipLevel: e.target.value})}
                            options={[
                                { label: "Bronze", value: "Bronze" },
                                { label: "Silver", value: "Silver" },
                                { label: "Gold", value: "Gold" },
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Tanggal Lahir" 
                            type="date"
                            value={form.dateOfBirth} 
                            onChange={(e) => setForm({...form, dateOfBirth: e.target.value})}
                        />
                        <InputField 
                            label="Kota" 
                            value={form.city} 
                            onChange={(e) => setForm({...form, city: e.target.value})}
                            placeholder="Contoh: Jakarta"
                        />
                    </div>
                    <InputField 
                        label="Alamat" 
                        value={form.address} 
                        onChange={(e) => setForm({...form, address: e.target.value})}
                        placeholder="Alamat lengkap"
                    />
                    <SelectDropdown 
                        label="Status Awal" 
                        value={form.status}
                        onChange={(e) => setForm({...form, status: e.target.value})}
                        options={[
                            { label: "Aktif", value: "Aktif" },
                            { label: "Tidak Aktif", value: "Tidak Aktif" },
                        ]}
                    />
                </form>
            </Modal>
        </div>
    );
}
