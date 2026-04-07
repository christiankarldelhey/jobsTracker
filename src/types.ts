export interface Profile {
  id: string;
  userId: string;
  name: string;
  description?: string;
  color: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface Technology {
  name: string;
  variants: string[];
  category: 'framework' | 'language' | 'library' | 'tool' | 'styling' | 'testing' | 'backend' | 'database' | 'cloud' | 'other' | 'spoken-language';
}

export interface SkillCount {
  name: string;
  count: number;
  category: string;
}

export interface JobPosting {
  id: string;
  userId?: string;
  profileId?: string;
  text: string;
  analyzedAt: Date;
  postingDate?: Date;
  companyName?: string;
  url?: string;
  skills: string[];
  requiresDegree: boolean;
  workMode: 'remote' | 'hybrid' | 'onsite' | 'unknown';
  location: 'barcelona' | 'eu' | 'other' | 'unknown';
  applied: boolean;
  applicationDate?: Date;
  notes?: string;
}

export interface WorkModeStats {
  remote: number;
  hybrid: number;
  onsite: number;
  unknown: number;
}

export interface LocationStats {
  barcelona: number;
  eu: number;
  other: number;
  unknown: number;
}
