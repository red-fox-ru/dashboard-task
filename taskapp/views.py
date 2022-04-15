from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Todo, Project
from .serializers import ProjectSerializer, TodoSerializer


class TodoModelViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = [permissions.AllowAny]


@api_view(['GET', 'POST', 'DELETE'])
def project_list(request):
    """
    View list, create or delete objects.
    """
    project = Project.objects.all()
    serializer = ProjectSerializer(project, many=True)
    if request.method == 'GET':
        return Response(serializer.data)

    elif request.method == 'DELETE':
        project = Project.objects.filter(complete=True)
        project.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'POST':
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
