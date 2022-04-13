from rest_framework import permissions, viewsets

from users.models import User
from users.serializers import UserSerializer


class AuthorModelViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
