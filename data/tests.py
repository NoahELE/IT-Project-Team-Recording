from django.test import TestCase
from django.utils import timezone
from data.models import AudioDataManager, AudioData
from datetime import datetime
import requests
import json

class AudioDataManagerTest(TestCase):
    
    def setUp(self):
        AudioData.objects.all().delete()

    def test_add_new_audio_data(self):
        request = {
            "id" : 123,
            "task_id" : "Alice in Wonderland",
            "user" : "user_example",
            "tag_id" : 123,
            "filename" : "AliceinWonderlandExcerpt",
            "text" : "Once upon a time there lived a girl called Alice",
            "description" : "N/A",
            "uploadTime" : timezone.now(),
            "privacy" : False,
        }

        manager = AudioData.objects

        manager.add_new_audio_data(request)

        return AudioData.objects.filter(task_id = "Alice in Wonderland").exists()