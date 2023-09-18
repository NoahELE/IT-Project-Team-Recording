from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from.models import AudioDataManager



class AddBatchJobView(APIView):
    def post(request):
        for i in request.jobs:
            AudioDataManager().add_new_audio_data(i)
        return Response(status=status.HTTP_200_OK)