from django.urls import path
from .views import AddBatchJobView, TaskView, AudioView, UserTasksView, ClearTaskIDView

urlpatterns = [
        path('task/user', UserTasksView.as_view(), name='user-tasks'),
        path('task/<str:task_id>', TaskView.as_view(), name='delete-task'),
        path('task/clear/<str:task_id>/<int:block_id>', ClearTaskIDView.as_view(), name='clear-task'),
        path('task/add', TaskView.as_view(), name='add-task'),
        path('task/submit/<str:task_id>/<int:block_id>', TaskView.as_view(), name='submit-task'),
        path('audio/<str:task_id>/<int:block_id>', AudioView.as_view(), name='get-audio')
]