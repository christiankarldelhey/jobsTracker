import { useState, useEffect } from 'react';
import { X, Building2, Calendar, Link, CheckCircle, FileText } from 'lucide-react';
import { JobPosting } from '../types';

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
  onSave: (updatedJob: JobPosting) => void;
}

export const EditJobModal = ({ isOpen, onClose, job, onSave }: EditJobModalProps) => {
  const [companyName, setCompanyName] = useState('');
  const [url, setUrl] = useState('');
  const [postingDate, setPostingDate] = useState('');
  const [applied, setApplied] = useState(false);
  const [applicationDate, setApplicationDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (job) {
      setCompanyName(job.companyName || '');
      setUrl(job.url || '');
      setPostingDate(job.postingDate ? new Date(job.postingDate).toISOString().split('T')[0] : '');
      setApplied(job.applied);
      setApplicationDate(job.applicationDate ? new Date(job.applicationDate).toISOString().split('T')[0] : '');
      setNotes(job.notes || '');
    }
  }, [job]);

  const handleSave = () => {
    if (!job) return;

    const updatedJob: JobPosting = {
      ...job,
      companyName: companyName.trim() || undefined,
      url: url.trim() || undefined,
      postingDate: postingDate ? new Date(postingDate) : undefined,
      applied,
      applicationDate: applied && applicationDate ? new Date(applicationDate) : undefined,
      notes: notes.trim() || undefined,
    };

    onSave(updatedJob);
    onClose();
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Editar Oferta</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Campos editables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="inline-block w-4 h-4 mr-2" />
                Nombre de la empresa
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ej: Google, Meta, Spascat..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="inline-block w-4 h-4 mr-2" />
                URL de la oferta
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ejemplo.com/job-posting"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Fecha de publicación
              </label>
              <input
                type="date"
                value={postingDate}
                onChange={(e) => setPostingDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Fecha de aplicación
              </label>
              <input
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                disabled={!applied}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={applied}
                onChange={(e) => {
                  setApplied(e.target.checked);
                  if (e.target.checked && !applicationDate) {
                    setApplicationDate(new Date().toISOString().split('T')[0]);
                  }
                }}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CheckCircle className="w-4 h-4" />
                ¿Has aplicado a esta oferta?
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline-block w-4 h-4 mr-2" />
              Notas / Comentarios
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Envié CV el 01/04. Primera entrevista programada para el 10/04..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Campos de solo lectura */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Información de la oferta (solo lectura)</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Analizada el:</strong> {new Date(job.analyzedAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tecnologías detectadas:</strong> {job.skills.length}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {job.skills.slice(0, 15).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 15 && (
                  <span className="px-2 py-1 text-xs text-gray-500">
                    +{job.skills.length - 15} más
                  </span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-sm font-medium text-gray-700 mb-2">Texto de la oferta:</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{job.text}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
