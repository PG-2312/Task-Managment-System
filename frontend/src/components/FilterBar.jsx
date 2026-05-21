import { ChevronDownIcon } from '@heroicons/react/24/outline';

const STATUSES = [
  { value: '', label: 'All Statuses' },
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'IN_REVIEW', label: 'In Review' },
  { value: 'DONE', label: 'Done' },
];

const PRIORITIES = [
  { value: '', label: 'All Priorities' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export default function FilterBar({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <select
          id="filter-status"
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="appearance-none bg-surface-800/50 border border-surface-700 text-surface-200 text-sm font-medium rounded-lg pl-4 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="w-4 h-4 text-surface-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          id="filter-priority"
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="appearance-none bg-surface-800/50 border border-surface-700 text-surface-200 text-sm font-medium rounded-lg pl-4 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer"
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="w-4 h-4 text-surface-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {(filters.status || filters.priority) && (
        <button
          onClick={() => onChange({ status: '', priority: '' })}
          className="text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
