from django.test import TestCase
from django.utils import timezone
from data.models import TaskData, TaskMetaData
from datetime import datetime

task_data_manager = TaskData.objects
task_metadata_manager = TaskMetaData.objects

request = {
    "id": 1,
    "task_id": "Alice in Wonderland",
    "user": "user_example",
    "tag_id": 123,
    "data": [
        {"text": "Once upon a time there lived a girl called Alice",
         "file": "",
         },
        {"text": "She lives in a Wonderland",
         "file": "",
         },
    ],
    "upload_time": timezone.now(),
    "privacy": False,
}

request2 = {
    "id": 2,
    "task_id": "Winnie the Pooh",
    "user": "user_example",
    "tag_id": 123,
    "data": [
        {"text": "Once upon a time there lived a bear called Pooh",
         "file": "",
         },
        {"text": "who lives in a 1000 Acre Forest",
         "file": "",
         },
    ],
    "upload_time": timezone.now(),
    "privacy": False,
}


class AudioDataManagerTest(TestCase):
    
    def setUp(self):
        task_data_manager.all().delete()
        task_metadata_manager.all().delete()
        task_metadata_manager.add_task(request)
        task_metadata_manager.add_task(request2)

    def test_add_task(self):

        result = task_metadata_manager.filter(id=request['id']).first()

        self.assertEqual(result.id, request['id'])
        self.assertEqual(result.task_id, request['task_id'])

        result = task_metadata_manager.filter(id=request2['id']).first()

        self.assertEqual(result.id, request['id'])
        self.assertEqual(result.task_id, request['task_id'])
    
    def test_delete_existing_audio_data(self):
        task_metadata_manager.delete_existing_audio_data(request['task_id'])

        result = task_metadata_manager.filter(task_id = request['task_id'])

        self.assertEqual(result.first(), None)

    def test_get_users_tasks(self):
        result = task_metadata_manager.filter(user = "user_example")

        self.assertEqual(result.count(), 2)
