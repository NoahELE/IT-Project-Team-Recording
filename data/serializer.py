from rest_framework import serializers
from .models import TaskMetaData, TaskData

class TaskMetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskMetaData
        fields = '__all__'

class TaskDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskData
        fields = '__all__'