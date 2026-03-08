import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Box, ScanLine, Eye, LogOut } from 'lucide-react';
import type { User } from '@/types';

interface Props {
  user: User;
  onLogout: () => void;
}

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { path: '/catalogue', icon: Box, label: 'Catalogue' },
  { path: '/scanner', icon: ScanLine, label: 'Scanner' },
  { path: '/viewer', icon: Eye, label: 'Visualiseur 3D' },
];

export default function Sidebar({ user, onLogout }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-white border-r border-border flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white shadow-md shadow-brand/20">
          <Box size={16} />
        </div>
        <span className="text-base font-extrabold tracking-tight text-gray-900">
          Mobi<span className="text-brand">3D</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] transition-all cursor-pointer border-none
                ${active
                  ? 'bg-brand-light text-brand font-semibold'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }
              `}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border">
        <div className="px-3 py-2 mb-2">
          <p className="text-xs font-semibold text-gray-900 truncate">{user.name}</p>
          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg bg-transparent border-none text-gray-400 text-xs cursor-pointer transition-colors hover:text-red-500 hover:bg-red-50"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
