import { Check } from 'lucide-react';

interface Props {
  steps: string[];
  current: number;
}

export default function Stepper({ steps, current }: Props) {
  return (
    <div className="flex items-center justify-center py-8">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center min-w-[80px]">
              <div
                className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-[15px] font-bold transition-all duration-300
                  ${done ? 'bg-brand text-white shadow-md shadow-brand/20' : ''}
                  ${active ? 'border-2 border-brand text-brand bg-brand-light' : ''}
                  ${!done && !active ? 'border-2 border-gray-200 text-gray-400 bg-white' : ''}
                `}
              >
                {done ? <Check size={14} strokeWidth={3} /> : isLast && !active && !done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`mt-2 text-xs transition-colors ${
                  active ? 'font-semibold text-gray-900' : done ? 'text-brand font-medium' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`w-20 h-0.5 mx-1 mb-6 transition-colors duration-300 rounded-full ${
                  done ? 'bg-brand' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
