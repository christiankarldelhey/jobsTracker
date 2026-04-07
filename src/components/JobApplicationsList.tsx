import { useState } from 'react';
import { Building2, Calendar, Edit, CheckCircle, XCircle, Filter, Trash2 } from 'lucide-react';
import { JobPosting } from '../types';

interface JobApplicationsListProps {
  jobs: JobPosting[];
  onEditJob: (job: JobPosting) => void;
  onDeleteJob: (id: string) => void;
}

type FilterType = 'all' | 'applied' | 'not-applied';

export const JobApplicationsList = ({ jobs, onEditJob, onDeleteJob }: JobApplicationsListProps) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredJobs = jobs.filter(job => {
    if (filter === 'applied') return job.applied;
    if (filter === 'not-applied') return !job.applied;
    return true;
  });

  const appliedCount = jobs.filter(j => j.applied).length;
  const notAppliedCount = jobs.filter(j => !j.applied).length;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtrar ofertas
          </h3>
          <div className="text-sm text-gray-600">
            Total: <strong>{jobs.length}</strong> ofertas
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({jobs.length})
          </button>
          <button
            onClick={() => setFilter('applied')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              filter === 'applied'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Aplicadas ({appliedCount})
          </button>
          <button
            onClick={() => setFilter('not-applied')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              filter === 'not-applied'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sin aplicar ({notAppliedCount})
          </button>
        </div>
      </div>

      {/* Lista de ofertas */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md border border-gray-200 text-center">
          <p className="text-gray-500">No hay ofertas para mostrar con este filtro</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-blue-400 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {job.companyName && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      {job.companyName}
                    </h3>
                  )}
                  
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Analizada: {new Date(job.analyzedAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    
                    {job.postingDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Publicada: {new Date(job.postingDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    )}

                    {job.applicationDate && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Aplicada: {new Date(job.applicationDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {job.applied ? (
                    <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Aplicada
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      <XCircle className="w-4 h-4" />
                      Sin aplicar
                    </span>
                  )}

                  <button
                    onClick={() => onEditJob(job)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar esta oferta?')) {
                        onDeleteJob(job.id);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar oferta"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Snippet del texto */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {job.text.substring(0, 200)}...
                </p>
              </div>

              {/* Notas si existen */}
              {job.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-blue-900 mb-1">📝 Notas:</p>
                  <p className="text-sm text-blue-800 whitespace-pre-wrap">{job.notes}</p>
                </div>
              )}

              {/* URL si existe */}
              {job.url && (
                <div className="mb-3">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    🔗 Ver oferta original
                  </a>
                </div>
              )}

              {/* Tecnologías */}
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 12).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 12 && (
                  <span className="px-2 py-1 text-xs text-gray-500">
                    +{job.skills.length - 12} más
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
