import { useState, useRef, useEffect } from 'react';
import { FolderKanban, ChevronDown, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import { Profile } from '../types';

interface ProfileSelectorProps {
  onManageProfile: (profile?: Profile) => void;
}

export const ProfileSelector = ({ onManageProfile }: ProfileSelectorProps) => {
  const { profiles, activeProfile, setActiveProfile, deleteExistingProfile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileChange = (profile: Profile) => {
    setActiveProfile(profile);
    setIsOpen(false);
  };

  const handleDeleteProfile = async (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    
    if (profiles.length === 1) {
      alert('No puedes eliminar el último profile');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este profile? Todas las ofertas asociadas se perderán.')) {
      try {
        await deleteExistingProfile(profileId);
      } catch (error) {
        alert('Error al eliminar el profile');
      }
    }
  };

  const handleEditProfile = (e: React.MouseEvent, profile: Profile) => {
    e.stopPropagation();
    setIsOpen(false);
    onManageProfile(profile);
  };

  const handleCreateNew = () => {
    setIsOpen(false);
    onManageProfile();
  };

  if (!activeProfile) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: activeProfile.color }}
        />
        <FolderKanban className="w-4 h-4 text-gray-600" />
        <span className="font-medium text-gray-900">{activeProfile.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-200 bg-gray-50">
            <p className="text-xs font-semibold text-gray-600 uppercase px-2">Mis Profiles</p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeProfile.id === profile.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleProfileChange(profile)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: profile.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{profile.name}</p>
                    {profile.description && (
                      <p className="text-xs text-gray-500 truncate">{profile.description}</p>
                    )}
                  </div>
                  {activeProfile.id === profile.id && (
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={(e) => handleEditProfile(e, profile)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Editar profile"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  {profiles.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteProfile(e, profile.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Eliminar profile"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleCreateNew}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Crear Nuevo Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
