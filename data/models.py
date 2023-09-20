from django.db import models

class AudioDataManager(models.Manager):
    use_in_migrations = True

    def add_new_audio_data(self, request):
        data = self.create(
            id=request['id'],
            task_id=request['task_id'],
            user=request['user'],
            tag_id=request['tag_id'],
            filename=request['filename'],
            text=request['text'],
            description=request['description'],
            uploadTime=request['uploadTime'],
            privacy=request['privacy']
        )
        return data
    
    def delete_existing_audio_data(self, task_id):
        AudioData.objects.filter(task_id=task_id).delete()
    
    def get_users_tasks(self, username):
        return AudioData.objects.filter(user=username)

class AudioData(models.Model):
    id = models.IntegerField(primary_key=True)
    task_id = models.CharField(unique=True, max_length=255)
    user = models.CharField(max_length=255)
    tag_id = models.CharField(max_length=255)
    filename = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    uploadTime = models.DateTimeField()
    privacy = models.BooleanField()

    objects = AudioDataManager()

    def __str__(self):
        return str(self.id)

class Tag(models.Model):
    class Languages(models.TextChoices):
        ENGLISH = "ENGLISH"
        OTHER = "OTHER"

    class Gender(models.TextChoices):
        MALE = "M"
        FEMALE = "F"

    language = models.CharField(choices=Languages.choices, default=Languages.OTHER, max_length=100)
    gender = models.CharField(choices=Gender.choices, max_length=1)

class TaskData(models.Model):
    task_id = models.CharField(max_length=255)
    block_index = models.IntegerField()
    text = models.TextField()
    link = models.CharField(unique=True, max_length=255)