from rest_framework import serializers
from .models import TaskMetaData, TaskData

class NewMetaDataAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskMetaData
        fields = ('task_id', 'user', 'tag_id', 'data')

class NewDataAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskData
        fields = ('task_id','block_id', 'text', 'file')

class TaskUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskMetaData
        fields = ('task_id', 'user')