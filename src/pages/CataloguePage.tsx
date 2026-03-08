import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Box } from 'lucide-react';
import { MOCK_FURNITURE } from '@/data/furniture';
import StateBadge from '@/components/ui/StateBadge';

export default function CataloguePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', ...new Set(MOCK_FURNITURE.map((f) => f.category))];
  const filtered = filter === 'Tous' ? MOCK_FURNITURE : MOCK_FURNITURE.filter((f) => f.category === filter);

  return (
    <div className="p-8 max-w-[1100px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold mb-1 text-gray-900">Catalogue</h1>
          <p className="text-[13px] text-gray-400">{filtered.length} meuble{filtered.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => navigate('/scanner')} className="btn-brand flex items-center gap-2">
          <Plus size={16} /> Scanner un meuble
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
              filter === c
                ? 'bg-brand-light text-brand border-brand/20'
                : 'bg-white text-gray-500 border-border hover:border-brand/30 hover:text-brand'
            }`}
          >{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {filtered.map((item) => (
          <div key={item.id} onClick={() => navigate('/viewer', { state: { furniture: item } })}
            className="card overflow-hidden cursor-pointer group"
          >
            <div className="h-[140px] flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400" style={{ background: item.color + '20' }}>
                <Box size={18} />
              </div>
              <div className="absolute top-3 right-3"><StateBadge stateKey={item.state} /></div>
            </div>
            <div className="p-4">
              <div className="text-[11px] text-brand font-semibold uppercase tracking-wider mb-1">{item.category}</div>
              <div className="text-sm font-bold text-gray-900 mb-2">{item.name}</div>
              <div className="text-xs text-gray-400 mb-1">{item.company}</div>
              <div className="text-[11px] text-gray-400">{item.dimensions.w} × {item.dimensions.h} × {item.dimensions.d} cm · {item.brand}</div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-lg font-extrabold text-brand font-mono">{item.price} €</span>
                <span className="text-[11px] text-gray-400">{item.quantity} dispo.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
