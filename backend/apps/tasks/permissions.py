from rest_framework.permissions import BasePermission


class IsTaskOwner(BasePermission):
    """Only allow the owner of the task's project to access it."""

    def has_object_permission(self, request, view, obj):
        return obj.project.owner == request.user
