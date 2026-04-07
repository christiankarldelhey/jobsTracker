import { generateClient } from 'aws-amplify/api';
import { Profile } from '../types';
import * as queries from '../graphql/profileQueries';
import * as mutations from '../graphql/profileMutations';

const client = generateClient();

const PROFILE_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
];

export const getNextProfileColor = (existingProfiles: Profile[]): string => {
  const usedColors = existingProfiles.map(p => p.color);
  const availableColor = PROFILE_COLORS.find(color => !usedColors.includes(color));
  return availableColor || PROFILE_COLORS[existingProfiles.length % PROFILE_COLORS.length];
};

export const createProfile = async (profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> => {
  try {
    const input = {
      userId: profile.userId,
      name: profile.name,
      description: profile.description,
      color: profile.color,
      isDefault: profile.isDefault,
      createdAt: new Date().toISOString(),
    };

    const response: any = await client.graphql({
      query: mutations.createProfile,
      variables: { input },
    });

    const created = response.data.createProfile;
    return {
      ...created,
      createdAt: new Date(created.createdAt),
    };
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const response: any = await client.graphql({
      query: queries.listProfiles,
    });

    const items = response.data.listProfiles.items;
    return items.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const updateProfile = async (profile: Profile): Promise<Profile> => {
  try {
    const input = {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      description: profile.description,
      color: profile.color,
      isDefault: profile.isDefault,
    };

    const response: any = await client.graphql({
      query: mutations.updateProfile,
      variables: { input },
    });

    const updated = response.data.updateProfile;
    return {
      ...updated,
      createdAt: new Date(updated.createdAt),
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const deleteProfile = async (id: string): Promise<void> => {
  try {
    await client.graphql({
      query: mutations.deleteProfile,
      variables: { input: { id } },
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const setDefaultProfile = async (profileId: string, allProfiles: Profile[]): Promise<void> => {
  try {
    await Promise.all(
      allProfiles.map(async (profile) => {
        if (profile.isDefault && profile.id !== profileId) {
          await updateProfile({ ...profile, isDefault: false });
        } else if (profile.id === profileId && !profile.isDefault) {
          await updateProfile({ ...profile, isDefault: true });
        }
      })
    );
  } catch (error) {
    console.error('Error setting default profile:', error);
    throw error;
  }
};
