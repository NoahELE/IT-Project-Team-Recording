from django.urls import path
from .views import AddBatchJobView, DeleteJobsWithTaskIDView, ClearTaskIDView, ChangeUserOnTaskIDView, FilterUsersView

urlpatterns = [
        path('add-batch-job', AddBatchJobView.as_view(), name='add-batch-job'),
        path('delete-task', DeleteJobsWithTaskIDView.as_view(), name='delete-task'),
        path('clear-task', ClearTaskIDView.as_view(), name='clear-task'),
        path('change-user-task', ChangeUserOnTaskIDView.as_view(), name='change-user-task'),
        path('get-users', FilterUsersView.as_view(), name='get-users')
]