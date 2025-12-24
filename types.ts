
export enum HealthStatus {
  NORMAL = '正常',
  SUGGESTION = '建议',
  ABNORMAL = '异常'
}

export interface VitalSign {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  status: HealthStatus;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface HealthReport {
  date: string;
  score: number;
  summary: string;
  analysis: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface VideoRecommendation {
  id: string;
  title: string;
  source: string;
  thumbnail: string;
  duration: string;
}
