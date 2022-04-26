from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from .models import Todo, Project
from .serializers import ProjectSerializer, TodoSerializer


class StandardProjectsSetPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'page': self.page.number,
            'pages': self.page.paginator.num_pages,
            'results': data
        })


class StandardTodoSetPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'page': self.page.number,
            'pages': self.page.paginator.num_pages,
            'results': data
        })


class TodoFilter(filters.FilterSet):
    date_of = filters.DateFilter('created_at', lookup_expr='gte')
    date_before = filters.DateFilter('created_at', lookup_expr='lte')

    class Meta:
        model = Todo
        fields = ['user', 'project']


class TodoModelViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    pagination_class = StandardTodoSetPagination
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        todo = Todo.objects.get(id=serializer.data['user']['id'])
        todo.is_deleted = True
        todo.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class ProjectListAPI(APIView):
    project = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = StandardProjectsSetPagination
    title_param = openapi.Parameter('title', in_=openapi.IN_QUERY, description='Enter part or all of the name',
                                    type=openapi.TYPE_STRING)

    @swagger_auto_schema(method='get', manual_parameters=[title_param])
    @action(detail=False, methods=['get'])
    def get(self, request):
        title = self.request.query_params.get('title')
        if title is not None:
            self.project = self.project.filter(title__icontains=title)

        page = self.paginate_queryset(self.project)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(self.project, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        # data["users"] = [User.objects.get(int(el)) for el in data["users"]]
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)


@api_view(['DELETE'])
@permission_classes([permissions.IsAdminUser])
def del_all_projects(request):
    """
    View delete objects.
    """
    project = Project.objects.all()
    project.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, pk):
    """
    Retrieve, update or delete object.
    """
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
