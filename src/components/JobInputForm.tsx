import { useState } from 'react';
import { FileText, Sparkles, Building2, Calendar, Link, CheckCircle } from 'lucide-react';

interface JobInputFormProps {
  onAnalyze: (text: string, companyName?: string, postingDate?: Date, url?: string, applied?: boolean) => void;
  isAnalyzing: boolean;
}

export const JobInputForm = ({ onAnalyze, isAnalyzing }: JobInputFormProps) => {
  const [jobText, setJobText] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [postingDate, setPostingDate] = useState('');
  const [url, setUrl] = useState('');
  const [applied, setApplied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobText.trim()) {
      const date = postingDate ? new Date(postingDate) : undefined;
      const jobUrl = url.trim() || undefined;
      onAnalyze(jobText, companyName.trim() || undefined, date, jobUrl, applied);
    }
  };

  const handleClear = () => {
    setJobText('');
    setCompanyName('');
    setPostingDate('');
    setUrl('');
    setApplied(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="inline-block w-4 h-4 mr-2" />
              Nombre de la empresa (opcional)
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej: Google, Meta, Spascat..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isAnalyzing}
            />
          </div>
          <div>
            <label htmlFor="posting-date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Fecha de publicación (opcional)
            </label>
            <input
              id="posting-date"
              type="date"
              value={postingDate}
              onChange={(e) => setPostingDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isAnalyzing}
            />
          </div>
          <div>
            <label htmlFor="job-url" className="block text-sm font-medium text-gray-700 mb-2">
              <Link className="inline-block w-4 h-4 mr-2" />
              URL de la oferta (opcional)
            </label>
            <input
              id="job-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com/job"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isAnalyzing}
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="job-posting" className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline-block w-4 h-4 mr-2" />
            Pega aquí la oferta de trabajo
          </label>
          <textarea
            id="job-posting"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Pega aquí el texto completo de la oferta de trabajo:&#10;&#10;We are looking for a Senior Frontend Developer with experience in React, TypeScript, and modern web technologies...&#10;&#10;Requirements:&#10;- 3+ years of experience with React&#10;- Strong knowledge of TypeScript&#10;- Experience with Next.js and TailwindCSS..."
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            disabled={isAnalyzing}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {jobText.length} caracteres
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={applied}
              onChange={(e) => setApplied(e.target.checked)}
              disabled={isAnalyzing}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              ¿Has aplicado a esta oferta?
            </span>
          </label>
          <p className="text-xs text-gray-600 mt-2 ml-8">
            Marca esta casilla si ya has enviado tu aplicación para esta oferta
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!jobText.trim() || isAnalyzing}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analizando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analizar Oferta
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={!jobText || isAnalyzing}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            Limpiar
          </button>
        </div>
      </form>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Analiza múltiples ofertas para obtener estadísticas más precisas sobre las tecnologías más demandadas. Puedes editar cualquier oferta después desde la pestaña "Mis Aplicaciones".
        </p>
      </div>
    </div>
  );
};
