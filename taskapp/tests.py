import json

from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient

from taskapp.models import Project
from taskapp.views import ProjectListAPI
from users.models import User


class TestProjectViewSet(TestCase):
    def test_get_project_list(self):
        user = User.objects.get(username='moder')
        factory = APIRequestFactory()
        request = factory.get('/api/v1/projects/')
        force_authenticate(request, user=user)
        view = ProjectListAPI.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_list_unauthorized(self):
        factory = APIRequestFactory()
        request = factory.get('/api/v1/projects/')
        force_authenticate(request, user=None)
        view = ProjectListAPI.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TaskTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='user')
        self.title = 'Project'
        self.description = 'Project description'
        self.users = [self.user]
        self.client = APIClient()

        self.project = Project.objects.create(title=self.title, description=self.description)

    def test_get_project_detail(self):
        project = mixer.blend(Project, title=self.title, description=self.description)
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/v1/projects/{project.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_project = json.loads(response.content)
        self.assertEqual(response_project['title'], self.title)

    def test_get_project_detail_unauthorized(self):
        project = mixer.blend(Project, title=self.title, description=self.description)
        response = self.client.get(f'/api/v1/projects/{project.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
