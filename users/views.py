from django.contrib.auth.hashers import make_password
from rest_framework import permissions, viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import User
from users.serializers import UserSerializer, GetPairTokenSerializer


class GetTokenView(TokenObtainPairView):
    serializer_class = GetPairTokenSerializer
    token_obtain_pair = TokenObtainPairView.as_view()


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['post'], name='registration')
    def registration(self, request):
        data = request.data
        try:
            user = User.objects.create(
                password=make_password(data['password'])
            )
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data['username'])
        except:
            message = {'detail': f'User with this {data["username"]} already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
