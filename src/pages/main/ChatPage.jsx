import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { Send, MessageSquare, Phone } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Budi Santoso', lastMessage: 'Terima kasih atas pelayanannya!', time: '10:30', unread: 2 },
  { id: 2, name: 'Siti Aminah', lastMessage: 'Apakah obat Paracetamol tersedia?', time: '09:15', unread: 1 },
  { id: 3, name: 'Andi Wijaya', lastMessage: 'Saya akan datang sore ini', time: 'Kemarin', unread: 0 },
];

const messages = [
  { id: 1, text: 'Selamat siang! Ada yang bisa saya bantu?', sender: 'admin', time: '10:00' },
  { id: 2, text: 'Selamat siang! Apakah Paracetamol 500mg masih tersedia?', sender: 'user', time: '10:02' },
  { id: 3, text: 'Tentu saja! Paracetamol 500mg masih tersedia 45 biji.', sender: 'admin', time: '10:03' },
  { id: 4, text: 'Baik, saya akan datang sore ini untuk membelinya.', sender: 'user', time: '10:05' },
];

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="animate-in space-y-6">
      <PageHeader 
        title="Chat Pengunjung"
        subtitle="Berkomunikasi dengan pelanggan"
        breadcrumb={[
          { label: 'Dashboard', path: '/' },
          { label: 'Chat' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Contact List */}
        <div className="bg-white rounded-xl shadow-sm border border-border-default overflow-hidden">
          <div className="p-4 border-b border-border-default">
            <h3 className="font-bold text-text-primary">Daftar Kontak</h3>
          </div>
          <div className="divide-y divide-border-default overflow-y-auto h-full">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedContact.id === contact.id ? 'bg-primary-light' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">{contact.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{contact.name}</p>
                      <p className="text-xs text-text-secondary truncate max-w-[150px]">{contact.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">{contact.time}</p>
                    {contact.unread > 0 && (
                      <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded-full mt-1">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-border-default flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border-default flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold">{selectedContact.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-text-primary">{selectedContact.name}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Phone size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white border border-border-default'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-text-secondary'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border-default">
            <div className="flex gap-2">
              <InputField 
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button icon={Send}>Kirim</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
