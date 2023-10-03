from django.urls import path
from .views import AddBatchJobView, DeleteJobsWithTaskID, ClearTaskID, ChangeUserOnTaskID

urlpatterns = [
        path('clara/add-batch-job', AddBatchJobView.as_view(), name='add-batch-job'),
        path('clara/delete-task', DeleteJobsWithTaskID.as_view(), name='delete-task'),
        path('clara/clear-task', ClearTaskID.as_view(), name='clear-task'),
        path('clara/change-user-task', ChangeUserOnTaskID.as_view(), name='change-user-task'),
]