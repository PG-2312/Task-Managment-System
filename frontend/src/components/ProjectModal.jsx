import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const COLOR_PRESETS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
  '#ef4444', '#f97316', '#f59e0b', '#22c55e',
  '#14b8a6', '#06b6d4', '#3b82f6', '#64748b',
];

export default function ProjectModal({ isOpen, onClose, onSubmit, project }) {
  const isEditing = !!project;
  const [form, setForm] = useState({
    name: '',
    description: '',
    color: '#6366f1',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || '',
        description: project.description || '',
        color: project.color || '#6366f1',
      });
    } else {
      setForm({ name: '', description: '', color: '#6366f1' });
    }
    setErrors({});
  }, [project, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Project name is required.';
    if (form.name.length > 200) errs.name = 'Name must be 200 characters or less.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      onSubmit({ id: project.id, ...form });
    } else {
      onSubmit(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-surface-900 border border-surface-700 rounded-2xl shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-800">
          <h2 className="text-lg font-semibold text-surface-100">
            {isEditing ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-all cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-surface-300 mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="project-name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="My Project"
              className={`w-full px-4 py-2.5 bg-surface-800/50 border rounded-lg text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-red-500/50 focus:ring-red-500/50'
                  : 'border-surface-700 focus:ring-primary-500/50 focus:border-primary-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="project-description" className="block text-sm font-medium text-surface-300 mb-1.5">
              Description
            </label>
            <textarea
              id="project-description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What is this project about?"
              rows={3}
              className="w-full px-4 py-2.5 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2.5">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, color }))}
                  className={`w-8 h-8 rounded-lg transition-all cursor-pointer hover:scale-110 ${
                    form.color === color
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-surface-900 scale-110'
                      : 'ring-1 ring-surface-700'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-surface-300 hover:text-surface-100 hover:bg-surface-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
