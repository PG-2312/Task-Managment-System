from datetime import date

from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(
        source='created_by.full_name', read_only=True
    )
    project_name = serializers.CharField(
        source='project.name', read_only=True
    )

    class Meta:
        model = Task
        fields = [
            'id', 'project', 'project_name', 'created_by',
            'created_by_name', 'title', 'description',
            'status', 'priority', 'due_date',
            'created_at', 'updated_at',
        ]
        read_only_fields = [
            'id', 'created_by', 'created_at', 'updated_at',
        ]

    def validate_due_date(self, value):
        if value and self.instance is None and value < date.today():
            raise serializers.ValidationError(
                'Due date cannot be in the past.'
            )
        return value
