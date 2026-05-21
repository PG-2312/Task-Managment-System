from django.contrib import admin
from django.urls import include, path

from apps.tasks.views import ProjectTaskViewSet
from rest_framework.routers import DefaultRouter

project_tasks_router = DefaultRouter()
project_tasks_router.register(
    'tasks', ProjectTaskViewSet, basename='project-tasks'
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.users.urls')),
    path('api/v1/projects/', include('apps.projects.urls')),
    path('api/v1/tasks/', include('apps.tasks.urls')),
    path(
        'api/v1/projects/<uuid:project_id>/',
        include(project_tasks_router.urls),
    ),
]
