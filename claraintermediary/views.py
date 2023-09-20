from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from data.models import TaskDataManager, TaskMetaDataManager
from data.serializer import NewMetaDataAudioSerializer, NewDataAudioSerializer

import requests

class AddBatchJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (request.get('jobs') is None):
            return Response(status=status.HTTP_404)
        
        TaskMetaDataManager().add_new_audio_metadata(NewMetaDataAudioSerializer(request))

        for i in request.get('jobs'):
            TaskDataManager().add_new_audio_data(NewDataAudioSerializer(i))

        return Response(status=status.HTTP_200_OK)
    

class DeleteJobsWithTaskID(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if (request.get('task_id') is None):
            return Response(status=status.HTTP_404)

        TaskMetaDataManager().delete_existing_audio_data(request.get('task_id'))
        
        return Response(status=status.HTTP_200_OK)
    
class changeUserOnTaskID(APIView):
    permissions_classes = [IsAuthenticated]

    def post(self, request):
        if (request.get('task_id') is None):
            return Response(status=status.HTTP_404)
        
        AudioDataManager.change
        return Response(status=status.HTTP_200_OK)
