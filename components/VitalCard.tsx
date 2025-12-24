
import React from 'react';
import { HealthStatus, VitalSign } from '../types';
import { Activity, Thermometer, Droplets, Heart, Moon, Zap } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  blood_pressure: <Activity className="w-6 h-6" />,
  heart_rate: <Heart className="w-6 h-6" />,
  blood_sugar: <Droplets className="w-6 h-6" />,
  blood_oxygen: <Zap className="w-6 h-6" />,
  sleep: <Moon className="w-6 h-6" />,
  lipids: <Thermometer className="w-6 h-6" />
};

interface VitalCardProps {
  vital: VitalSign;
}

export const VitalCard: React.FC<VitalCardProps> = ({ vital }) => {
  const statusColors = {
    [HealthStatus.NORMAL]: 'bg-green-100 text-green-700',
    [HealthStatus.SUGGESTION]: 'bg-yellow-100 text-yellow-700',
    [HealthStatus.ABNORMAL]: 'bg-red-100 text-red-700',
  };

  const borderColors = {
    [HealthStatus.NORMAL]: 'border-green-200',
    [HealthStatus.SUGGESTION]: 'border-yellow-200',
    [HealthStatus.ABNORMAL]: 'border-red-200',
  };

  return (
    <div className={`p-4 bg-white rounded-2xl border ${borderColors[vital.status]} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl ${statusColors[vital.status]}`}>
          {icons[vital.id] || <Activity />}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[vital.status]}`}>
          {vital.status}
        </span>
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{vital.label}</h3>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
          <span className="text-sm text-gray-400 font-medium">{vital.unit}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs font-medium">
        {vital.trend === 'up' && <span className="text-red-500">↑ 比昨日上升</span>}
        {vital.trend === 'down' && <span className="text-blue-500">↓ 比昨日下降</span>}
        {vital.trend === 'stable' && <span className="text-gray-400">→ 数据稳定</span>}
      </div>
    </div>
  );
};
