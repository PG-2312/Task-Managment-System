from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from apps.projects.models import Project

from .models import Task
from .permissions import IsTaskOwner
from .serializers import TaskSerializer


class ProjectTaskViewSet(viewsets.ModelViewSet):
    """Tasks nested under a specific project: /projects/:id/tasks/"""
    serializer_class = TaskSerializer
    permission_classes = [IsTaskOwner]

    def _get_project(self):
        project_id = self.kwargs['project_id']
        try:
            project = Project.objects.get(
                id=project_id, owner=self.request.user
            )
        except Project.DoesNotExist:
            raise NotFound('Project not found.')
        return project

    def get_queryset(self):
        project = self._get_project()
        qs = (
            Task.objects
            .filter(project=project)
            .select_related('project', 'created_by')
        )
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        priority = self.request.query_params.get('priority')
        if priority:
            qs = qs.filter(priority=priority)
        return qs

    def perform_create(self, serializer):
        project = self._get_project()
        serializer.save(
            project=project,
            created_by=self.request.user,
        )


class TaskViewSet(viewsets.ModelViewSet):
    """Standalone task endpoints: /tasks/ and /tasks/:id/"""
    serializer_class = TaskSerializer
    permission_classes = [IsTaskOwner]

    def get_queryset(self):
        qs = (
            Task.objects
            .filter(project__owner=self.request.user)
            .select_related('project', 'created_by')
        )
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        priority = self.request.query_params.get('priority')
        if priority:
            qs = qs.filter(priority=priority)
        project = self.request.query_params.get('project')
        if project:
            qs = qs.filter(project_id=project)
        return qs

    def perform_create(self, serializer):
        project_id = self.request.data.get('project')
        try:
            project = Project.objects.get(
                id=project_id, owner=self.request.user
            )
        except Project.DoesNotExist:
            raise NotFound('Project not found.')
        serializer.save(
            project=project,
            created_by=self.request.user,
        )
