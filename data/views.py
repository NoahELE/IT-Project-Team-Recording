from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from .models import TaskManager

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse
from data.models import TaskManager
from data.serializer import NewMetaDataAudioSerializer, NewDataAudioSerializer, TaskUserSerializer
from django.utils import timezone

import base64

POST = "POST"
GET = "GET"

def check_required_keys(type, required_keys, request):
    if type not in [GET, POST]:
        return Response({'error': 'Invalid request type'}, status=status.HTTP_400_BAD_REQUEST)

    request_data = request.GET if type == "GET" else request.POST
    missing_keys = [key for key in required_keys if request_data.get(key) is None]

    if missing_keys:
        missing_keys_str = ', '.join(missing_keys)
        message = f"Missing keys: {missing_keys_str}"
        return Response({'error': message}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'success': 'All required keys are present'}, status=status.HTTP_200_OK)

class AudioView(APIView):

    def get(self, request):
        data = TaskManager.get_audio(filepath=request.GET.get('filepath'))

        if data == "": return HttpResponse("Audio not found", status=status.HTTP_404_NOT_FOUND)

        return HttpResponse(data, status=status.HTTP_200_OK)



class AddBatchJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        required_keys = ['user', 'task_id', 'data']
        check_required_keys(POST, required_keys, request)

        serialized_data = {}
        serialized_data['user'] = request['user']
        serialized_data['task_id'] = request['task_id']
        serialized_data['data'] = {}
        serialized_data['upload_time'] = timezone.now()

        for job in request['data']:
            required_keys = ['text', 'file']
            check_required_keys(POST, required_keys, job)
            serialized_data['data'].append(NewDataAudioSerializer(job))

        TaskManager().add_task(NewMetaDataAudioSerializer(serialized_data))
        return Response(status=status.HTTP_200_OK)
    

class TaskView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        if TaskManager().contains_task_id(request.data['task_id']):
            return Response("Task ID already exists within the database.", status=status.HTTP_400_BAD_REQUEST)
        else:
            TaskManager().add_task(request)
            return Response("Added task successfully.", status=status.HTTP_200_OK)

    def post(self, request, task_id, block_id):
        # if request.data['binary'] is None:
        #     return Response("Attempted to submit empty/null file.", status=status.HTTP_400_BAD_REQUEST)
        
        if task_id is None or block_id is None:
            return Response("Task_id/Block_id is none.", status=status.HTTP_404_NOT_FOUND)
        
        print("yes")
        print(request.data)
        print("no")
        
        TaskManager.submit_task(task_id=task_id, block_index=block_id, audiofile=base64.b64decode(request))
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, task_id):

        if task_id is None:
            return Response("Missing task_id value.", status=status.HTTP_400_BAD_REQUEST)

        TaskManager().delete_task(task_id) # might need a serializer, reduces input size

        return Response(status=status.HTTP_200_OK)
    
class ClearTaskIDView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        required_keys = ['task_id']
        check_required_keys(POST, required_keys, request)

        TaskManager().clear_task(request) # might need a serializer, reduces input size

        return Response(status=status.HTTP_200_OK)
    
    
class UserTasksView(APIView):
    permissions_classes = [IsAuthenticated]

    def get(self, request):
        return Response(TaskManager.get_users_tasks(self = self, username=request.user.username), status=status.HTTP_200_OK)

    def post(self, request):
        required_keys = ['task_id', 'user']
        check_required_keys(POST, required_keys, request)

        if TaskManager.filter(request.get('task_id')).count() == 0 :
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        TaskManager.change_task_user(TaskUserSerializer(request))
        return Response(status=status.HTTP_200_OK)
    
class FilterUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        required_keys = ['language']
        check_required_keys(GET, required_keys, request)


        return Response(status=status.HTTP_200_OK)

        # UserManager function call to return usernames filtered on language