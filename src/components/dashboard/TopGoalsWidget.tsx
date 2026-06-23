import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

interface TopGoalsWidgetProps {
  goals: any[];
}

export default function TopGoalsWidget({ goals }: TopGoalsWidgetProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
          <Target className="w-5 h-5" />
        </div>
        <Link to="/goals" className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors">
          View All
        </Link>
      </div>
      <h4 className="text-lg font-bold text-zinc-900 mb-4">Top Goals</h4>
      
      {goals.length === 0 ? (
        <p className="text-sm text-zinc-500 leading-relaxed mb-6">
          Belum ada target keuangan. Buat tujuan pertama Anda!
        </p>
      ) : (
        <div className="flex flex-col gap-4 mb-6">
          {goals.map((goal) => {
            const progress = goal.target_amount > 0 ? (goal.current_amount / goal.target_amount) * 100 : 0;
            return (
              <div key={goal.id} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-zinc-900 truncate pr-2">{goal.name}</span>
                  <span className="text-xs font-semibold text-zinc-500">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-zinc-900 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      <Link to="/goals" className="block w-full py-3 text-center rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors">
        Kelola Goals
      </Link>
    </div>
  );
}
