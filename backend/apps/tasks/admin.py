from django.contrib import admin

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'project', 'status', 'priority',
        'due_date', 'created_by', 'created_at',
    ]
    list_filter = ['status', 'priority', 'created_at']
    search_fields = ['title', 'project__name', 'created_by__email']
