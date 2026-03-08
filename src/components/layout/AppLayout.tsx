import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import type { User } from '@/types';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function AppLayout({ user, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-surface-alt text-gray-900">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="ml-[220px]">
        <Outlet />
      </main>
    </div>
  );
}
