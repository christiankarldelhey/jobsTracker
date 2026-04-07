import { X, Calendar, MapPin, Briefcase, GraduationCap, Building2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { JobPosting } from '../types';

interface JobListModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobPosting[];
  skillName: string;
}

const WORK_MODE_LABELS: Record<string, string> = {
  remote: 'Remoto',
  hybrid: 'Híbrido',
  onsite: 'Presencial',
  unknown: 'No especificado'
};

const LOCATION_LABELS: Record<string, string> = {
  barcelona: 'Barcelona',
  eu: 'UE',
  other: 'Otros países',
  unknown: 'No especificado'
};

export const JobListModal = ({ isOpen, onClose, jobs, skillName }: JobListModalProps) => {
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  const toggleExpanded = (jobId: string) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Ofertas que requieren <span className="text-blue-600">{skillName}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No hay ofertas para mostrar</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-col gap-2">
                      {job.companyName && (
                        <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          {job.companyName}
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {job.postingDate ? (
                            <>
                              Publicado: {new Date(job.postingDate).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                              <span className="text-gray-400">•</span>
                              Analizado: {new Date(job.analyzedAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </>
                          ) : (
                            new Date(job.analyzedAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          )}
                        </div>
                        {job.url && (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Ver oferta original
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <Briefcase className="w-3 h-3" />
                      {WORK_MODE_LABELS[job.workMode]}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      <MapPin className="w-3 h-3" />
                      {LOCATION_LABELS[job.location]}
                    </span>
                    {job.requiresDegree && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        <GraduationCap className="w-3 h-3" />
                        Requiere Degree
                      </span>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded p-3 relative">
                    <div className={`text-sm text-gray-700 whitespace-pre-wrap ${
                      expandedJobs.has(job.id) ? '' : 'max-h-32 overflow-hidden'
                    }`}>
                      {job.text}
                    </div>
                    {job.text.length > 300 && (
                      <button
                        onClick={() => toggleExpanded(job.id)}
                        className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {expandedJobs.has(job.id) ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Ver menos
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Ver oferta completa
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {job.skills.slice(0, 10).map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 text-xs rounded ${
                          skill === skillName
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 10 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{job.skills.length - 10} más
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            {jobs.length} {jobs.length === 1 ? 'oferta encontrada' : 'ofertas encontradas'}
          </p>
        </div>
      </div>
    </div>
  );
};
