from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer
from taskapp.models import Project, Todo
from users.serializers import UserSerializer, ProjectUserSerializer


class ProjectSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    users = ProjectUserSerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'repository', 'users')


class TodoSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(many=False)
    user = UserSerializer(many=False)

    class Meta:
        model = Todo
        fields = ('user', 'project', 'label', 'created_at', 'updated_at', 'is_completed')
