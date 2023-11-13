from django.db import models
from django.utils import timezone

import os, shutil

FILES_LOCATION = "data/tests" if "localpath" not in os.environ.keys() else os.environ["localpath"]
FILE_FORMAT = ".wav"

class TaskManager(models.Manager):
    use_in_migrations = True

    def __check_task_completed__(self, task_id):
        return TaskData.objects.filter(task_id = task_id, completed = True).exists()
    
    def __add_audio_data__(self, request):
        filepath = FILES_LOCATION + "/" + request['task_id']
        if not os.path.exists(filepath):
            os.mkdir(filepath)
        
        data = TaskData()
        data.task_id = request['task_id']
        data.block_id = request['block_id']
        data.text = request['text']

        data.save()

    def __add_audio_metadata__(self, request):
        metadata = TaskMetaData()
        metadata.task_id=request.data['task_id']
        metadata.user=request.data['user']
        metadata.tag_id=request.data['tag_id']
        metadata.upload_time= timezone.now()
        metadata.privacy=False
        metadata.save()

    def get_file_path(self, task_id, block_id):
        results = TaskData.objects.filter(task_id = task_id, block_id = block_id, completed = True)

        if results.count() == 0:
            return None
        
        filepath = FILES_LOCATION + "/" + task_id + "/" + str(block_id) + FILE_FORMAT
        return filepath

    def delete_task(self, task_id):
        TaskMetaData.objects.filter(task_id = task_id).delete()
        TaskData.objects.filter(task_id = task_id).delete()
        shutil.rmtree(FILES_LOCATION + "/" + task_id)

    
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
    
    def contains_existing_file(self, task_id, block_id):
        return TaskData.objects.filter(task_id = task_id, block_id = block_id).first().completed

    def get_users_tasks(self, username):
        response = []
        for task in TaskMetaData.objects.filter(user=username):
            for block in TaskData.objects.filter(task_id=task.task_id):
                response.append({
                    "task_id": block.task_id,
                    "block_id": block.block_id,
                    "text": block.text,
                    "has_existing": block.completed,
                })
        return response

    def submit_task(self, task_id, block_id, audiofile):
        completed_task = TaskData.objects.filter(task_id = task_id, block_id = block_id).first()
        
        completed_task.completed = True
        completed_task.save()

        file_path = FILES_LOCATION + "/" + task_id + "/" + str(block_id) + FILE_FORMAT

        with open(file_path, "wb") as file:
            for chunk in audiofile.chunks():
                file.write(chunk)

        file.close()

        if self.__check_task_completed__(task_id):
            task = TaskMetaData.objects.filter(task_id = task_id).first()
            task.completed = True
            task.save()

    def change_task_user(self, request):
        task = TaskMetaData.objects.filter(task_id = request.task_id).first()
        task.user = request['user']
        task.save()

    def clear_task(self, task_id, block_id):
        tasks = TaskData.objects.filter(task_id = task_id, block_id = block_id)

        if tasks.count() > 0:
            task = tasks.first()
            file_path = FILES_LOCATION + "/" + task_id + "/" + task.file + ".bin"
            os.remove(file_path)
            task.completed = False
            task.save()
            metadata = TaskMetaData.objects.filter(task_id = task_id).first()
            metadata.completed = False
            metadata.save()

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

    objects = TaskManager()