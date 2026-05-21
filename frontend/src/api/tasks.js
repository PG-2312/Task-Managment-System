import client from './client';

export const getProjectTasks = (projectId, filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  const query = params.toString();
  const url = `/projects/${projectId}/tasks/${query ? `?${query}` : ''}`;
  return client.get(url).then((r) => r.data);
};

export const getAllTasks = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.project) params.append('project', filters.project);
  const query = params.toString();
  const url = `/tasks/${query ? `?${query}` : ''}`;
  return client.get(url).then((r) => r.data);
};

export const getTask = (id) =>
  client.get(`/tasks/${id}/`).then((r) => r.data);

export const createTask = ({ projectId, ...data }) =>
  client.post(`/projects/${projectId}/tasks/`, data).then((r) => r.data);

export const updateTask = ({ id, ...data }) =>
  client.patch(`/tasks/${id}/`, data).then((r) => r.data);

export const deleteTask = (id) =>
  client.delete(`/tasks/${id}/`).then((r) => r.data);
