import { Link } from 'react-router-dom';
import { ClockIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

export default function ProjectCard({ project }) {
  const taskCount = project.task_count ?? 0;
  const updatedAt = new Date(project.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      to={`/projects/${project.id}`}
      id={`project-card-${project.id}`}
      className="group block rounded-xl border border-surface-800 bg-surface-900/50 hover:bg-surface-800/50 transition-all duration-300 hover:border-surface-700 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 overflow-hidden animate-fade-in"
    >
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: project.color || '#6366f1' }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-surface-100 group-hover:text-white transition-colors line-clamp-1">
            {project.name}
          </h3>
          <div
            className="w-3 h-3 rounded-full shrink-0 mt-1.5 ring-2 ring-surface-800"
            style={{ backgroundColor: project.color || '#6366f1' }}
          />
        </div>

        {project.description && (
          <p className="text-sm text-surface-400 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-surface-500">
          <span className="flex items-center gap-1.5">
            <RectangleStackIcon className="w-3.5 h-3.5" />
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5" />
            {updatedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}
