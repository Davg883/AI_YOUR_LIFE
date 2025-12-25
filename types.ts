
export enum Sector {
  HOSPITALITY = 'HOSPITALITY',
  CONSTRUCTION = 'CONSTRUCTION',
  LOGISTICS = 'LOGISTICS',
  ALL = 'ALL'
}

export interface ComparisonPoint {
  feature: string;
  traditional: string;
  aiAgent: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface Tool {
  id: string;
  name: string;
  sector: Sector;
  tagline: string;
  description: string;
  path: string;
  status: 'LIVE' | 'WAITLIST' | 'CASE STUDY';
  hoverVideo?: string;
  hoverImage?: string;
}

export interface DeploymentLog {
  id: string;
  date: string;
  sector: Sector;
  headline: string;
  metric: string;
}