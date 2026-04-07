import { createProfile } from '../services/profileService';
import { getJobPostings, updateJobPosting } from '../services/apiService';
import { Profile } from '../types';

interface MigrationResult {
  success: boolean;
  profileCreated?: Profile;
  jobsUpdated: number;
  jobsFailed: number;
  errors: string[];
}

export const migrateExistingUserToProfiles = async (userId: string): Promise<MigrationResult> => {
  const result: MigrationResult = {
    success: false,
    jobsUpdated: 0,
    jobsFailed: 0,
    errors: [],
  };

  try {
    console.log('Starting profile migration for user:', userId);

    const existingJobs = await getJobPostings();
    
    if (existingJobs.length === 0) {
      console.log('No existing jobs to migrate');
      result.success = true;
      return result;
    }

    console.log(`Found ${existingJobs.length} existing jobs to migrate`);

    const vueProfile = await createProfile({
      userId,
      name: 'Vue Frontend Jobs',
      description: 'Migrated from previous job collection',
      color: '#3B82F6',
      isDefault: true,
    });

    console.log('Created profile:', vueProfile.id);
    result.profileCreated = vueProfile;

    for (const job of existingJobs) {
      try {
        const updatedJob = {
          ...job,
          profileId: vueProfile.id,
          postingDate: job.applicationDate,
          applicationDate: job.postingDate,
        };

        await updateJobPosting(updatedJob);
        result.jobsUpdated++;
        console.log(`Migrated job ${job.id} - swapped dates`);
      } catch (error) {
        result.jobsFailed++;
        const errorMsg = `Failed to migrate job ${job.id}: ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    result.success = result.jobsUpdated > 0;
    console.log(`Migration completed: ${result.jobsUpdated} jobs updated, ${result.jobsFailed} failed`);

    return result;
  } catch (error) {
    console.error('Migration failed:', error);
    result.errors.push(`Migration failed: ${error}`);
    return result;
  }
};

export const checkIfMigrationNeeded = async (): Promise<boolean> => {
  try {
    const jobs = await getJobPostings();
    
    if (jobs.length === 0) {
      return false;
    }

    const hasJobWithoutProfile = jobs.some(job => !job.profileId);
    return hasJobWithoutProfile;
  } catch (error) {
    console.error('Error checking migration status:', error);
    return false;
  }
};
