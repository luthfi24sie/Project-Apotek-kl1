import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/ui/Badge";
import { membersSeed } from "./membersSeed";

const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
};

export default function MemberDetail() {
    const { id } = useParams();

    const member = membersSeed.find((item) => String(item.memberId) === String(id));

    if (!member) {
        return (
            <div id="member-detail-container" className="space-y-6">
                <PageHeader 
                    title="Detail Member" 
                    subtitle="Member tidak ditemukan"
                    breadcrumb={[
                        { label: "Dashboard", path: "/" },
                        { label: "Member", path: "/members" },
                        { label: "Tidak Ditemukan" }
                    ]}
                />
                <div className="bg-card-bg dark:bg-slate-800 rounded-[8px] shadow-sm border border-border-default dark:border-slate-700 p-10 text-center">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Member tidak ditemukan</h2>
                    <p className="text-text-secondary dark:text-slate-400 font-medium mb-6">ID: {id}</p>
                    <Link to="/members" className="inline-flex bg-primary text-white px-6 py-3 rounded-[6px] font-medium hover:bg-primary-hover transition-colors">
                        Kembali ke Daftar Member
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div id="member-detail-container" className="space-y-6">
            <PageHeader
                title="Detail Member"
                subtitle={`Informasi lengkap member ${member.memberName}`}
                breadcrumb={[
                    { label: "Dashboard", path: "/" },
                    { label: "Member", path: "/members" },
                    { label: member.memberId }
                ]}
            >
                <Link to="/members" className="bg-primary text-white px-4 py-2 rounded-[6px] font-medium hover:bg-primary-hover transition-colors">
                    Kembali
                </Link>
            </PageHeader>

            {/* Profile Section */}
            <div className="bg-card-bg dark:bg-slate-800 rounded-[8px] shadow-sm border border-border-default dark:border-slate-700 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${member.gender === 'Perempuan' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                        {member.memberName.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary dark:text-white">{member.memberName}</h2>
                        <p className="text-sm text-text-secondary dark:text-slate-400 font-medium">{member.memberId}</p>
                        <div className="mt-2">
                            <Badge variant={member.membershipLevel === 'Gold' ? 'warning' : member.membershipLevel === 'Silver' ? 'neutral' : 'info'}>
                                {member.membershipLevel} Member
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Total Poin</p>
                        <p className="text-2xl font-bold text-amber-600">{member.points.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Total Belanja</p>
                        <p className="text-2xl font-bold text-text-primary dark:text-white">{formatRupiah(member.totalSpent)}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Status</p>
                        <p className="text-2xl font-bold">
                            <Badge variant={member.status === 'Aktif' ? 'success' : 'error'}>{member.status}</Badge>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.email}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">No. Telepon</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.phone}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Jenis Kelamin</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.gender}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Tanggal Lahir</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.dateOfBirth || '-'}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Kota</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.city}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Tanggal Gabung</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.joinDate}</p>
                    </div>
                    <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700 md:col-span-2">
                        <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Alamat</p>
                        <p className="text-text-primary dark:text-white font-medium">{member.address || '-'}</p>
                    </div>
                    {member.notes && (
                        <div className="p-4 rounded-[6px] border border-border-default dark:border-slate-700 md:col-span-2">
                            <p className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider mb-1">Catatan</p>
                            <p className="text-text-primary dark:text-white font-medium">{member.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
