import { useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';

const VALUES = [
  { icon: '💎', title: 'Valorisation', desc: 'Valorisation des stocks de meubles professionnels dormants' },
  { icon: '♻️', title: 'Optimisation', desc: "Optimiser et réutiliser le mobilier d'entreprise existant" },
  { icon: '🏗️', title: 'Visualisation 3D', desc: "Visualiser l'intégration du mobilier grâce à la modélisation 3D des espaces de travail" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative">
      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,74,173,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,74,173,0.03) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />
      <div className="fixed top-[-20%] left-[30%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,74,173,0.06),transparent_70%)] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,74,173,0.04),transparent_70%)] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/20">
            <Box size={18} />
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Mobi<span className="text-brand">3D</span>
          </span>
        </div>
        <button onClick={() => navigate('/login')} className="btn-outline">Se connecter</button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-[900px] mx-auto px-10 pt-24 pb-16 text-center animate-fade-in-up">
        <div className="inline-block px-4 py-1.5 rounded-full mb-6 bg-brand-light border border-brand/20 text-brand text-[11px] font-bold tracking-[1.5px] uppercase">
          Plateforme B2B · Mobilier professionnel
        </div>
        <h1 className="text-[56px] font-black leading-[1.1] tracking-[-2px] text-gray-900">
          Donnez une seconde vie
          <br />
          <span className="text-brand">à votre mobilier d'entreprise</span>
        </h1>
        <p className="mt-6 text-[17px] text-gray-500 leading-relaxed max-w-[600px] mx-auto">
          Scannez, cataloguez et visualisez vos stocks de meubles dormants en 3D.
          Optimisez la réutilisation et valorisez vos actifs mobilier.
        </p>
        <div className="mt-10">
          <button onClick={() => navigate('/login')} className="btn-brand text-base px-10 py-4">
            Commencer maintenant
          </button>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 max-w-[900px] mx-auto px-10 pb-24 grid grid-cols-3 gap-5 animate-fade-in-up-delay">
        {VALUES.map((v, i) => (
          <div key={i} className="card p-7">
            <div className="text-[28px] mb-4">{v.icon}</div>
            <div className="text-[15px] font-bold mb-2 text-gray-900">{v.title}</div>
            <div className="text-[13px] text-gray-500 leading-relaxed">{v.desc}</div>
          </div>
        ))}
      </section>

      <footer className="relative z-10 border-t border-gray-100 px-10 py-6 text-center text-xs text-gray-300">
        © 2026 Mobi3D — MVP Prototype
      </footer>
    </div>
  );
}
