from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)


class UserData(AbstractUser):
    username = None
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

class Task(models.Model):
    
    username = models.ForeignKey(UserData, on_delete=models.CASCADE)
    task_id = models.CharField(max_length=255)
    data = models.JSONField()
    accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"Task ID: {self.task_id} for User: {self.user}"
    
# class Tags(models.Model):
#     language = models.CharField(max_length=100)
#     gender = models.CharField(max_length=100)
#     other = models.CharField(max_length=100)
    
#     def __str__(self):
#         return f"Language: {self.language}, Gender: {self.gender}, Other: {self.other}"

class AudioRecording(models.Model):
    
    taskId = models.ForeignKey(Task, on_delete=models.DO_NOTHING) # The task audio recording created for.
    userId = models.ForeignKey(UserData, on_delete=models.CASCADE) # The user who created it.
    title = models.CharField(max_length=100, null=False)
    public = models.BooleanField(null=False)
    uploadTime = models.DateField(null=False)
    audioFilePath = models.URLField(null=False)
    
    def __str__(self):
        return self.title
    
class VideoRecording(models.Model):
    
    taskId = models.ForeignKey(Task, on_delete=models.DO_NOTHING)
    userId = models.ForeignKey(UserData, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False)
    public = models.BooleanField(null=False)
    uploadTime = models.DateField(null=False)
    videoFilePath = models.URLField(null=False)
    
    def __str__(self):
        return self.title