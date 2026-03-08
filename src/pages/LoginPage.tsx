import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, ChevronLeft } from 'lucide-react';
import type { User } from '@/types';

interface Props {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@mobi3d.fr');
  const [password, setPassword] = useState('demo2026');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ email, name: email.split('@')[0], company: 'Entreprise Demo' });
      navigate('/dashboard');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface-alt text-gray-900 flex items-center justify-center">
      <div className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,74,173,0.05),transparent_70%)] pointer-events-none" />
      <div className="relative w-full max-w-[380px] px-5">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 bg-transparent border-none text-gray-400 text-[13px] cursor-pointer mb-8 hover:text-gray-600 transition-colors">
          <ChevronLeft size={14} /> Retour
        </button>
        <div className="p-8 rounded-[20px] bg-white border border-border shadow-xl shadow-brand/5">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white shadow-md shadow-brand/20">
              <Box size={16} />
            </div>
            <span className="text-base font-extrabold">Mobi<span className="text-brand">3D</span></span>
          </div>
          <h2 className="text-[22px] font-extrabold mb-1 text-gray-900">Connexion</h2>
          <p className="text-[13px] text-gray-400 mb-7">Accédez à votre espace de gestion</p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="label-base">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-base" />
            </div>
            <div>
              <label className="label-base">Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-base" />
            </div>
            <button onClick={handleSubmit} disabled={loading} className="btn-brand w-full disabled:opacity-50">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
          <p className="mt-5 text-center text-[11px] text-gray-400">Identifiants pré-remplis pour la démo</p>
        </div>
      </div>
    </div>
  );
}
