import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCw, Search, Target, Package, Upload, Download } from 'lucide-react';
import Stepper from '@/components/ui/Stepper';
import StateBadge from '@/components/ui/StateBadge';
import Scene3D from '@/components/three/Scene3D';
import { CATEGORIES, STATES } from '@/data/furniture';
import type { ScannerMeta, Furniture } from '@/types';

interface Props { user: { name: string; company: string; email: string }; }

export default function ScannerPage({ user }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [meta, setMeta] = useState<ScannerMeta>({
    category: 'Chaise de bureau', brand: 'Steelcase',
    w: '62', h: '118', d: '58', qty: '6',
    material: 'Noir / tissu mesh', state: 'A', notes: '',
  });
  const [progress, setProgress] = useState({ keys: 0, align: 0, mesh: 0, tex: 0 });
  const stepLabels = ['Photos', 'Métadonnées', 'Traitement 3D', 'Fiche prête'];

  const startProcessing = () => {
    setStep(2);
    const stages: (keyof typeof progress)[] = ['keys', 'align', 'mesh', 'tex'];
    let i = 0;
    const run = () => {
      if (i >= stages.length) { setTimeout(() => setStep(3), 500); return; }
      const s = stages[i]; let p = 0;
      const iv = setInterval(() => {
        p += Math.random() * 15 + 5;
        if (p >= 100) { p = 100; clearInterval(iv); i++; setTimeout(run, 300); }
        setProgress((prev) => ({ ...prev, [s]: Math.min(100, Math.round(p)) }));
      }, 120);
    };
    run();
  };

  const result: Furniture = {
    id: 'new', name: `${meta.category.includes('Chaise') ? 'Chaise' : meta.category} ${meta.brand}`,
    category: meta.category, brand: meta.brand,
    dimensions: { w: Number(meta.w) || 62, h: Number(meta.h) || 118, d: Number(meta.d) || 58 },
    state: meta.state, company: user.company, material: meta.material,
    quantity: Number(meta.qty) || 1, assetId: `RF-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`,
    price: 340, priceMin: 280, priceMax: 420, priceRef: 1200, salesCount: 47, polygons: 47412, color: '#004AAD',
  };

  return (
    <div className="p-6 px-10 max-w-[880px] mx-auto">
      <h1 className="text-[28px] font-black mb-1 text-gray-900">Scanner un meuble</h1>
      <p className="text-sm text-gray-400">Créez une fiche 3D complète en 3 étapes — moins de 5 minutes</p>
      <Stepper steps={stepLabels} current={step} />

      {/* STEP 0: Photos */}
      {step === 0 && (
        <div>
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white text-center py-16 px-10 mb-6">
            <div className="mb-4 opacity-30 flex justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Déposez vos photos ici</h3>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Prenez 20–40 photos en tournant autour du meuble<br />Format JPG, PNG · Max 10 Mo par photo
            </p>
            <button className="btn-brand mt-5 uppercase tracking-wider text-[13px]">Sélectionner des photos</button>
          </div>
          <div className="flex gap-2.5 flex-wrap mb-8">
            {[200, 220, 180, 210, 240, 195, 215, 230].map((l, i) => (
              <div key={i} className="w-[100px] h-[100px] rounded-xl border border-gray-200 flex items-center justify-center" style={{ background: `hsl(215, 20%, ${l / 3}%)` }}>
                <span className="text-[28px] opacity-30">🪑</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={() => setStep(1)} className="btn-brand flex items-center gap-2">Continuer <ChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {/* STEP 1: Metadata */}
      {step === 1 && (
        <div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div><label className="label-base">Catégorie *</label><select value={meta.category} onChange={(e) => setMeta({...meta, category: e.target.value as any})} className="input-base">{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="label-base">Marque</label><input value={meta.brand} onChange={(e) => setMeta({...meta, brand: e.target.value})} className="input-base" /></div>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div><label className="label-base">Largeur (cm)</label><input type="number" value={meta.w} onChange={(e) => setMeta({...meta, w: e.target.value})} className="input-base" /></div>
            <div><label className="label-base">Hauteur (cm)</label><input type="number" value={meta.h} onChange={(e) => setMeta({...meta, h: e.target.value})} className="input-base" /></div>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div><label className="label-base">Profondeur (cm)</label><input type="number" value={meta.d} onChange={(e) => setMeta({...meta, d: e.target.value})} className="input-base" /></div>
            <div><label className="label-base">Quantité disponible</label><input type="number" value={meta.qty} onChange={(e) => setMeta({...meta, qty: e.target.value})} className="input-base" /></div>
          </div>
          <div className="mb-5"><label className="label-base">Couleur / Matière</label><input value={meta.material} onChange={(e) => setMeta({...meta, material: e.target.value})} className="input-base" /></div>

          <div className="mb-7">
            <label className="label-base">État du mobilier</label>
            <div className="grid grid-cols-3 gap-3">
              {STATES.map((s) => {
                const active = meta.state === s.key;
                return (
                  <button key={s.key} onClick={() => setMeta({...meta, state: s.key})}
                    className={`py-4 px-3 rounded-xl text-center text-[13px] font-semibold cursor-pointer transition-all ${
                      active ? 'bg-brand-light border-2 border-brand/30 text-brand' : 'bg-surface-alt border border-border text-gray-400'
                    }`}
                  >
                    <div className="mb-1">{'⭐'.repeat(s.stars)}</div>{s.key} — {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-7"><label className="label-base">Notes / Observations</label><textarea value={meta.notes} onChange={(e) => setMeta({...meta, notes: e.target.value})} rows={3} className="input-base resize-y" placeholder="Légères traces d'usure sur l'assise..." /></div>

          <div className="flex justify-between">
            <button onClick={() => setStep(0)} className="btn-outline flex items-center gap-1"><ChevronLeft size={14} /> Retour</button>
            <button onClick={startProcessing} className="btn-brand flex items-center gap-2">Lancer le traitement 3D <ChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {/* STEP 2: Processing */}
      {step === 2 && (
        <div className="card p-10 text-center">
          <div className="w-[100px] h-[100px] mx-auto mb-6 relative">
            <svg width="100" height="100" viewBox="0 0 100 100" className="animate-[spin_2s_linear_infinite]">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="3" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#004AAD" strokeWidth="3" strokeDasharray="80 200" strokeLinecap="round" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="#0891B2" strokeWidth="3" strokeDasharray="60 200" strokeLinecap="round" className="animate-[spin_1.5s_linear_infinite_reverse]" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">🪑</div>
          </div>
          <h3 className="text-[22px] font-extrabold mb-2 text-gray-900">
            {progress.tex >= 100 ? 'Finalisation...' : progress.mesh > 0 ? 'Application des textures UV...' : progress.align > 0 ? 'Génération du maillage...' : 'Détection des points clés...'}
          </h3>
          <p className="text-[13px] text-gray-400 mb-8">Projection des couleurs</p>
          <div className="max-w-[600px] mx-auto text-left">
            {[
              { label: 'Détection des points clés', val: progress.keys, color: '#004AAD' },
              { label: 'Alignement des images', val: progress.align, color: '#059669' },
              { label: 'Génération du maillage', val: progress.mesh, color: '#D97706' },
              { label: 'Application des textures', val: progress.tex, color: '#9333EA' },
            ].map((bar, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={bar.val > 0 ? 'text-gray-600' : 'text-gray-400'}>{bar.label}</span>
                  <span className="font-mono text-gray-500">{bar.val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${bar.val}%`, background: bar.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Fiche prête */}
      {step === 3 && (
        <div className="grid grid-cols-2 gap-6">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="text-sm font-bold text-gray-900">Modèle 3D — {result.name}</span>
              <div className="flex gap-1.5">
                {[RotateCw, Search, Target, Package].map((Icon, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${i === 0 ? 'bg-brand text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[360px] bg-[#f0f2f5]"><Scene3D furniture={result} /></div>
            <div className="flex justify-between px-5 py-2.5 border-t border-border text-[11px] text-gray-400">
              <span>🖱 Glisser pour pivoter · ⚙ Molette pour zoomer</span>
              <span className="text-brand font-medium">✓ {result.polygons.toLocaleString('fr')} polygones</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="card p-6">
              <h4 className="label-base mb-5">Fiche produit</h4>
              {[
                ['Catégorie', result.category],
                ['Marque', result.brand],
                ['Dimensions', `${result.dimensions.w} × ${result.dimensions.d} × ${result.dimensions.h} cm`],
                ['Matière', result.material],
                ['État', null],
                ['Quantité', `${result.quantity} unités`],
                ['ID actif', result.assetId],
              ].map(([label, val], i) => (
                <div key={i} className={`flex justify-between items-center py-2.5 ${i < 6 ? 'border-b border-border' : ''}`}>
                  <span className="text-[13px] text-gray-400">{label}</span>
                  {label === 'État' ? <StateBadge stateKey={result.state} /> : <span className={`text-sm font-semibold text-gray-900 ${val === result.assetId ? 'font-mono' : ''}`}>{val}</span>}
                </div>
              ))}
            </div>

            <div className="card p-6 text-center">
              <h4 className="label-base mb-4">Prix suggéré IA</h4>
              <div className="text-[52px] font-black text-brand font-mono leading-none">{result.price} <span className="text-[32px]">€</span></div>
              <div className="text-xs text-gray-400 mt-2">prix unitaire recommandé</div>
              <div className="text-[13px] text-gray-500 mt-2">Min {result.priceMin} € — Max {result.priceMax} €</div>
              <div className="text-[11px] text-gray-400 mt-3">Basé sur {result.salesCount} ventes récentes · Neuf à ~{result.priceRef.toLocaleString('fr')} €</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate('/catalogue')} className="btn-brand flex items-center justify-center gap-2"><Upload size={16} /> Publier</button>
              <button className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-brand text-brand text-sm font-bold cursor-pointer bg-white hover:bg-brand-light transition-colors">
                <Download size={16} /> GLB
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
