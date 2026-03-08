import { STATES } from '@/data/furniture';
import type { FurnitureState } from '@/types';

interface Props {
  stateKey: FurnitureState;
  size?: 'sm' | 'md';
}

export default function StateBadge({ stateKey, size = 'sm' }: Props) {
  const info = STATES.find((s) => s.key === stateKey) ?? STATES[0];

  const colorClasses: Record<FurnitureState, string> = {
    A: 'bg-brand-light text-brand border-brand/20',
    B: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    C: 'bg-amber-50 text-amber-600 border-amber-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold ${colorClasses[stateKey]} ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      }`}
    >
      {'★'.repeat(info.stars)} {info.label}
    </span>
  );
}
