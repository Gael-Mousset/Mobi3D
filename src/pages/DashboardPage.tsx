import { useNavigate } from 'react-router-dom';
import { ScanLine, Box, Eye, ChevronRight } from 'lucide-react';
import { MOCK_FURNITURE } from '@/data/furniture';
import type { User } from '@/types';

interface Props { user: User; }

export default function DashboardPage({ user }: Props) {
  const navigate = useNavigate();
  const totalValue = MOCK_FURNITURE.reduce((s, f) => s + f.price * f.quantity, 0);
  const companies = [...new Set(MOCK_FURNITURE.map((f) => f.company))].length;

  const stats = [
    { label: 'Meubles scannés', value: MOCK_FURNITURE.length, sub: '+3 ce mois' },
    { label: 'Entreprises', value: companies },
    { label: 'Valeur estimée', value: totalValue.toLocaleString('fr') + ' €' },
    { label: 'Modèles 3D', value: MOCK_FURNITURE.length, sub: '100% traités' },
  ];

  const actions = [
    { path: '/scanner', icon: ScanLine, title: 'Scanner un meuble', desc: 'Créez une fiche 3D en 3 étapes', accent: '#004AAD' },
    { path: '/catalogue', icon: Box, title: 'Catalogue', desc: 'Parcourir les meubles disponibles', accent: '#0891B2' },
    { path: '/viewer', icon: Eye, title: 'Visualiseur 3D', desc: 'Modéliser vos espaces', accent: '#D97706' },
  ];

  return (
    <div className="p-8 max-w-[960px]">
      <h1 className="text-2xl font-extrabold mb-1 text-gray-900">Tableau de bord</h1>
      <p className="text-[13px] text-gray-400 mb-8">Bienvenue, {user.name}</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="card p-6">
            <div className="text-[28px] font-extrabold font-mono text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            {s.sub && <div className="text-[11px] text-brand mt-1 font-medium">{s.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button key={a.path} onClick={() => navigate(a.path)}
              className="card p-7 text-left cursor-pointer border-none group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: a.accent + '12', color: a.accent }}>
                  <Icon size={18} />
                </div>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-brand transition-colors" />
              </div>
              <div className="text-[15px] font-bold text-gray-900">{a.title}</div>
              <div className="text-xs text-gray-400 mt-1">{a.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
