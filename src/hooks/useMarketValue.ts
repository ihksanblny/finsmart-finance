import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { skillsTaxonomy } from '../data/skillsTaxonomy';

export interface SkillMatrix {
  name: string;
  category: 'golden' | 'baseline';
  subSkills: string[];
  prerequisites?: string[];
}

export interface MarketData {
  id: string;
  title: string;
  category: string;
  salaryMin: number;
  salaryAvg: number;
  salaryMax: number;
  skills: SkillMatrix[];
  demand: string;
  sourceUrl?: string;
}

export function useMarketValue() {
  const [professions, setProfessions] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSalaries() {
      try {
        const { data, error } = await supabase
          .from('job_salaries')
          .select('*');

        if (error) throw error;
        const rawData = data as any[];

        // Process data to group by job_title
        const grouped: Record<string, any> = {};

        rawData?.forEach(row => {
          if (!grouped[row.job_title]) {
            grouped[row.job_title] = {
              title: row.job_title,
              levels: {},
              sourceUrl: row.source_url
            };
          }
          grouped[row.job_title].levels[row.experience_level] = {
            min: row.salary_min,
            max: row.salary_max
          };
          if (!grouped[row.job_title].sourceUrl && row.source_url) {
            grouped[row.job_title].sourceUrl = row.source_url;
          }
        });

        const formattedData: MarketData[] = Object.keys(grouped).map(title => {
          const item = grouped[title];
          const entry = item.levels['Entry Level'];
          const mid = item.levels['Mid Level'];
          const senior = item.levels['Senior Level'];

          // Calculate realistic numbers based on available data
          const calculatedMin = entry ? entry.min : (mid ? mid.min * 0.7 : 5000000);
          const calculatedAvg = mid ? ((mid.min + mid.max) / 2) : (calculatedMin * 1.5);
          const calculatedMax = senior ? senior.max : (mid ? mid.max * 1.5 : calculatedAvg * 1.5);

          const id = title.toLowerCase().replace(/\s+/g, '-');

          // Fetch from Taxonomy
          const taxonomy = skillsTaxonomy[id] || { goldenSkills: [], baselineSkills: [] };
          const finalSkills: SkillMatrix[] = [
            ...taxonomy.goldenSkills.map(s => ({ name: s.name, subSkills: s.subSkills, prerequisites: s.prerequisites, category: 'golden' as const })),
            ...taxonomy.baselineSkills.map(s => ({ name: s.name, subSkills: s.subSkills, category: 'baseline' as const }))
          ];

          return {
            id,
            title: title,
            category: determineCategory(title),
            salaryMin: calculatedMin,
            salaryAvg: calculatedAvg,
            salaryMax: calculatedMax,
            skills: finalSkills,
            demand: 'Tinggi',
            sourceUrl: item.sourceUrl
          };
        });

        // Sort alphabetically
        formattedData.sort((a, b) => a.title.localeCompare(b.title));

        setProfessions(formattedData);
      } catch (err) {
        console.error('Error fetching market value data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSalaries();
  }, []);

  return { professions, loading };
}

// Helper helpers to add some aesthetic data since it's missing from DB
function determineCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('engineer') || t.includes('developer') || t.includes('programmer')) return 'Technology';
  if (t.includes('data')) return 'Data';
  if (t.includes('design') || t.includes('ui/ux') || t.includes('graphic') || t.includes('researcher')) return 'Design';
  if (t.includes('manager')) return 'Management';
  if (t.includes('marketing') || t.includes('sales')) return 'Marketing';
  if (t.includes('finance') || t.includes('account')) return 'Finance';
  if (t.includes('admin') || t.includes('entry')) return 'Administration';
  return 'General';
}