from django.urls import path
from .views import SubmitTaskView

urlpatterns = [
        path('submit-task', SubmitTaskView.as_view(), name='submit-task'),
]