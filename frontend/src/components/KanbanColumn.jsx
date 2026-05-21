import TaskCard from './TaskCard';

const COLUMN_COLORS = {
  TODO: 'from-surface-500 to-surface-600',
  IN_PROGRESS: 'from-blue-500 to-blue-600',
  IN_REVIEW: 'from-amber-500 to-amber-600',
  DONE: 'from-emerald-500 to-emerald-600',
};

const COLUMN_LABELS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
};

export default function KanbanColumn({ status, tasks, onTaskClick }) {
  const colorClass = COLUMN_COLORS[status] || COLUMN_COLORS.TODO;
  const label = COLUMN_LABELS[status] || status;

  return (
    <div className="flex flex-col rounded-xl border border-surface-800 bg-surface-900/30 min-h-[300px]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-800">
        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${colorClass}`} />
        <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
          {label}
        </h3>
        <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-surface-800 text-xs font-bold text-surface-400">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 p-3 space-y-2.5 overflow-y-auto max-h-[calc(100vh-320px)]">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-xs text-surface-600">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))
        )}
      </div>
    </div>
  );
}
