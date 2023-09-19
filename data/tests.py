from django.test import TestCase
from django.utils import timezone
from data.models import AudioDataManager, AudioData
from datetime import datetime
import requests
import json

manager = AudioData.objects
request = {
    "id": 1,
    "task_id": "Alice in Wonderland",
    "user": "user_example",
    "tag_id": 123,
    "filename": "AliceinWonderlandExcerpt",
    "text": "Once upon a time there lived a girl called Alice",
    "description": "N/A",
    "uploadTime": timezone.now(),
    "privacy": False,
}

request2 = {
    "id": 2,
    "task_id": "Winnie the Pooh",
    "user": "user_example",
    "tag_id": 123,
    "filename": "WinnieThePoohExcerpt",
    "text": "Once upon a time there lived a bear who loved honey",
    "description": "N/A",
    "uploadTime": timezone.now(),
    "privacy": False,
}


class AudioDataManagerTest(TestCase):
    
    def setUp(self):
        manager.all().delete()
        manager.add_new_audio_data(request)
        manager.add_new_audio_data(request2)

    def test_add_new_audio_data(self):

        result = manager.filter(id=request['id']).first()

        self.assertEqual(result.id, request['id'])
        self.assertEqual(result.task_id, request['task_id'])
    
    def test_delete_existing_audio_data(self):
        manager.delete_existing_audio_data(request['task_id'])

        result = manager.filter(task_id = request['task_id'])

        self.assertEqual(result.first(), None)

    def test_get_users_tasks(self):
        result = manager.filter(user = "user_example")

        self.assertEqual(result.count(), 2)
