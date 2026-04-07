import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { JobInputForm } from './components/JobInputForm';
import { SkillsChart } from './components/SkillsChart';
import { PieCharts } from './components/PieCharts';
import { JobListModal } from './components/JobListModal';
import { CompanyList } from './components/CompanyList';
import { JobApplicationsList } from './components/JobApplicationsList';
import { EditJobModal } from './components/EditJobModal';
import { ProfileSelector } from './components/ProfileSelector';
import { ProfileManagementModal } from './components/ProfileManagementModal';
import { AuthScreen } from './components/auth/AuthScreen';
import { useAuth } from './contexts/AuthContext';
import { useProfile } from './contexts/ProfileContext';
import { analyzeJobPosting, calculatePercentages, aggregateSkills, detectDegreeRequirement, detectWorkMode, detectLocation, calculateWorkModeStats, calculateLocationStats, calculateDegreeStats } from './utils/analyzer';
import { saveJobPosting, clearHistory, getJobPostingsHistory, updateJobPosting, deleteJobPosting } from './utils/storage';
import { JobPosting, WorkModeStats, LocationStats, Profile } from './types';
import { BarChart3, Trash2, LogOut } from 'lucide-react';

function App() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const { activeProfile } = useProfile();
  const [activeTab, setActiveTab] = useState<'input' | 'analysis' | 'applications'>('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentSkills, setCurrentSkills] = useState<Array<{ name: string; count: number; category: string; percentage: number }>>([]);
  const [totalPostings, setTotalPostings] = useState(0);
  const [workModeStats, setWorkModeStats] = useState<WorkModeStats>({ remote: 0, hybrid: 0, onsite: 0, unknown: 0 });
  const [locationStats, setLocationStats] = useState<LocationStats>({ barcelona: 0, eu: 0, other: 0, unknown: 0 });
  const [degreeStats, setDegreeStats] = useState({ required: 0, notRequired: 0 });
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [allJobs, setAllJobs] = useState<JobPosting[]>([]);
  const [managingProfile, setManagingProfile] = useState<Profile | undefined>(undefined);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    if (activeProfile) {
      loadHistoricalData();
    }
  }, [activeProfile]);

  const loadHistoricalData = async () => {
    try {
      if (!activeProfile) {
        setAllJobs([]);
        setCurrentSkills([]);
        setTotalPostings(0);
        return;
      }

      const allPostings = await getJobPostingsHistory();
      const profilePostings = allPostings.filter((job: JobPosting) => job.profileId === activeProfile.id);
      setAllJobs(profilePostings);
      
      const allSkills = profilePostings.map((posting: JobPosting) => posting.skills);
      
      if (allSkills.length > 0) {
        const aggregated = aggregateSkills(allSkills);
        const withPercentages = calculatePercentages(aggregated, allSkills.length);
        setCurrentSkills(withPercentages);
        setTotalPostings(allSkills.length);
        
        setWorkModeStats(calculateWorkModeStats(profilePostings));
        setLocationStats(calculateLocationStats(profilePostings));
        setDegreeStats(calculateDegreeStats(profilePostings));
      } else {
        setCurrentSkills([]);
        setTotalPostings(0);
        setWorkModeStats({ remote: 0, hybrid: 0, onsite: 0, unknown: 0 });
        setLocationStats({ barcelona: 0, eu: 0, other: 0, unknown: 0 });
        setDegreeStats({ required: 0, notRequired: 0 });
      }
    } catch (error) {
      console.error('Error loading historical data:', error);
    }
  };

  const handleAnalyze = async (text: string, companyName?: string, postingDate?: Date, url?: string, applied?: boolean) => {
    setIsAnalyzing(true);
    
    try {
      const skills = analyzeJobPosting(text);
      const skillNames = skills.map(s => s.name);
      
      if (!activeProfile) {
        alert('No hay un profile activo. Por favor crea o selecciona un profile.');
        setIsAnalyzing(false);
        return;
      }

      const newPosting: JobPosting = {
        id: Date.now().toString(),
        profileId: activeProfile.id,
        text,
        analyzedAt: new Date(),
        postingDate,
        companyName,
        url,
        skills: skillNames,
        requiresDegree: detectDegreeRequirement(text),
        workMode: detectWorkMode(text),
        location: detectLocation(text),
        applied: applied || false,
        applicationDate: applied ? new Date() : undefined,
      };
      
      await saveJobPosting(newPosting);
      await loadHistoricalData();
      setIsAnalyzing(false);
      
      // Switch to analysis tab after successful analysis
      setActiveTab('analysis');
    } catch (error) {
      console.error('Error analyzing job posting:', error);
      alert('Error al guardar la oferta. Por favor intenta de nuevo.');
      setIsAnalyzing(false);
    }
  };

  const handleUpdateJob = async (updatedJob: JobPosting) => {
    try {
      await updateJobPosting(updatedJob);
      await loadHistoricalData();
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error al actualizar la oferta. Por favor intenta de nuevo.');
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJobPosting(id);
      await loadHistoricalData();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error al eliminar la oferta. Por favor intenta de nuevo.');
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial de análisis?')) {
      try {
        await clearHistory();
        await loadHistoricalData();
      } catch (error) {
        console.error('Error clearing history:', error);
        alert('Error al borrar el historial. Por favor intenta de nuevo.');
      }
    }
  };

  const handleSkillClick = (skillName: string) => {
    const jobsWithSkill = allJobs.filter(posting => 
      posting.skills.includes(skillName)
    );
    setSelectedSkill(skillName);
    setSelectedCompany(null);
    setFilteredJobs(jobsWithSkill);
  };

  const handleCompanyClick = (companyName: string) => {
    const jobsFromCompany = allJobs.filter(posting => 
      posting.companyName === companyName
    );
    setSelectedCompany(companyName);
    setSelectedSkill(null);
    setFilteredJobs(jobsFromCompany);
  };

  const handleCloseModal = () => {
    setSelectedSkill(null);
    setSelectedCompany(null);
    setFilteredJobs([]);
  };

  const handleManageProfile = (profile?: Profile) => {
    setManagingProfile(profile);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setManagingProfile(undefined);
  };

  // Mostrar pantalla de autenticación si no está autenticado
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Job Skills Tracker
                </h1>
                <p className="text-gray-600 text-sm">
                  Analiza ofertas, descubre tecnologías demandadas y trackea tus aplicaciones
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ProfileSelector onManageProfile={handleManageProfile} />
              <div className="text-right">
                <p className="text-sm text-gray-600">Bienvenido</p>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto px-4 py-8">
        {/* Pestaña 1: Ingresar Oferta */}
        {activeTab === 'input' && (
          <div className="space-y-8">
            <JobInputForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {/* Pestaña 2: Análisis */}
        {activeTab === 'analysis' && (
          <div className="space-y-8">
            {totalPostings > 0 && (
              <div className="flex justify-end max-w-6xl mx-auto">
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Borrar Historial ({totalPostings} {totalPostings === 1 ? 'oferta' : 'ofertas'})
                </button>
              </div>
            )}

            {totalPostings === 0 ? (
              <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-md border border-gray-200 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay datos para analizar</h3>
                <p className="text-gray-600 mb-6">
                  Ingresa algunas ofertas de trabajo para ver estadísticas y análisis
                </p>
                <button
                  onClick={() => setActiveTab('input')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ingresar Primera Oferta
                </button>
              </div>
            ) : (
              <>
                <PieCharts 
                  workModeStats={workModeStats}
                  locationStats={locationStats}
                  degreeStats={degreeStats}
                />

                <SkillsChart 
                  skills={currentSkills} 
                  totalPostings={totalPostings}
                  onSkillClick={handleSkillClick}
                />

                <CompanyList 
                  jobs={allJobs}
                  onCompanyClick={handleCompanyClick}
                />
              </>
            )}
          </div>
        )}

        {/* Pestaña 3: Mis Aplicaciones */}
        {activeTab === 'applications' && (
          <div className="space-y-8">
            {totalPostings === 0 ? (
              <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-md border border-gray-200 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay ofertas ingresadas</h3>
                <p className="text-gray-600 mb-6">
                  Comienza ingresando ofertas de trabajo para trackear tus aplicaciones
                </p>
                <button
                  onClick={() => setActiveTab('input')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ingresar Primera Oferta
                </button>
              </div>
            ) : (
              <JobApplicationsList 
                jobs={allJobs}
                onEditJob={setEditingJob}
                onDeleteJob={handleDeleteJob}
              />
            )}
          </div>
        )}
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500 border-t border-gray-200 py-8">
        <p>
          Creado para ayudarte a conseguir trabajo • Analiza ofertas y trackea tus aplicaciones
        </p>
      </footer>

      <JobListModal
        isOpen={selectedSkill !== null || selectedCompany !== null}
        onClose={handleCloseModal}
        jobs={filteredJobs}
        skillName={selectedSkill || selectedCompany || ''}
      />

      <EditJobModal
        isOpen={editingJob !== null}
        onClose={() => setEditingJob(null)}
        job={editingJob}
        onSave={handleUpdateJob}
      />

      <ProfileManagementModal
        isOpen={showProfileModal}
        onClose={handleCloseProfileModal}
        editingProfile={managingProfile}
      />
    </div>
  );
}

export default App;
