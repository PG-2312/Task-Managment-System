from django.db.models import Count
from rest_framework import viewsets

from .models import Project
from .permissions import IsProjectOwner
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectOwner]

    def get_queryset(self):
        return (
            Project.objects
            .filter(owner=self.request.user)
            .select_related('owner')
            .annotate(task_count=Count('tasks'))
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
