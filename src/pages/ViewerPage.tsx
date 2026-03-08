import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from 'lucide-react';
import Scene3D from '@/components/three/Scene3D';
import StateBadge from '@/components/ui/StateBadge';
import { MOCK_FURNITURE } from '@/data/furniture';
import type { Furniture } from '@/types';

export default function ViewerPage() {
  const location = useLocation();
  const initialFurniture = (location.state as any)?.furniture as Furniture | undefined;
  const [selected, setSelected] = useState<Furniture | null>(initialFurniture ?? null);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white">
        <div>
          <h1 className="text-lg font-extrabold mb-0.5 text-gray-900">Visualiseur 3D</h1>
          <p className="text-xs text-gray-400">Modélisez l'intégration du mobilier dans un espace de travail</p>
        </div>
        <div className="text-[11px] text-gray-400 px-3.5 py-2 rounded-lg bg-surface-alt border border-border">
          Clic + glisser · Molette pour zoomer
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative bg-[#f0f2f5]">
          <Scene3D furniture={selected} />
          {!selected && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="w-[60px] h-[60px] rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Box size={20} />
                </div>
                <p className="text-sm text-gray-500">Sélectionnez un meuble</p>
                <p className="text-xs text-gray-400 mt-1">pour le visualiser dans l'espace 3D</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-[280px] border-l border-border bg-white overflow-y-auto">
          <div className="px-4 py-3.5 border-b border-border">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mobilier disponible</span>
          </div>
          <div className="p-2.5">
            {MOCK_FURNITURE.map((item) => {
              const active = selected?.id === item.id;
              return (
                <button key={item.id} onClick={() => setSelected(active ? null : item)}
                  className={`w-full text-left p-3 rounded-xl mb-1 transition-all cursor-pointer border ${
                    active ? 'bg-brand-light border-brand/20 shadow-sm' : 'bg-transparent border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex gap-2.5 items-start">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: item.color + '15' }}>
                      <div className="w-2.5 h-2.5 rounded" style={{ background: item.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate text-gray-900">{item.name}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{item.category}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[13px] font-bold text-brand font-mono">{item.price} €</span>
                        <StateBadge stateKey={item.state} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
