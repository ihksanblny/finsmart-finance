import { useMemo } from 'react';

interface Goal {
  name: string;
  target_amount: number;
  current_amount: number;
}

export function useAiInsight(monthIncome: number, monthExpense: number, activeGoals: Goal[]) {
  return useMemo(() => {
    const freeCashflow = monthIncome - monthExpense;
    const topGoal = activeGoals && activeGoals.length > 0 ? activeGoals[0] : null;
    let aiInsight = { type: 'neutral', message: '', actionText: '', actionLink: '' };

    if (freeCashflow < 0) {
      aiInsight = {
        type: 'danger',
        message: `Cashflow Anda bulan ini minus Rp ${Math.abs(freeCashflow).toLocaleString('id-ID')}. Jika gaya hidup ini dipertahankan, Anda tidak akan pernah mencapai target finansial Anda.`,
        actionText: 'Evaluasi Ledger',
        actionLink: '/ledger'
      };
    } else if (freeCashflow > 0 && !topGoal) {
      aiInsight = {
        type: 'warning',
        message: `Bagus! Anda punya uang menganggur Rp ${freeCashflow.toLocaleString('id-ID')} bulan ini. Namun uang kas yang diam akan tergerus inflasi tahunan. Segera alokasikan ke target tabungan!`,
        actionText: 'Buat Goal Baru',
        actionLink: '/goals'
      };
    } else if (freeCashflow > 0 && topGoal) {
      const remainingGoal = topGoal.target_amount - topGoal.current_amount;
      if (remainingGoal > 0) {
        const monthsNeeded = Math.ceil(remainingGoal / freeCashflow);
        aiInsight = {
          type: 'success',
          message: `Sisa uang Anda bulan ini Rp ${freeCashflow.toLocaleString('id-ID')}. Jika ditabung rutin setiap bulan, target "${topGoal.name}" Anda akan tercapai dalam ${monthsNeeded} bulan!`,
          actionText: 'Tingkatkan Gaji',
          actionLink: '/market-value'
        };
      } else {
        aiInsight = {
          type: 'success',
          message: `Target "${topGoal.name}" Anda sudah tercapai! Saatnya merayakan atau membuat target investasi baru yang lebih besar.`,
          actionText: 'Kelola Goals',
          actionLink: '/goals'
        };
      }
    } else {
      aiInsight = {
        type: 'neutral',
        message: 'Sistem membutuhkan data transaksi lebih banyak bulan ini untuk melakukan peramalan (forecasting) keuangan Anda.',
        actionText: 'Catat Transaksi',
        actionLink: '/ledger'
      };
    }

    return aiInsight;
  }, [monthIncome, monthExpense, activeGoals]);
}
