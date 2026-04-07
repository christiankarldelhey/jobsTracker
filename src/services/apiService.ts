import { generateClient } from 'aws-amplify/api';
import { JobPosting } from '../types';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const client = generateClient();

// Crear una nueva oferta de trabajo
export const createJobPosting = async (posting: JobPosting): Promise<JobPosting> => {
  try {
    const input: any = {
      userId: posting.userId || '',
      text: posting.text,
      analyzedAt: posting.analyzedAt.toISOString(),
      postingDate: posting.postingDate?.toISOString(),
      companyName: posting.companyName,
      url: posting.url,
      skills: posting.skills,
      requiresDegree: posting.requiresDegree,
      workMode: posting.workMode,
      location: posting.location,
      applied: posting.applied,
      applicationDate: posting.applicationDate?.toISOString(),
      notes: posting.notes,
    };
    
    if (posting.profileId) {
      input.profileId = posting.profileId;
    }

    const response: any = await client.graphql({
      query: mutations.createJobPosting,
      variables: { input },
    });

    const created = response.data.createJobPosting;
    return {
      ...created,
      analyzedAt: new Date(created.analyzedAt),
      postingDate: created.postingDate ? new Date(created.postingDate) : undefined,
      applicationDate: created.applicationDate ? new Date(created.applicationDate) : undefined,
    };
  } catch (error) {
    console.error('Error creating job posting:', error);
    throw error;
  }
};

// Obtener todas las ofertas del usuario actual
export const getJobPostings = async (): Promise<JobPosting[]> => {
  try {
    const response: any = await client.graphql({
      query: queries.listJobPostings,
    });

    const items = response.data.listJobPostings.items;
    return items.map((item: any) => ({
      ...item,
      analyzedAt: new Date(item.analyzedAt),
      postingDate: item.postingDate ? new Date(item.postingDate) : undefined,
      applicationDate: item.applicationDate ? new Date(item.applicationDate) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching job postings:', error);
    throw error;
  }
};

// Actualizar una oferta existente
export const updateJobPosting = async (posting: JobPosting): Promise<JobPosting> => {
  try {
    const input: any = {
      id: posting.id,
      userId: posting.userId,
      text: posting.text,
      analyzedAt: posting.analyzedAt.toISOString(),
      postingDate: posting.postingDate?.toISOString(),
      companyName: posting.companyName,
      url: posting.url,
      skills: posting.skills,
      requiresDegree: posting.requiresDegree,
      workMode: posting.workMode,
      location: posting.location,
      applied: posting.applied,
      applicationDate: posting.applicationDate?.toISOString(),
      notes: posting.notes,
    };
    
    if (posting.profileId) {
      input.profileId = posting.profileId;
    }

    const response: any = await client.graphql({
      query: mutations.updateJobPosting,
      variables: { input },
    });

    const updated = response.data.updateJobPosting;
    return {
      ...updated,
      analyzedAt: new Date(updated.analyzedAt),
      postingDate: updated.postingDate ? new Date(updated.postingDate) : undefined,
      applicationDate: updated.applicationDate ? new Date(updated.applicationDate) : undefined,
    };
  } catch (error) {
    console.error('Error updating job posting:', error);
    throw error;
  }
};

// Eliminar una oferta
export const deleteJobPosting = async (id: string): Promise<void> => {
  try {
    await client.graphql({
      query: mutations.deleteJobPosting,
      variables: { input: { id } },
    });
  } catch (error) {
    console.error('Error deleting job posting:', error);
    throw error;
  }
};

// Eliminar todas las ofertas del usuario
export const deleteAllJobPostings = async (): Promise<void> => {
  try {
    const postings = await getJobPostings();
    await Promise.all(postings.map(posting => deleteJobPosting(posting.id)));
  } catch (error) {
    console.error('Error deleting all job postings:', error);
    throw error;
  }
};
