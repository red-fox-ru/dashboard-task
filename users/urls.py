from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register(r'users', views.UserModelViewSet, basename='users')

urlpatterns = [
    path(r'v1/', include(router.urls)),
    path('login/', views.GetTokenView.as_view(), name='token_obtain_pair'),
    path('registration/', views.registration, name='registration'),
]
