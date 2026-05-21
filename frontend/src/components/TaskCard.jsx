import { CalendarIcon } from '@heroicons/react/24/outline';

const PRIORITY_STYLES = {
  LOW: 'bg-surface-700/50 text-surface-300 border-surface-600',
  MEDIUM: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  URGENT: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const STATUS_LABELS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
};

export default function TaskCard({ task, onClick }) {
  const priorityClass = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.MEDIUM;
  const isOverdue =
    task.due_date &&
    task.status !== 'DONE' &&
    new Date(task.due_date) < new Date();

  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div
      id={`task-card-${task.id}`}
      onClick={() => onClick?.(task)}
      className="group rounded-lg border border-surface-800 bg-surface-900/60 hover:bg-surface-800/60 p-4 cursor-pointer transition-all duration-200 hover:border-surface-700 hover:shadow-lg hover:shadow-black/10 animate-fade-in"
    >
      <h4 className="text-sm font-medium text-surface-200 group-hover:text-white transition-colors mb-2 line-clamp-2 leading-snug">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-xs text-surface-500 line-clamp-1 mb-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider border ${priorityClass}`}
        >
          {task.priority}
        </span>

        {formattedDate && (
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium ${
              isOverdue
                ? 'text-red-400'
                : 'text-surface-500'
            }`}
          >
            <CalendarIcon className="w-3 h-3" />
            {formattedDate}
            {isOverdue && <span className="text-red-500">!</span>}
          </span>
        )}
      </div>
    </div>
  );
}

export { PRIORITY_STYLES, STATUS_LABELS };
