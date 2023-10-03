from django.urls import path
from .views import AddBatchJobView, DeleteJobsWithTaskID, ClearTaskID, ChangeUserOnTaskID, FilterUsers

urlpatterns = [
        path('clara/task/add', AddBatchJobView.as_view(), name='add-batch-job'),
        path('clara/task/delete', DeleteJobsWithTaskID.as_view(), name='delete-task'),
        path('clara/task/clear', ClearTaskID.as_view(), name='clear-task'),
        path('clara/task/change-user', ChangeUserOnTaskID.as_view(), name='change-user-task'),
        path('clara/users/get', FilterUsers.as_view(), name='filter-users')
]