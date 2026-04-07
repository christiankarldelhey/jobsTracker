import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { SkillCount } from '../types';

interface SkillsChartProps {
  skills: Array<SkillCount & { percentage: number }>;
  totalPostings: number;
  onSkillClick: (skillName: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  framework: '#3b82f6',
  language: '#10b981',
  library: '#8b5cf6',
  tool: '#f59e0b',
  styling: '#ec4899',
  testing: '#14b8a6',
  backend: '#6366f1',
  database: '#84cc16',
  cloud: '#06b6d4',
  'spoken-language': '#f97316',
  other: '#64748b'
};

const CATEGORY_LABELS: Record<string, string> = {
  framework: 'Frameworks',
  language: 'Lenguajes de Programación',
  library: 'Librerías',
  tool: 'Herramientas',
  styling: 'Estilos',
  testing: 'Testing',
  backend: 'Backend',
  database: 'Bases de Datos',
  cloud: 'Cloud',
  'spoken-language': 'Idiomas',
  other: 'Otros'
};

export const SkillsChart = ({ skills, totalPostings, onSkillClick }: SkillsChartProps) => {
  if (skills.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-500">No hay datos para mostrar. Analiza una oferta de trabajo para comenzar.</p>
      </div>
    );
  }

  // Agrupar skills por categoría
  const skillsByCategory: Record<string, Array<SkillCount & { percentage: number }>> = {};
  
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  // Filtrar categorías vacías y ordenar por cantidad total de skills
  const categoriesWithSkills = Object.entries(skillsByCategory)
    .filter(([_, skills]) => skills.length > 0)
    .sort((a, b) => {
      // Ordenar por cantidad total de elementos en la categoría
      const totalA = a[1].reduce((sum, skill) => sum + skill.count, 0);
      const totalB = b[1].reduce((sum, skill) => sum + skill.count, 0);
      return totalB - totalA;
    });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Resumen general */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Tecnologías Más Demandadas</h2>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{totalPostings}</span> {totalPostings === 1 ? 'oferta analizada' : 'ofertas analizadas'}
          </div>
        </div>
      </div>

      {/* Gráfico por cada categoría */}
      {categoriesWithSkills.map(([category, categorySkills]) => {
        const topSkills = categorySkills.slice(0, 10); // Top 10 por categoría
        const totalInCategory = categorySkills.reduce((sum, skill) => sum + skill.count, 0);

        return (
          <div key={category} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CATEGORY_COLORS[category] || CATEGORY_COLORS.other }}
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {CATEGORY_LABELS[category] || category}
                </h3>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{categorySkills.length}</span> {categorySkills.length === 1 ? 'tecnología' : 'tecnologías'}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={Math.max(300, topSkills.length * 40)}>
              <BarChart
                data={topSkills}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  type="category" 
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-800">{data.name}</p>
                          <p className="text-lg font-bold" style={{ color: CATEGORY_COLORS[category] || CATEGORY_COLORS.other }}>
                            {data.percentage}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.count} de {totalPostings} {totalPostings === 1 ? 'oferta' : 'ofertas'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="percentage" 
                  fill={CATEGORY_COLORS[category] || CATEGORY_COLORS.other}
                  radius={[0, 8, 8, 0]}
                  onClick={(data: any) => onSkillClick(data.name)}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>

            {/* Mostrar todas las tecnologías de esta categoría si hay más de 10 */}
            {categorySkills.length > 10 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Todas las tecnologías de {CATEGORY_LABELS[category] || category}:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {categorySkills.map((skill) => (
                    <div 
                      key={skill.name}
                      onClick={() => onSkillClick(skill.name)}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-gray-700 truncate">{skill.name}</span>
                      <span className="text-xs font-bold ml-2" style={{ color: CATEGORY_COLORS[category] || CATEGORY_COLORS.other }}>
                        {skill.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Leyenda de categorías */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Tip: Haz click en cualquier barra para ver las ofertas que requieren esa tecnología</h3>
      </div>
    </div>
  );
};
