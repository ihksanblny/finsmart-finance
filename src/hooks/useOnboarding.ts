import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const PROFESSIONS = ['Software Engineer', 'UI/UX Designer', 'Data Analyst', 'Digital Marketer', 'Product Manager', 'Akuntan / Finance', 'Lainnya'];
export const GOALS = [
  { id: 'audit', title: 'Audit Skill & Gaji', desc: 'Evaluasi kompetensi untuk negosiasi gaji.' },
  { id: 'ledger', title: 'Melacak Arus Kas', desc: 'Mencatat pemasukan dan pengeluaran harian.' },
  { id: 'inflation', title: 'Analisis Inflasi', desc: 'Memahami dampak inflasi pada daya beli.' }
];

export function useOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    profession: '',
    salary: '',
    goal: ''
  });

  // Proteksi: Jika sudah onboarding, lempar ke dashboard
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/login');
      else {
        supabase.from('profiles').select('onboarding_completed').eq('id', user.id).single()
          .then(({ data }) => {
            if (data?.onboarding_completed) navigate('/dashboard');
          });
      }
    });
  }, [navigate]);

  const handleComplete = async () => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const numSalary = parseInt(formData.salary.replace(/\D/g, '') || '0');

      await supabase.from('profiles').update({
        current_profession: formData.profession,
        current_salary: numSalary,
        main_goal: formData.goal,
        onboarding_completed: true
      }).eq('id', user.id);
      
      // Transisi simulasi pemrosesan AI (Efek psikologis)
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, salary: val ? parseInt(val).toLocaleString('id-ID') : '' });
  };

  return {
    step,
    setStep,
    isProcessing,
    formData,
    setFormData,
    handleSalaryChange,
    handleComplete
  };
}
