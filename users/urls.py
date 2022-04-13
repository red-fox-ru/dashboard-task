from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register(r'users', views.AuthorModelViewSet, basename='users')

urlpatterns = [
    path(r'v1/', include(router.urls))
]
