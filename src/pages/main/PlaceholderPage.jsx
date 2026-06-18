import React from 'react';
import PageHeader from '../../components/PageHeader';

export default function PlaceholderPage({ title, subtitle }) {
  return (
    <div className="animate-in">
      <PageHeader 
        title={title}
        subtitle={subtitle}
      />
      <div className="bg-white rounded-xl shadow-sm border border-border-default p-12 text-center">
        <div className="size-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🚧</span>
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary">Halaman {title} sedang dalam pengembangan. Fitur akan segera tersedia!</p>
      </div>
    </div>
  );
}
