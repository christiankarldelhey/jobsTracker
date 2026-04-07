import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile } from '../types';
import { getProfiles, createProfile, updateProfile, deleteProfile, getNextProfileColor } from '../services/profileService';
import { useAuth } from './AuthContext';
import { migrateExistingUserToProfiles, checkIfMigrationNeeded } from '../utils/profileMigration';

interface ProfileContextType {
  profiles: Profile[];
  activeProfile: Profile | null;
  isLoading: boolean;
  setActiveProfile: (profile: Profile) => void;
  createNewProfile: (name: string, description?: string) => Promise<Profile>;
  updateExistingProfile: (profile: Profile) => Promise<void>;
  deleteExistingProfile: (id: string) => Promise<void>;
  refreshProfiles: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfiles = async () => {
    if (!isAuthenticated) {
      setProfiles([]);
      setActiveProfileState(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      const needsMigration = await checkIfMigrationNeeded();
      if (needsMigration && user?.userId) {
        console.log('Migration needed, starting automatic migration...');
        const migrationResult = await migrateExistingUserToProfiles(user.userId);
        
        if (migrationResult.success) {
          console.log(`Migration successful: ${migrationResult.jobsUpdated} jobs migrated`);
        } else {
          console.error('Migration failed:', migrationResult.errors);
        }
      }
      
      const fetchedProfiles = await getProfiles();
      
      if (fetchedProfiles.length === 0) {
        const defaultProfile = await createProfile({
          userId: user?.userId || '',
          name: 'My Profile',
          description: 'Default profile',
          color: getNextProfileColor([]),
          isDefault: true,
        });
        setProfiles([defaultProfile]);
        setActiveProfileState(defaultProfile);
      } else {
        setProfiles(fetchedProfiles);
        const defaultProfile = fetchedProfiles.find(p => p.isDefault) || fetchedProfiles[0];
        setActiveProfileState(defaultProfile);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, [isAuthenticated, user]);

  const setActiveProfile = (profile: Profile) => {
    setActiveProfileState(profile);
    localStorage.setItem('activeProfileId', profile.id);
  };

  const createNewProfile = async (name: string, description?: string): Promise<Profile> => {
    try {
      const newProfile = await createProfile({
        userId: user?.userId || '',
        name,
        description,
        color: getNextProfileColor(profiles),
        isDefault: false,
      });
      
      setProfiles([...profiles, newProfile]);
      setActiveProfile(newProfile);
      return newProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const updateExistingProfile = async (profile: Profile): Promise<void> => {
    try {
      const updated = await updateProfile(profile);
      setProfiles(profiles.map(p => p.id === updated.id ? updated : p));
      
      if (activeProfile?.id === updated.id) {
        setActiveProfileState(updated);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const deleteExistingProfile = async (id: string): Promise<void> => {
    if (profiles.length === 1) {
      throw new Error('Cannot delete the last profile');
    }

    try {
      await deleteProfile(id);
      const updatedProfiles = profiles.filter(p => p.id !== id);
      setProfiles(updatedProfiles);
      
      if (activeProfile?.id === id) {
        setActiveProfile(updatedProfiles[0]);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  };

  const refreshProfiles = async () => {
    await loadProfiles();
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        isLoading,
        setActiveProfile,
        createNewProfile,
        updateExistingProfile,
        deleteExistingProfile,
        refreshProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
