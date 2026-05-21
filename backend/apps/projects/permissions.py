from rest_framework.permissions import BasePermission


class IsProjectOwner(BasePermission):
    """Only allow the owner of a project to access it."""

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

