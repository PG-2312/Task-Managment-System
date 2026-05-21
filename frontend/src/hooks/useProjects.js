import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as projectsApi from '../api/projects';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getProjects,
  });
}

export function useProject(id) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created!');
    },
    onError: (error) => {
      const msg =
        error.response?.data?.name?.[0] ||
        error.response?.data?.detail ||
        'Failed to create project.';
      toast.error(msg);
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.updateProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', data.id] });
      toast.success('Project updated!');
    },
    onError: () => {
      toast.error('Failed to update project.');
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted!');
    },
    onError: () => {
      toast.error('Failed to delete project.');
    },
  });
}
