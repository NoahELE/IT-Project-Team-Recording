from django.db import models

class AudioDataManager(models.Manager):
    use_in_migrations = True

    def addNewAudioData(self, task_id, user, tag_id, filename, text, description, uploadTime, privacy):
        data = self.create(task_id = task_id, created_by_user = user, tag_id = tag_id, filename = filename, text = text, description = description, uploadTime = uploadTime, privacy = privacy)
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