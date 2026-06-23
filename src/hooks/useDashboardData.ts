import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string | null;
  date: string;
};

export function useDashboardData() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<{current_profession?: string, current_salary: number, last_year_salary: number} | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeGoals, setActiveGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Kurs & Inflasi State
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [exchangeRateDate, setExchangeRateDate] = useState<string>('');
  const [inflationRate, setInflationRate] = useState<number>(5.5); // Default fallback

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        fetchTransactions(user.id);
      }
    });

    // Fetch real-time exchange rate
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates.IDR) {
          setExchangeRate(data.rates.IDR);
          setExchangeRateDate(
            new Date(data.time_last_update_utc).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          );
        }
      })
      .catch(err => console.error("Error fetching exchange rate:", err));

    // Fetch real-time Inflation Rate (World Bank API - Indonesia)
    fetch('https://api.worldbank.org/v2/country/ID/indicator/FP.CPI.TOTL.ZG?format=json')
      .then(res => res.json())
      .then(data => {
        if (data && data[1] && Array.isArray(data[1])) {
          // Find the latest non-null inflation value
          const latestData = data[1].find((item: any) => item.value !== null);
          if (latestData) {
            setInflationRate(latestData.value);
          }
        }
      })
      .catch(err => console.error("Error fetching inflation rate:", err));
  }, []);

  const fetchTransactions = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', uid)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setTransactions((data as Transaction[]) || []);
      
      // Fetch Goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(2);
        
      if (!goalsError && goalsData) {
        setActiveGoals(goalsData);
      }
      
      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('current_salary, last_year_salary, current_profession')
        .eq('id', uid)
        .single();
        
      if (profileData && profileData.current_salary) {
         setProfile({
            current_profession: profileData.current_profession || undefined,
            current_salary: profileData.current_salary,
            last_year_salary: profileData.last_year_salary || null
         });
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (
    type: 'income' | 'expense',
    amount: string,
    category: string,
    description: string
  ) => {
    if (!amount || isNaN(Number(amount)) || !userId) return;

    try {
      const { error } = await supabase.from('transactions').insert([
        {
          user_id: userId,
          type,
          amount: Number(amount),
          category,
          description,
        }
      ]);

      if (error) throw error;
      
      fetchTransactions(userId);
    } catch (err: any) {
      console.error('Error adding transaction:', err);
      alert(`Gagal menyimpan transaksi! Error: ${err.message}`);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!userId) return;
    
    // Optional: Konfirmasi pengguna sebelum menghapus
    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
      
      // Refresh transactions after deletion
      fetchTransactions(userId);
    } catch (err: any) {
      console.error('Error deleting transaction:', err);
      alert(`Gagal menghapus transaksi! Error: ${err.message}`);
    }
  };

  // Kalkulasi Saldo & Pemasukan/Pengeluaran Bulan Ini
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthIncome = thisMonthTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const monthExpense = thisMonthTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

  // Kalkulasi Daya Beli
  let dayaBeliStatus = null;
  if (profile && profile.last_year_salary && profile.current_salary) {
     const last = profile.last_year_salary;
     const current = profile.current_salary;
     const inflation = inflationRate / 100; // Dinamis dari API
     const realSalary = current / (1 + inflation);
     const realIncrease = realSalary - last;
     
     const realPercent = ((realSalary - last) / last) * 100;
     
     // New feature: Integration with Expense & Income
     // Jika user punya penghasilan tambahan (monthIncome > current), daya belinya tertolong!
     const effectiveIncome = Math.max(realSalary, monthIncome);
     const remainingReal = effectiveIncome - monthExpense;
     
     dayaBeliStatus = {
        isHealthy: realIncrease > 0,
        realPercent: realPercent,
        realSalary: realSalary,
        remainingReal: remainingReal
     };
  }

  return {
    transactions,
    recentTransactions: transactions.slice(0, 5),
    activeGoals,
    loading,
    exchangeRate,
    exchangeRateDate,
    inflationRate,
    totalBalance,
    monthIncome,
    monthExpense,
    dayaBeliStatus,
    profile,
    handleAddTransaction,
    handleDeleteTransaction
  };
}
