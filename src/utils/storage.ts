import { JobPosting } from '../types';
import * as apiService from '../services/apiService';

const STORAGE_KEY = 'frontend-job-skills-history';

// Guardar oferta (usa DynamoDB si está disponible, sino localStorage)
export const saveJobPosting = async (posting: JobPosting): Promise<void> => {
  try {
    // Intentar guardar en DynamoDB
    await apiService.createJobPosting(posting);
  } catch (error) {
    console.error('Error saving to DynamoDB, falling back to localStorage:', error);
    // Fallback a localStorage
    const history = getJobPostingsHistorySync();
    history.push(posting);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
};

// Obtener historial (usa DynamoDB si está disponible, sino localStorage)
export const getJobPostingsHistory = async (): Promise<JobPosting[]> => {
  try {
    // Intentar obtener de DynamoDB
    const postings = await apiService.getJobPostings();
    return postings;
  } catch (error) {
    console.error('Error fetching from DynamoDB, falling back to localStorage:', error);
    // Fallback a localStorage
    return getJobPostingsHistorySync();
  }
};

// Versión síncrona para compatibilidad con código existente
export const getJobPostingsHistorySync = (): JobPosting[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((p: any) => ({
      ...p,
      analyzedAt: new Date(p.analyzedAt),
      postingDate: p.postingDate ? new Date(p.postingDate) : undefined,
      applicationDate: p.applicationDate ? new Date(p.applicationDate) : undefined,
      applied: p.applied || false,
    }));
  } catch (error) {
    console.error('Error loading job postings history:', error);
    return [];
  }
};

// Actualizar oferta (usa DynamoDB si está disponible, sino localStorage)
export const updateJobPosting = async (updatedPosting: JobPosting): Promise<void> => {
  try {
    // Intentar actualizar en DynamoDB
    await apiService.updateJobPosting(updatedPosting);
  } catch (error) {
    console.error('Error updating in DynamoDB, falling back to localStorage:', error);
    // Fallback a localStorage
    const history = getJobPostingsHistorySync();
    const index = history.findIndex(p => p.id === updatedPosting.id);
    
    if (index !== -1) {
      history[index] = updatedPosting;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }
};

// Eliminar una oferta individual (usa DynamoDB si está disponible, sino localStorage)
export const deleteJobPosting = async (id: string): Promise<void> => {
  try {
    // Intentar eliminar en DynamoDB
    await apiService.deleteJobPosting(id);
  } catch (error) {
    console.error('Error deleting from DynamoDB, falling back to localStorage:', error);
    // Fallback a localStorage
    const history = getJobPostingsHistorySync();
    const filtered = history.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};

// Limpiar historial (usa DynamoDB si está disponible, sino localStorage)
export const clearHistory = async (): Promise<void> => {
  try {
    // Intentar limpiar en DynamoDB
    await apiService.deleteAllJobPostings();
  } catch (error) {
    console.error('Error clearing DynamoDB, falling back to localStorage:', error);
  } finally {
    // Siempre limpiar localStorage también
    localStorage.removeItem(STORAGE_KEY);
  }
};

// Obtener todas las skills del historial
export const getAllSkillsFromHistory = async (): Promise<string[][]> => {
  const history = await getJobPostingsHistory();
  return history.map(posting => posting.skills);
};
