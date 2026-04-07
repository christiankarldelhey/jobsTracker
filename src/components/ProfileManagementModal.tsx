import { useState, useEffect } from 'react';
import { X, FolderKanban } from 'lucide-react';
import { Profile } from '../types';
import { useProfile } from '../contexts/ProfileContext';

interface ProfileManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProfile?: Profile;
}

export const ProfileManagementModal = ({ isOpen, onClose, editingProfile }: ProfileManagementModalProps) => {
  const { createNewProfile, updateExistingProfile } = useProfile();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name);
      setDescription(editingProfile.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [editingProfile, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('El nombre del profile es requerido');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingProfile) {
        await updateExistingProfile({
          ...editingProfile,
          name: name.trim(),
          description: description.trim() || undefined,
        });
      } else {
        await createNewProfile(name.trim(), description.trim() || undefined);
      }
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error al guardar el profile. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {editingProfile ? 'Editar Profile' : 'Crear Nuevo Profile'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Profile *
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Vue Frontend Jobs, React Projects..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              maxLength={50}
            />
          </div>

          <div>
            <label htmlFor="profile-description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              id="profile-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Ofertas de trabajo relacionadas con Vue.js y frontend..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxLength={200}
            />
          </div>

          {editingProfile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Color:</strong> El color del profile se asignó automáticamente y no puede ser cambiado.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : editingProfile ? 'Guardar Cambios' : 'Crear Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
