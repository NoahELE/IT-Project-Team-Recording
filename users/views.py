from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'required full information'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'register succeed '}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    # 验证旧密码是否正确
    if not request.user.check_password(old_password):
        return Response({"error": "old password not correct "}, status=400)

    # 更新密码
    request.user.set_password(new_password)
    request.user.save()

    return Response({"message": "successfully changed password"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    return Response({
        'username': request.user.username,
        'email': request.user.email,
    })