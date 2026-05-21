import { useState } from 'react';
import {
  PlusIcon,
  RectangleStackIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../hooks/useProjects';
import { useAllTasks } from '../hooks/useTasks';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { CardSkeleton, StatSkeleton } from '../components/LoadingSkeleton';

const STAT_CONFIG = [
  {
    key: 'todo',
    label: 'To Do',
    status: 'TODO',
    icon: RectangleStackIcon,
    gradient: 'from-surface-600 to-surface-700',
    textColor: 'text-surface-300',
  },
  {
    key: 'in_progress',
    label: 'In Progress',
    status: 'IN_PROGRESS',
    icon: ArrowPathIcon,
    gradient: 'from-blue-600 to-blue-700',
    textColor: 'text-blue-400',
  },
  {
    key: 'in_review',
    label: 'In Review',
    status: 'IN_REVIEW',
    icon: ClockIcon,
    gradient: 'from-amber-600 to-amber-700',
    textColor: 'text-amber-400',
  },
  {
    key: 'done',
    label: 'Done',
    status: 'DONE',
    icon: CheckCircleIcon,
    gradient: 'from-emerald-600 to-emerald-700',
    textColor: 'text-emerald-400',
  },
];

export default function Dashboard() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { data: projectsData, isLoading: projectsLoading } = useProjects();
  const { data: tasksData, isLoading: tasksLoading } = useAllTasks();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  const projects = projectsData?.results || projectsData || [];
  const allTasks = tasksData?.results || tasksData || [];

  const statusCounts = STAT_CONFIG.map((s) => ({
    ...s,
    count: allTasks.filter((t) => t.status === s.status).length,
  }));

  const handleProjectSubmit = (data) => {
    if (data.id) {
      updateProject.mutate(data);
    } else {
      createProject.mutate(data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-surface-400 mt-1">
            Overview of your projects and tasks
          </p>
        </div>
        <button
          id="new-project-button"
          onClick={() => {
            setEditingProject(null);
            setProjectModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all cursor-pointer"
        >
          <PlusIcon className="w-4.5 h-4.5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {tasksLoading
          ? [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
          : statusCounts.map((stat) => (
              <div
                key={stat.key}
                className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 animate-fade-in hover:border-surface-700 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                  >
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <p className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.count}
                </p>
              </div>
            ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-surface-200 mb-1">Projects</h2>
        <p className="text-sm text-surface-500">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      {projectsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-surface-800/50 flex items-center justify-center mb-4">
            <RectangleStackIcon className="w-8 h-8 text-surface-600" />
          </div>
          <h3 className="text-lg font-semibold text-surface-300 mb-2">
            No projects yet
          </h3>
          <p className="text-sm text-surface-500 mb-6 max-w-sm">
            Create your first project to start organizing your tasks and tracking progress.
          </p>
          <button
            onClick={() => {
              setEditingProject(null);
              setProjectModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/20 transition-all cursor-pointer"
          >
            <PlusIcon className="w-4.5 h-4.5" />
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleProjectSubmit}
        project={editingProject}
      />
    </div>
  );
}
