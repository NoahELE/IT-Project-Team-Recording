from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from data.models import TaskDataManager, TaskMetaDataManager
from data.serializer import NewMetaDataAudioSerializer, NewDataAudioSerializer, TaskUserSerializer

import requests

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



class AddBatchJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        required_keys = ['user', 'task_id', 'data']
        check_required_keys(POST, required_keys, request)

        serialized_data = {}
        serialized_data['user'] = request['user']
        serialized_data['task_id'] = request['task_id']
        serialized_data['data'] = []

        for job in request.get('data'):
            required_keys = ['text', 'file']
            check_required_keys(POST, required_keys, job)
            serialized_data['data'].append(NewDataAudioSerializer(job))

        TaskMetaDataManager().add_new_audio_metadata(NewMetaDataAudioSerializer(serialized_data))
        return Response(status=status.HTTP_200_OK)
    

class DeleteJobsWithTaskID(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        required_keys = ['task_id']
        check_required_keys(POST, required_keys, request)

        TaskMetaDataManager().delete_existing_audio_data(request) # might need a serializer, reduces input size

        return Response(status=status.HTTP_200_OK)
    
class changeUserOnTaskID(APIView):
    permissions_classes = [IsAuthenticated]

    def post(self, request):
        required_keys = ['task_id', 'user']
        check_required_keys(POST, required_keys, request)
        
        TaskMetaDataManager.change_task_user(TaskUserSerializer(request))
        return Response(status=status.HTTP_200_OK)
