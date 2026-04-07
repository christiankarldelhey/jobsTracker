import { TECHNOLOGIES } from '../data/technologies';
import { SkillCount, JobPosting, WorkModeStats, LocationStats } from '../types';

export const analyzeJobPosting = (text: string): SkillCount[] => {
  const normalizedText = text.toLowerCase();
  const skillCounts = new Map<string, { count: number; category: string }>();

  TECHNOLOGIES.forEach((tech) => {
    let found = false;
    
    tech.variants.forEach((variant) => {
      const regex = new RegExp(`\\b${variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = normalizedText.match(regex);
      
      if (matches && matches.length > 0) {
        found = true;
      }
    });

    if (found) {
      skillCounts.set(tech.name, {
        count: 1,
        category: tech.category
      });
    }
  });

  return Array.from(skillCounts.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      category: data.category
    }))
    .sort((a, b) => b.count - a.count);
};

export const calculatePercentages = (
  skills: SkillCount[],
  totalPostings: number
): Array<SkillCount & { percentage: number }> => {
  return skills.map(skill => ({
    ...skill,
    percentage: Math.round((skill.count / totalPostings) * 100)
  }));
};

export const detectDegreeRequirement = (text: string): boolean => {
  const normalizedText = text.toLowerCase();
  const degreeKeywords = [
    'degree', 'bachelor', 'master', 'university', 'college',
    'licenciatura', 'grado', 'título universitario', 'carrera universitaria',
    'ingeniería', 'engineering degree', 'computer science degree',
    'bs ', 'ba ', 'ms ', 'ma ', 'phd'
  ];
  
  return degreeKeywords.some(keyword => normalizedText.includes(keyword));
};

export const detectWorkMode = (text: string): 'remote' | 'hybrid' | 'onsite' | 'unknown' => {
  const normalizedText = text.toLowerCase();
  
  const remoteKeywords = ['remote', 'remoto', 'trabajo remoto', 'fully remote', '100% remote', 'work from home', 'wfh', 'teletrabajo'];
  const hybridKeywords = ['hybrid', 'híbrido', 'hibrido', 'semi-remote', 'semi-remoto', 'flexible'];
  const onsiteKeywords = ['on-site', 'onsite', 'presencial', 'office', 'oficina', 'in-office'];
  
  const hasRemote = remoteKeywords.some(keyword => normalizedText.includes(keyword));
  const hasHybrid = hybridKeywords.some(keyword => normalizedText.includes(keyword));
  const hasOnsite = onsiteKeywords.some(keyword => normalizedText.includes(keyword));
  
  if (hasRemote && !hasHybrid && !hasOnsite) return 'remote';
  if (hasHybrid) return 'hybrid';
  if (hasOnsite && !hasRemote && !hasHybrid) return 'onsite';
  
  return 'unknown';
};

export const detectLocation = (text: string): 'barcelona' | 'eu' | 'other' | 'unknown' => {
  const normalizedText = text.toLowerCase();
  
  if (normalizedText.includes('barcelona') || normalizedText.includes('bcn')) {
    return 'barcelona';
  }
  
  const euCountries = [
    'spain', 'españa', 'madrid', 'valencia', 'sevilla',
    'germany', 'alemania', 'berlin', 'munich',
    'france', 'francia', 'paris', 'lyon',
    'italy', 'italia', 'rome', 'milan',
    'netherlands', 'holanda', 'amsterdam',
    'portugal', 'lisbon', 'lisboa',
    'poland', 'polonia', 'warsaw',
    'sweden', 'suecia', 'stockholm',
    'ireland', 'irlanda', 'dublin',
    'belgium', 'bélgica', 'brussels',
    'austria', 'viena', 'vienna',
    'europe', 'europa', 'european union', 'eu'
  ];
  
  if (euCountries.some(country => normalizedText.includes(country))) {
    return 'eu';
  }
  
  const otherLocations = [
    'usa', 'united states', 'estados unidos', 'us',
    'uk', 'united kingdom', 'london',
    'canada', 'toronto', 'vancouver',
    'australia', 'sydney',
    'asia', 'singapore', 'india',
    'latin america', 'latinoamérica', 'latam',
    'mexico', 'méxico', 'argentina', 'chile', 'colombia'
  ];
  
  if (otherLocations.some(location => normalizedText.includes(location))) {
    return 'other';
  }
  
  return 'unknown';
};

export const aggregateSkills = (allSkills: string[][]): SkillCount[] => {
  const skillCounts = new Map<string, { count: number; category: string }>();

  allSkills.forEach((postingSkills) => {
    postingSkills.forEach((skillName) => {
      const tech = TECHNOLOGIES.find(t => t.name === skillName);
      if (tech) {
        const existing = skillCounts.get(skillName);
        if (existing) {
          existing.count += 1;
        } else {
          skillCounts.set(skillName, {
            count: 1,
            category: tech.category
          });
        }
      }
    });
  });

  return Array.from(skillCounts.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      category: data.category
    }))
    .sort((a, b) => b.count - a.count);
};

export const calculateWorkModeStats = (postings: JobPosting[]): WorkModeStats => {
  const stats: WorkModeStats = {
    remote: 0,
    hybrid: 0,
    onsite: 0,
    unknown: 0
  };
  
  postings.forEach(posting => {
    stats[posting.workMode]++;
  });
  
  return stats;
};

export const calculateLocationStats = (postings: JobPosting[]): LocationStats => {
  const stats: LocationStats = {
    barcelona: 0,
    eu: 0,
    other: 0,
    unknown: 0
  };
  
  postings.forEach(posting => {
    stats[posting.location]++;
  });
  
  return stats;
};

export const calculateDegreeStats = (postings: JobPosting[]): { required: number; notRequired: number } => {
  const required = postings.filter(p => p.requiresDegree).length;
  return {
    required,
    notRequired: postings.length - required
  };
};
