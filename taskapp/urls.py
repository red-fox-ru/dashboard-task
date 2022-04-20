from django.urls import path, include
from rest_framework.routers import DefaultRouter
from taskapp import views

router = DefaultRouter()
router.register(r'todo', views.TodoModelViewSet, basename='todo')

urlpatterns = [
    path('v1/projects/', views.ProjectListAPI.as_view(), name='projects'),
    path('v1/projects/delelte', views.del_all_projects, name='del_projects'),
    path('v1/projects/<int:pk>', views.project_detail, name='project'),
    path(r'v1/', include(router.urls))
]
