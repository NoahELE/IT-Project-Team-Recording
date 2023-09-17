from django.db import models

class AudioDataManager(models.Manager):
    use_in_migrations = True

    def addNewAudioData(self, request):
        data = self.model(request)
        data.save(using=self.db)
        return data


class AudioData(models.Model):
    objects = AudioDataManager()

    id = models.IntegerField(unique = True)
    task_id = models.CharField(unique = True)
    created_by_user = models.CharField(unique = True)
    tag_id = models.CharField(unique = True)
    filename = models.CharField(unique = True)
    text = models.CharField()
    description = models.CharField()
    uploadTime = models.DateTimeField()
    privacy = models.BooleanField()

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

data = AudioDataManager.addNewAudioData(request)