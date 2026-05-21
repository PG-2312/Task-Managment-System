import { useState, useEffect } from 'react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

const STATUSES = [
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'IN_REVIEW', label: 'In Review' },
  { value: 'DONE', label: 'Done' },
];

const PRIORITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  task,
  projectId,
}) {
  const isEditing = !!task;
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    due_date: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'TODO',
        priority: task.priority || 'MEDIUM',
        due_date: task.due_date || '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        due_date: '',
      });
    }
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (form.title.length > 500) errs.title = 'Title must be 500 characters or less.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      due_date: form.due_date || null,
    };

    if (isEditing) {
      onSubmit({ id: task.id, project: task.project, ...payload });
    } else {
      onSubmit({ projectId, ...payload });
    }
    onClose();
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-surface-900 border border-surface-700 rounded-2xl shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-800">
          <h2 className="text-lg font-semibold text-surface-100">
            {isEditing ? 'Edit Task' : 'Create Task'}
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
            <label htmlFor="task-title" className="block text-sm font-medium text-surface-300 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title..."
              className={`w-full px-4 py-2.5 bg-surface-800/50 border rounded-lg text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-red-500/50 focus:ring-red-500/50'
                  : 'border-surface-700 focus:ring-primary-500/50 focus:border-primary-500'
              }`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-red-400">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-surface-300 mb-1.5">
              Description
            </label>
            <textarea
              id="task-description"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add details..."
              rows={3}
              className="w-full px-4 py-2.5 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-status" className="block text-sm font-medium text-surface-300 mb-1.5">
                Status
              </label>
              <select
                id="task-status"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="task-priority" className="block text-sm font-medium text-surface-300 mb-1.5">
                Priority
              </label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="task-due-date" className="block text-sm font-medium text-surface-300 mb-1.5">
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={form.due_date}
              onChange={(e) => handleChange('due_date', e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-800/50 border border-surface-700 rounded-lg text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(task.id);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
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
                {isEditing ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
