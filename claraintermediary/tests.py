from django.test import TestCase
from django.utils import timezone
from data.models import TaskManager, Task
from datetime import datetime
import requests
import json


request = {
    "id": 1,
    "task_id": "Alice in Wonderland",
    "user": "user_example",
    "tag_id": 123,
    "filename": "AliceinWonderlandExcerpt",
    "text": "Once upon a time there lived a girl called Alice",
    "description": "N/A",
    "uploadTime": timezone.now(),
    "privacy": False,
}