import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useRealIncome() {
  const [lastYearSalary, setLastYearSalary] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [inflationRate, setInflationRate] = useState('5.5');
  const [result, setResult] = useState<{
    nominalIncrease: number;
    realIncrease: number;
    realSalary: number;
    isHealthy: boolean;
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get user and fetch existing profile data
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        supabase
          .from('profiles')
          .select('current_salary, last_year_salary')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              if (data.last_year_salary) setLastYearSalary(data.last_year_salary.toString());
              if (data.current_salary) setCurrentSalary(data.current_salary.toString());
            }
          });
      }
    });
  }, []);

  const calculateRealIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    const last = Number(lastYearSalary);
    const current = Number(currentSalary);
    const inflation = Number(inflationRate) / 100;

    if (isNaN(last) || isNaN(current) || isNaN(inflation)) return;

    // Kenaikan Nominal
    const nominalIncrease = current - last;
    
    // Gaji riil disesuaikan dengan inflasi
    // Gaji saat ini nilainya 'turun' karena uang tersebut hanya setara dengan (current / (1 + inflation)) di tahun lalu
    const realSalary = current / (1 + inflation);
    const realIncrease = realSalary - last;

    setResult({
      nominalIncrease,
      realIncrease,
      realSalary,
      isHealthy: realIncrease > 0,
    });

    // Save to Supabase
    if (userId) {
      await supabase
        .from('profiles')
        .update({
          current_salary: current,
          last_year_salary: last
        })
        .eq('id', userId);
    }
  };

  return {
    lastYearSalary,
    setLastYearSalary,
    currentSalary,
    setCurrentSalary,
    inflationRate,
    setInflationRate,
    result,
    calculateRealIncome
  };
}