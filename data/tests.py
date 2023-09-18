from django.test import TestCase
from .models import AudioDataManager, AudioData
from datetime import datetime

class AudioDataManagerTest(TestCase):
    def setUp(self):
        AudioData.objects.all().delete()

    def test_add_new_audio_data():
        request = {
            "request_type" : "POST",
            "content" : {
                "id" : 123,
                "task_id" : "Alice in Wonderland",
                "created_by_user" : "user_example",
                "tag_id" : 123,
                "filename" : "AliceinWonderlandExcerpt",
                "text" : "Once upon a time there lived a girl called Alice",
                "description" : "N/A",
                "uploadTime" : datetime.now(),
                "privacy" : False,
            }
        }

        AudioDataManager().add_new_audio_data(request)

        return AudioData.objects.filter(task_id = "Alice in Wonderland").exists()