from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from .models import TaskManager

import requests

class GetUserTasks(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if (request.get('user') is None):
            return Response(message = "User is blank, please enter a username and try again", status=status.HTTP_404)

        return JsonResponse(TaskManager().get_users_tasks(request.get('user')), status=status.HTTP_200_OK)

class SubmitTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (request.get('binary-data') is None):
            return Response(message = "binary-data parameter is null/none", status=status.HTTP_400)
        for header in request.headers.items():
            return;