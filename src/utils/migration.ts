import { JobPosting } from '../types';
import * as apiService from '../services/apiService';

const STORAGE_KEY = 'frontend-job-skills-history';

// Función para migrar datos de localStorage a DynamoDB
export const migrateLocalStorageToDynamoDB = async (): Promise<{ success: number; failed: number; total: number }> => {
  try {
    // Obtener datos de localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('No hay datos en localStorage para migrar');
      return { success: 0, failed: 0, total: 0 };
    }

    const parsed = JSON.parse(stored);
    const localJobs: JobPosting[] = parsed.map((p: any) => ({
      ...p,
      analyzedAt: new Date(p.analyzedAt),
      postingDate: p.postingDate ? new Date(p.postingDate) : undefined,
      applicationDate: p.applicationDate ? new Date(p.applicationDate) : undefined,
      applied: p.applied || false,
    }));

    console.log(`Iniciando migración de ${localJobs.length} ofertas...`);

    let success = 0;
    let failed = 0;

    // Subir cada oferta a DynamoDB
    for (const job of localJobs) {
      try {
        await apiService.createJobPosting(job);
        success++;
        console.log(`✓ Migrada: ${job.companyName || 'Sin nombre'} (${job.id})`);
      } catch (error) {
        failed++;
        console.error(`✗ Error migrando ${job.id}:`, error);
      }
    }

    console.log(`Migración completada: ${success} exitosas, ${failed} fallidas de ${localJobs.length} totales`);

    return {
      success,
      failed,
      total: localJobs.length
    };
  } catch (error) {
    console.error('Error durante la migración:', error);
    throw error;
  }
};

// Función para verificar si hay datos en localStorage que no están en DynamoDB
export const checkLocalStorageData = (): { hasData: boolean; count: number } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { hasData: false, count: 0 };
    }

    const parsed = JSON.parse(stored);
    return {
      hasData: parsed.length > 0,
      count: parsed.length
    };
  } catch (error) {
    console.error('Error checking localStorage:', error);
    return { hasData: false, count: 0 };
  }
};
