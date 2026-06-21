import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export type Goal = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  icon: string | null;
};

export const COMMON_ICONS = ['target', 'laptop', 'car', 'plane', 'home', 'heart', 'graduation-cap', 'building', 'gamepad-2', 'bike'];

export function useGoals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalIcon, setNewGoalIcon] = useState('target');

  // Fund Modal State
  const [fundingGoal, setFundingGoal] = useState<Goal | null>(null);
  const [fundAmount, setFundAmount] = useState('');

  useEffect(() => {
    fetchGoals();
  }, [navigate]);

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      
      const { data, error } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName || !newGoalTarget) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('financial_goals').insert({
        user_id: user.id,
        name: newGoalName,
        target_amount: parseInt(newGoalTarget.replace(/\D/g, ''), 10),
        current_amount: 0,
        icon: newGoalIcon
      });

      if (error) throw error;
      
      setIsFormOpen(false);
      setNewGoalName('');
      setNewGoalTarget('');
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleAddFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fundingGoal || !fundAmount) return;

    const amountToAdd = parseInt(fundAmount.replace(/\D/g, ''), 10);
    if (isNaN(amountToAdd) || amountToAdd <= 0) return;

    try {
      const newAmount = fundingGoal.current_amount + amountToAdd;
      // Cap at target
      const finalAmount = newAmount > fundingGoal.target_amount ? fundingGoal.target_amount : newAmount;

      const { error } = await supabase
        .from('financial_goals')
        .update({ current_amount: finalAmount })
        .eq('id', fundingGoal.id);

      if (error) throw error;
      
      setFundingGoal(null);
      setFundAmount('');
      fetchGoals();
    } catch (error) {
      console.error('Error funding goal:', error);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    try {
      const { error } = await supabase.from('financial_goals').delete().eq('id', id);
      if (error) throw error;
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return {
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
  };
}
