import json

from django.test import TestCase
from django.urls import reverse
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient

from users.models import User
from users.views import UserModelViewSet


class UserTests(APITestCase):
    def setUp(self):
        self.username = 'user'
        self.password = 'user'
        self.is_admin = False
        self.data = {
            'username': self.username,
            'password': self.password,
            'is_staff': self.is_admin
        }
        self.client = APIClient()

    def test_current_user(self):
        url = reverse('token_obtain_pair')
        user = User.objects.create_user(username=self.username, password=self.password, is_staff=self.is_admin)
        self.assertEqual(user.is_active, 1, 'Active User')

        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)

        token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        response = self.client.post(reverse('token_obtain_pair'),
                                    data={'username': self.username, 'password': self.password, 'format': 'json'})
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)

    def test_user_not_valid(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(url, username='avesalom', password='')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_user_detail(self):
        user = mixer.blend(User, username=self.username)
        self.client.force_authenticate(user=user)
        response = self.client.get(f'/api/v1/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_book = json.loads(response.content)
        self.assertEqual(response_book['username'], 'user')

    def test_get_user_detail_unauthorized(self):
        user = mixer.blend(User, username='user')
        response = self.client.get(f'/api/v1/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestUserViewSet(TestCase):
    def setUp(self):
        self.client = APIRequestFactory()

    def test_get_user_list(self):
        user = User.objects.create_user(username='moder')
        request = self.client.get('/api/v1/users/')
        force_authenticate(request, user=user)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
