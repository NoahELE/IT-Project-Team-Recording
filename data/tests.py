import os
from bitstring import BitArray
from django.test import TestCase
from django.utils import timezone
from data.models import TaskData, TaskMetaData

data_manager = TaskData.objects
metadata_manager = TaskMetaData.objects

request = {
    "task_id": "Alice in Wonderland",
    "user": "user_example",
    "tag_id": 123,
    "data": ["Once upon a time there lived a girl called Alice",
             "She lives in a Wonderland","where she falls into a rabbit hole.",
    ],
    "upload_time": timezone.now(),
}

request2 = {
    "task_id": "Winnie the Pooh",
    "user": "user_example",
    "tag_id": 123,
    "data": ["Once upon a time there lived a bear called Pooh",
             "who lives in a 1000 Acre Forest",
    ],
    "upload_time": timezone.now(),
    "privacy": False,
}

request3 = {
    "task_id": "NA",
    "user": "NA",
    "tag_id": 123,
    "data": [
        {"NA",
         },
    ],
    "upload_time": timezone.now(),
    "privacy": False,
}

class AudioDataManagerTest(TestCase):
    
    def setUp(self):
        data_manager.all().delete()
        metadata_manager.all().delete()
        metadata_manager.add_task(request)
        data_manager.add_task(request2)

    def test_add_task(self):

        metadata_result = metadata_manager.filter(task_id=request['task_id'])

        data_result = data_manager.filter(task_id=request['task_id'])

        self.assertEqual(data_result.count(), 3)
        self.assertEqual(metadata_result.count(), 1)

        metadata_result = metadata_manager.filter(task_id=request2['task_id'])
        data_result = data_manager.filter(task_id=request2['task_id'])

        self.assertEqual(data_result.count(), 2)
        self.assertEqual(metadata_result.count(), 1)

        metadata_result = metadata_manager.filter(task_id=request3['task_id'])
        data_result = data_manager.filter(task_id=request3['task_id'])

        self.assertEqual(data_result.count(), 0)
        self.assertEqual(metadata_result.count(), 0)
    
    def test_delete_existing_audio_data(self):

        data_result = data_manager.filter(task_id = request['task_id'])
        metadata_result = metadata_manager.filter(task_id = request['task_id'])

        self.assertEqual(data_result.count(), 3)
        self.assertEqual(metadata_result.count(), 1)

        data_manager.delete_task(request['task_id'])

        data_result = data_manager.filter(task_id = request['task_id'])
        metadata_result = metadata_manager.filter(task_id = request['task_id'])

        self.assertEqual(data_result.count(), 0)
        self.assertEqual(metadata_result.count(), 0)

    def test_get_users_tasks(self):
        result = data_manager.get_users_tasks(request["user"])

        self.assertEqual(len(result), 2)

    def test_get_audio(self):
        filepath = "test.mp3"

        result = data_manager.get_audio(filepath)

        self.assertEqual(result, b'0101010101')
