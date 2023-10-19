from django.urls import path
from .views import AddBatchJobView, TaskView, AudioView, UserTasksView

urlpatterns = [
        path('task/user', UserTasksView.as_view(), name='user-tasks'),
        path('task/<int:task_id>/<int:block_id>/', TaskView.as_view(), name='delete-task'),
        path('task/', TaskView.as_view(), name='add-task'),
        path('data/<int:task_id>/<str:filepath>', TaskView.as_view(), name='submit-task'),
        path('data/<str:filepath>', AudioView.as_view(), name='get-audio')
]