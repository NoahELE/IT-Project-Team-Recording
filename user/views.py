from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, TaskSerializer
from rest_framework.response import Response
from rest_framework import status
from models import Task, TaskData


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
        task = Task.objects.get(pk=task_id)
        serializer = TaskSerializer(task_id)
        return Response(serializer.data)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)


def addSubmitToTaskDataTable(task_id):
    try:
        task = Task.objects.get(pk=task_id)
        for i in range(0, len(task.data)):
            taskData = TaskData()
            if task.data["file"] != "":
                taskData.task_id = task.data["task_id"]
                taskData.text = task.data[i]["text"]
                taskData.block_index = i
                taskData.link = task.data[i]["file"]
                taskData.save()
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)


# Replace task with the updated task.


def submit(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
        serializer = TaskSerializer(task_id, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            addSubmitToTaskDataTable(task_id)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)


# {“user”: “user123”,
# “task_id”: “peter_rabbit_segments”,
# “data”: [ { “text”: “Once upon a time there were four little rabbits, and their names were Flopsy, Mopsy, Cottontail and Peter.”,
#               “file”: “” },
#             { “text”: “They lived with their mother in a sand-bank, underneath the root of a very big fir-tree.”,
#               “file”: “” } ] }

# class TaskData(models.Model):
#     task_id = models.CharField(max_length=255)
#     block_index = models.IntegerField()
#     text = models.TextField()
#     link = models.CharField(unique=True, max_length=255)
