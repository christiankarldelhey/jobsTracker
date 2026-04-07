import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { WorkModeStats, LocationStats } from '../types';

interface PieChartsProps {
  workModeStats: WorkModeStats;
  locationStats: LocationStats;
  degreeStats: { required: number; notRequired: number };
}

const WORK_MODE_COLORS = {
  remote: '#10b981',
  hybrid: '#f59e0b',
  onsite: '#ef4444',
  unknown: '#9ca3af'
};

const LOCATION_COLORS = {
  barcelona: '#3b82f6',
  eu: '#8b5cf6',
  other: '#ec4899',
  unknown: '#9ca3af'
};

const DEGREE_COLORS = {
  required: '#ef4444',
  notRequired: '#10b981'
};

const WORK_MODE_LABELS: Record<string, string> = {
  remote: 'Remoto',
  hybrid: 'Híbrido',
  onsite: 'Presencial',
  unknown: 'No especificado'
};

const LOCATION_LABELS: Record<string, string> = {
  barcelona: 'Barcelona',
  eu: 'UE (otros)',
  other: 'Otros países',
  unknown: 'No especificado'
};

export const PieCharts = ({ workModeStats, locationStats, degreeStats }: PieChartsProps) => {
  const workModeData = Object.entries(workModeStats)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: WORK_MODE_LABELS[key] || key,
      value,
      color: WORK_MODE_COLORS[key as keyof typeof WORK_MODE_COLORS]
    }));

  const locationData = Object.entries(locationStats)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: LOCATION_LABELS[key] || key,
      value,
      color: LOCATION_COLORS[key as keyof typeof LOCATION_COLORS]
    }));

  const degreeData = [
    { name: 'Requiere Degree', value: degreeStats.required, color: DEGREE_COLORS.required },
    { name: 'No requiere Degree', value: degreeStats.notRequired, color: DEGREE_COLORS.notRequired }
  ].filter(item => item.value > 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (workModeData.length === 0 && locationData.length === 0 && degreeData.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {workModeData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Modalidad de Trabajo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={workModeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {workModeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} ofertas`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {locationData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Ubicación</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={locationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} ofertas`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {degreeData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Requisito de Degree</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={degreeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {degreeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} ofertas`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
