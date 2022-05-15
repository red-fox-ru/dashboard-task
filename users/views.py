from django.contrib.auth.hashers import make_password
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, viewsets, mixins, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import User
from users.serializers import UserSerializer, GetPairTokenSerializer, RegisterUserSerializer, UserSerializerWithToken


class GetTokenView(TokenObtainPairView):
    serializer_class = GetPairTokenSerializer
    token_obtain_pair = TokenObtainPairView.as_view()


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        if self.action in ['destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['GET', 'PUT'], name='edit_profile')
    def profile(self, request):
        user = request.user
        if request.method == 'PUT':
            serializer = UserSerializerWithToken(user, many=False)
            data = request.data
            user.username = data['username']
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.email = data['email']
            if data['password'] != '':
                user.password = make_password(data['password'])
            user.save()
            return Response(
                serializer.data['email'],
                serializer.data['first_name'],
                serializer.data['last_name']
            )
        elif request.method == 'GET':
            serializer = self.serializer_class(user, many=False)

            return Response({'id': serializer.data['id'],
                             'email': serializer.data['email'],
                             'first_name': serializer.data['first_name'],
                             'last_name': serializer.data['last_name']})


@swagger_auto_schema(methods=['post'], request_body=RegisterUserSerializer)
@api_view(['POST'])
def registration(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=make_password(data['password'])
        )
        serializer = RegisterUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': f'User with this {data["username"]} already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
