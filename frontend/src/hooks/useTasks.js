import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as tasksApi from '../api/tasks';

export function useProjectTasks(projectId, filters = {}) {
  return useQuery({
    queryKey: ['project-tasks', projectId, filters],
    queryFn: () => tasksApi.getProjectTasks(projectId, filters),
    enabled: !!projectId,
  });
}

export function useAllTasks(filters = {}) {
  return useQuery({
    queryKey: ['all-tasks', filters],
    queryFn: () => tasksApi.getAllTasks(filters),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks', data.project] });
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Task created!');
    },
    onError: (error) => {
      const errors = error.response?.data;
      if (errors) {
        const firstError = Object.values(errors).flat()[0];
        toast.error(typeof firstError === 'string' ? firstError : 'Failed to create task.');
      } else {
        toast.error('Failed to create task.');
      }
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.updateTask,
    onMutate: async (updatedTask) => {
      const key = ['project-tasks', updatedTask.project];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old) => {
        if (!old?.results) return old;
        return {
          ...old,
          results: old.results.map((t) =>
            t.id === updatedTask.id ? { ...t, ...updatedTask } : t
          ),
        };
      });

      return { previous, key };
    },
    onError: (err, vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.key, context.previous);
      }
      toast.error('Failed to update task.');
    },
    onSettled: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['project-tasks', data.project] });
      }
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onSuccess: () => {
      toast.success('Task updated!');
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Task deleted!');
    },
    onError: () => {
      toast.error('Failed to delete task.');
    },
  });
}
