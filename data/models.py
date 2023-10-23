from django.db import models
from django.utils import timezone

import os

FILES_LOCATION = "/data/tests" if os.environ["localpath"] is None else os.environ["localpath"]

class TaskManager(models.Manager):
    use_in_migrations = True

    def __check_task_completed__(self, request):
        return TaskData.objects.filter(task_id = request['task_id'], completed = True).exists()
    
    def __add_audio_data__(self, request):
        data = TaskData()
        data.task_id = request['task_id']
        data.block_id = request['block_id']
        data.text = request['text']
        data.file = request['task_id'] + " " + str(request['block_id'])
        if not os.path.exists(FILES_LOCATION + "/" + request['task_id']):
            os.mkdir(FILES_LOCATION + "/" + request['task_id'])

        data.save()

    def __add_audio_metadata__(self, request):
        metadata = TaskMetaData()
        metadata.task_id=request.data['task_id']
        metadata.user=request.data['user']
        metadata.tag_id=request.data['tag_id']
        metadata.upload_time= timezone.now()
        metadata.privacy=False
        metadata.save()

    def get_audio(self, filepath):
        data = ""

        print("Getting audio...")
        file = open(str(FILES_LOCATION).replace('\\', '/') + filepath, 'rb')

        data = file.read()
        
        file.close()


        return data

    def delete_task(self, task_id):
        TaskMetaData.objects.filter(task_id = task_id).delete()
        TaskData.objects.filter(task_id = task_id).delete()

    
    def add_task(self, request):
        self.__add_audio_metadata__(request)

        block_id = 1
        for job in request.data['data']:
            task={}
            task['task_id'] = request.data['task_id']
            task['block_id'] = block_id
            task['text'] = job
            block_id += 1

            self.__add_audio_data__(task)

    def contains_task_id(self, task_id):
        return TaskMetaData.objects.filter(task_id = task_id).count() > 0

    def get_users_tasks(self, username):
        data = {}
        for task in TaskMetaData.objects.filter(user=username):
            data[task.task_id] = {}
            for block in TaskData.objects.filter(task_id=task.task_id):
                data[task.task_id][block.block_id] = {
                    "text": block.text,
                    "file": block.file,
                    "has_existing": block.completed,
                }
        print(data)
        return data

    def submit_task(self, task_id, block_index, audiofile):
        completed_task = TaskData.objects.filter(task_id = task_id, block_index = block_index).first()
        
        completed_task.completed = True
        completed_task.save()

        file_path = FILES_LOCATION + completed_task.file

        with open(file_path, "wb") as file:
            file.write(audiofile)

        file.close()

        if self.__check_task_completed__(task_id):
            task = TaskMetaData.objects.filter(task_id = task_id).first()
            task.completed = True
            task.save()

    def change_task_user(self, request):
        task = TaskMetaData.objects.filter(task_id = request.task_id).first()
        task.user = request['user']
        task.completed = True
        task.save()

    def clear_task(self, request):
        # remove existing audio file code required
        task = TaskMetaData.objects.user

class TaskMetaData(models.Model):
    task_id = models.CharField(unique=True, max_length=255)
    user = models.CharField(max_length=255)
    tag_id = models.IntegerField()
    upload_time = models.DateTimeField()
    privacy = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)

    objects = TaskManager()

    def __str__(self):
        return str(self.task_id)

class TaskData(models.Model):
    task_id = models.CharField(max_length=255)
    block_id = models.IntegerField()
    text = models.TextField(max_length=255)
    completed = models.BooleanField(default=False)
    file = models.CharField(unique=True, max_length=255)

    objects = TaskManager()