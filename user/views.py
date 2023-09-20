from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, TaskSerializer
from rest_framework.response import Response
from rest_framework import status
from models import Task


# view for registering users
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
# view for getting tasks from C-LARA
class TaskCreateView(APIView):
    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def getTask(task_id):
    try:
        audio_recording = Task.objects.get(pk=task_id)
        serializer = TaskSerializer(audio_recording)
        return Response(serializer.data)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

def submit(request, task_id):
    
    for data in request.data:
        
    try:
        task = Task.objects.get(pk=task_id)
        serializer = TaskSerializer(task_id, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save the updated audio recording
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
