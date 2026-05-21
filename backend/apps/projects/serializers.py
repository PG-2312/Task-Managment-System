import re

from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    task_count = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'color',
            'task_count', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_color(self, value):
        if not re.match(r'^#[0-9A-Fa-f]{6}$', value):
            raise serializers.ValidationError(
                'Color must be a valid hex code (e.g. #6366f1).'
            )
        return value
