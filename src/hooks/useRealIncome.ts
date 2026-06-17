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

  const [realInflationRate, setRealInflationRate] = useState<number | null>(null);

  const formatRupiah = (value: string | number) => {
    const numberString = value.toString().replace(/[^,\d]/g, '');
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleLastYearChange = (val: string) => {
    setLastYearSalary(formatRupiah(val));
  };

  const handleCurrentChange = (val: string) => {
    setCurrentSalary(formatRupiah(val));
  };

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
              if (data.last_year_salary) setLastYearSalary(formatRupiah(data.last_year_salary));
              if (data.current_salary) setCurrentSalary(formatRupiah(data.current_salary));
            }
          });
      }
    });

    // Fetch real-time Inflation Rate (World Bank API - Indonesia)
    fetch('https://api.worldbank.org/v2/country/ID/indicator/FP.CPI.TOTL.ZG?format=json')
      .then(res => res.json())
      .then(data => {
        if (data && data[1] && Array.isArray(data[1])) {
          const latestData = data[1].find((item: any) => item.value !== null);
          if (latestData) {
            setRealInflationRate(latestData.value);
            // Default to real inflation rate if not already set
            setInflationRate(latestData.value.toFixed(1));
          }
        }
      })
      .catch(err => console.error("Error fetching inflation rate:", err));
  }, []);

  const calculateRealIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    const last = Number(lastYearSalary.replace(/\./g, ''));
    const current = Number(currentSalary.replace(/\./g, ''));
    const inflation = Number(inflationRate) / 100;

    if (isNaN(last) || isNaN(current) || isNaN(inflation) || last === 0 || current === 0) return;

    // Kenaikan Nominal
    const nominalIncrease = current - last;
    
    // Gaji riil disesuaikan dengan inflasi
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
    handleLastYearChange,
    currentSalary,
    handleCurrentChange,
    inflationRate,
    setInflationRate,
    realInflationRate,
    result,
    calculateRealIncome
  };
}