import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  PlusIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useProject, useUpdateProject, useDeleteProject } from '../hooks/useProjects';
import { useProjectTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import FilterBar from '../components/FilterBar';
import ProjectModal from '../components/ProjectModal';
import { KanbanSkeleton } from '../components/LoadingSkeleton';

const STATUSES = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: tasksData, isLoading: tasksLoading } = useProjectTasks(id, filters);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const tasks = tasksData?.results || tasksData || [];

  const tasksByStatus = useMemo(() => {
    const grouped = {};
    STATUSES.forEach((s) => {
      grouped[s] = [];
    });
    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });
    return grouped;
  }, [tasks]);

  const handleTaskSubmit = (data) => {
    if (data.id) {
      updateTask.mutate(data);
    } else {
      createTask.mutate(data);
    }
  };

  const handleTaskClick = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleProjectDelete = () => {
    if (window.confirm('Delete this project and all its tasks?')) {
      deleteProject.mutate(id, {
        onSuccess: () => navigate('/dashboard'),
      });
    }
  };

  if (projectLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KanbanSkeleton />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-semibold text-surface-300 mb-4">
          Project not found
        </h2>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-all"
        >
          <ArrowLeftIcon className="w-4.5 h-4.5" />
        </Link>
        <div
          className="w-3 h-3 rounded-full ring-2 ring-surface-800"
          style={{ backgroundColor: project.color || '#6366f1' }}
        />
        <h1 className="text-xl font-bold text-white flex-1">
          {project.name}
        </h1>
        <div className="flex items-center gap-2">
          <button
            id="edit-project-button"
            onClick={() => setProjectModalOpen(true)}
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-all cursor-pointer"
          >
            <PencilSquareIcon className="w-4.5 h-4.5" />
          </button>
          <button
            id="delete-project-button"
            onClick={handleProjectDelete}
            className="p-2 rounded-lg text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <TrashIcon className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {project.description && (
        <p className="text-sm text-surface-400 mb-6 max-w-2xl leading-relaxed">
          {project.description}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <FilterBar filters={filters} onChange={setFilters} />
        <button
          id="add-task-button"
          onClick={() => {
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all cursor-pointer shrink-0"
        >
          <PlusIcon className="w-4.5 h-4.5" />
          Add Task
        </button>
      </div>

      {tasksLoading ? (
        <KanbanSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasksByStatus[status] || []}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      )}

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        onDelete={(taskId) => deleteTask.mutate(taskId)}
        task={editingTask}
        projectId={id}
      />

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSubmit={(data) => updateProject.mutate(data)}
        project={project}
      />
    </div>
  );
}
