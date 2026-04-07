import { Building2 } from 'lucide-react';
import { JobPosting } from '../types';

interface CompanyListProps {
  jobs: JobPosting[];
  onCompanyClick: (companyName: string) => void;
}

export const CompanyList = ({ jobs, onCompanyClick }: CompanyListProps) => {
  const companyCounts = jobs.reduce((acc, job) => {
    if (job.companyName) {
      acc[job.companyName] = (acc[job.companyName] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const companies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  if (companies.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Empresas Analizadas
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          💡 Haz click en cualquier empresa para ver todas sus ofertas
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {companies.map((company) => (
            <button
              key={company.name}
              onClick={() => onCompanyClick(company.name)}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-700">
                  {company.name}
                </span>
              </div>
              <span className="text-sm font-bold text-blue-600 bg-white px-2 py-1 rounded-full ml-2 flex-shrink-0">
                {company.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>{companies.length}</strong> {companies.length === 1 ? 'empresa' : 'empresas'} • <strong>{jobs.filter(j => j.companyName).length}</strong> ofertas con empresa identificada
          </p>
        </div>
      </div>
    </div>
  );
};
