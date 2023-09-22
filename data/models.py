from django.db import models

class TaskManager(models.Manager):
    use_in_migrations = True

    def __check_task_completed__(self, request):
        return TaskData.objects.filter(task_id = request['task_id'], completed = True).exists()
    
    def __add_audio_data__(self, request):

        data = TaskData()
        data.task_id = request['task_id']
        data.block_id = request['block_id']
        data.text = request['text']
        data.file = request['file']
        data.save()

    def __add_audio_metadata__(self, request):
        metadata = TaskMetaData()
        metadata.task_id=request['task_id']
        metadata.user=request['user']
        metadata.tag_id=request['tag_id']
        metadata.upload_time=request['upload_time']
        metadata.privacy=False
        metadata.save()

    def delete_task(self, request):
        TaskMetaData.objects.filter(task_id = request['task_id']).delete()
        TaskData.objects.filter(task_id = request['task_id']).delete()

    
    def add_task(self, request):
        self.__add_audio_metadata__(request)

        block_id = 1
        for job in request.get('data'):
            job['task_id'] = request['task_id']
            job['block_id'] = block_id
            block_id += 1

            self.__add_audio_data__(job)

    def get_users_tasks(self, username):
        return self.filter(user=username)

    # def submitUserTask(self, task_id, block_index, link):
    #     completed_task = TaskData.objects.filter(task_id = task_id, block_index = block_index).first()
    #     completed_task.file = link
    #     completed_task.completed = True
    #     completed_task.save()

    #     task_blocks = TaskData.objects.filter(task_id = task_id) 

    #     if self.__check_task_completed__(task_id):
    #         task = TaskMetaData.objects.filter(task_id = task_id).first()
    #         task.completed = True
    #         task.save()

    def change_task_user(self, request):
        task = TaskMetaData.objects.filter(task_id = request.task_id).first()
        task.user = request['user']
        task.completed = True
        task.save()

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

    class Tag(models.Model):
        class Languages(models.TextChoices):
            ENGLISH = "ENGLISH"
            OTHER = "OTHER"

        class Gender(models.TextChoices):
            M = "MALE"
            F = "FEMALE"

        language = models.CharField(choices=Languages.choices, default=Languages.OTHER, max_length=100)
        gender = models.CharField(choices=Gender.choices, max_length=1)

class TaskData(models.Model):
    task_id = models.CharField(max_length=255)
    block_id = models.IntegerField()
    text = models.TextField()
    completed = models.BooleanField(default=False)
    file = models.CharField(unique=True, max_length=255)

    objects = TaskManager()
