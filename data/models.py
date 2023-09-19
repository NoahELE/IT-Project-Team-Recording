from django.db import models

class AudioDataManager(models.Manager):
    use_in_migrations = True

    def add_new_audio_data(self, request):
        data = self.create(
            id = request.get('id'),
            task_id=request.get('task_id'),
            created_by_user=request.get('user'),
            tag_id=request.get('tag_id'),
            filename=request.get('filename'),
            text=request.get('text'),
            description=request.get('description'),
            uploadTime=request.get('uploadTime'),
            privacy=request.get('privacy')
        )
        return data


class AudioData(models.Model):
    id = models.IntegerField(primary_key=True)
    task_id = models.CharField(unique = True)
    created_by_user = models.CharField(unique = True)
    tag_id = models.CharField(unique = True)
    filename = models.CharField(unique = True)
    text = models.CharField()
    description = models.CharField()
    uploadTime = models.DateTimeField()
    privacy = models.BooleanField()

    objects = AudioDataManager()

    def __str__(self):
        return self.id


class Tag(models.Model):
    class Languages(models.TextChoices):
        ENGLISH = "ENGLISH"
        OTHER = "OTHER"

    class Gender(models.TextChoices):
        MALE = "M"
        FEMALE = "F"

    language = models.CharField(choices=Languages.choices, default=Languages.OTHER)
    gender = models.CharField(choices=Gender.choices)