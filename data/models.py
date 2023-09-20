from django.db import models

class TaskMetaDataManager(models.Manager):
    use_in_migrations = True

    def __check_task_completed__(self, task_id):
        return

    def add_new_audio_data(self, task_id, user, tag_id, upload_time):
        data = self.create(
            task_id=task_id,
            user=user,
            tag_id=tag_id,
            upload_time=upload_time,
            privacy=False,
        )
        return data

    def delete_existing_audio_data(self, task_id):
        self.filter(task_id=task_id).delete()

    def get_users_tasks(self, username):
        return self.filter(user=username)

    def submitUserTask(self, task_id, block_index, link):
        completed_task = TaskDataManager().filter(task_id = task_id, block_index = block_index).first()

        completed_task.link = link
        completed_task.completed = True
        completed_task.save()

        task_blocks = TaskDataManager().filter(task_id = task_id) 

        if self.__check_task_completed__(task_id):
            task = self.filter(task_id = task_id).first()
            task.completed = True
            task.save()


class TaskDataManager(models.Manager):
    def add_new_subtask(self, task_id, block_index, text):
        self.create(
            task_id=task_id,
            block_index = block_index,
            text = text
        )


class TaskMetaData(models.Model):
    task_id = models.CharField(unique=True, max_length=255)
    user = models.CharField(max_length=255)
    tag_id = models.CharField(max_length=255)
    uploadTime = models.DateTimeField()
    privacy = models.BooleanField()
    completed = models.BooleanField(default=False)
    objects = TaskMetaDataManager()

    def __str__(self):
        return str(self.task_id)

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
    completed = models.BooleanField(default=False)
    link = models.CharField(unique=True, max_length=255)

    objects = TaskDataManager()
