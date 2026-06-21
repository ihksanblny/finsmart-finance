import React from 'react';
import DashboardNav from '../components/DashboardNav';
import { motion } from 'framer-motion';
import { useGoals, COMMON_ICONS } from '../hooks/useGoals';
import { Target, Laptop, Car, Plane, Home, Heart, GraduationCap, Building, Gamepad2, Bike, Goal as GoalIcon } from 'lucide-react';

const renderIcon = (iconName: string | null, className: string = "w-6 h-6") => {
  switch (iconName) {
    case 'target': return <Target className={className} />;
    case 'laptop': return <Laptop className={className} />;
    case 'car': return <Car className={className} />;
    case 'plane': return <Plane className={className} />;
    case 'home': return <Home className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'graduation-cap': return <GraduationCap className={className} />;
    case 'building': return <Building className={className} />;
    case 'gamepad-2': return <Gamepad2 className={className} />;
    case 'bike': return <Bike className={className} />;
    default: return <GoalIcon className={className} />;
  }
};

export default function Goals() {
  const {
    goals,
    loading,
    isFormOpen,
    setIsFormOpen,
    newGoalName,
    setNewGoalName,
    newGoalTarget,
    setNewGoalTarget,
    newGoalIcon,
    setNewGoalIcon,
    fundingGoal,
    setFundingGoal,
    fundAmount,
    setFundAmount,
    handleCreateGoal,
    handleAddFund,
    handleDeleteGoal
  } = useGoals();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 flex">
      <DashboardNav />

      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0 relative">
        <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12 w-full pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter">Financial Goals</h1>
              <p className="text-sm font-bold text-zinc-500 mt-4 leading-relaxed">
                Set targets, allocate funds, and watch your dreams materialize. Gamify your savings journey.
              </p>
            </div>
            {!isFormOpen && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-zinc-800 transition-all shadow-md shrink-0"
              >
                + New Goal
              </button>
            )}
          </div>

          {/* Create Goal Form */}
          {isFormOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-zinc-200 p-6 md:p-8 rounded-3xl mb-12 shadow-sm relative overflow-hidden"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <h2 className="text-xl font-black tracking-tight mb-6">Create a New Goal</h2>
              <form onSubmit={handleCreateGoal} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Goal List</label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_ICONS.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setNewGoalIcon(icon)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${newGoalIcon === icon ? 'bg-zinc-900 shadow-md transform scale-110 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500'}`}
                      >
                        {renderIcon(icon, "w-5 h-5")}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-5">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Goal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MacBook Pro M3"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:font-medium placeholder:text-zinc-400"
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Target Amount (Rp)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 25,000,000"
                    value={newGoalTarget}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setNewGoalTarget(val ? parseInt(val).toLocaleString('id-ID') : '');
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:font-medium placeholder:text-zinc-400"
                  />
                </div>
                <div className="md:col-span-12 flex justify-end mt-2">
                  <button type="submit" className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-zinc-800 transition-all">
                    Save Goal
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Goals List */}
          {loading ? (
            <div className="text-center text-zinc-400 font-bold uppercase tracking-widest py-12">Loading Goals...</div>
          ) : goals.length === 0 && !isFormOpen ? (
            <div className="text-center border-2 border-dashed border-zinc-200 rounded-3xl py-24 flex flex-col items-center">
              <Target className="w-16 h-16 mb-6 text-zinc-300" strokeWidth={1.5} />
              <h3 className="text-xl font-black text-zinc-900 mb-2">No active goals</h3>
              <p className="text-sm font-bold text-zinc-400 max-w-sm mb-6">You haven't set any financial targets yet. Start dreaming big and create your first goal.</p>
              <button onClick={() => setIsFormOpen(true)} className="bg-white border border-zinc-200 text-zinc-900 px-6 py-3 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-zinc-50 transition-all shadow-sm">
                Create First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map(goal => {
                const percentage = Math.min(100, Math.max(0, (goal.current_amount / goal.target_amount) * 100));
                const isCompleted = percentage >= 100;

                return (
                  <div key={goal.id} className="bg-white border border-zinc-200 rounded-3xl p-6 relative group overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
                    {/* Delete button (shows on hover) */}
                    <button 
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-700 shadow-sm">
                        {renderIcon(goal.icon, "w-7 h-7")}
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-zinc-900 leading-tight">{goal.name}</h3>
                        <div className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase mt-1">Target: Rp {goal.target_amount.toLocaleString('id-ID')}</div>
                      </div>
                    </div>

                    <div className="mb-4 flex-1">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-3xl font-black text-zinc-900 tracking-tighter">Rp {goal.current_amount.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-zinc-500">Progress</span>
                        <span className={`text-xs font-black ${isCompleted ? 'text-emerald-500' : 'text-zinc-900'}`}>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`absolute top-0 left-0 h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-zinc-900'}`}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6">
                      {isCompleted ? (
                        <div className="w-full bg-emerald-50 text-emerald-600 text-center py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          Goal Achieved
                        </div>
                      ) : (
                        <button 
                          onClick={() => setFundingGoal(goal)}
                          className="w-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-900 text-center py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                        >
                          + Add Funds
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

      {/* Funding Modal */}
      {fundingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative"
          >
            <button 
              onClick={() => { setFundingGoal(null); setFundAmount(''); }}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-6 text-zinc-900 w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 shadow-sm">
              {renderIcon(fundingGoal.icon, "w-6 h-6")}
            </div>
            <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Fund '{fundingGoal.name}'</h3>
            <p className="text-sm font-bold text-zinc-500 mb-8">
              Target: Rp {fundingGoal.target_amount.toLocaleString('id-ID')} <br/>
              Current: Rp {fundingGoal.current_amount.toLocaleString('id-ID')} <br/>
              Remaining: <span className="text-emerald-600">Rp {(fundingGoal.target_amount - fundingGoal.current_amount).toLocaleString('id-ID')}</span>
            </p>

            <form onSubmit={handleAddFund}>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Amount to Add (Rp)</label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. 500,000"
                value={fundAmount}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFundAmount(val ? parseInt(val).toLocaleString('id-ID') : '');
                }}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-4 text-xl font-black text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all mb-6 text-center"
              />
              <button type="submit" className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all">
                Confirm Transfer
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
