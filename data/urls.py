from django.urls import path
from .views import AddBatchJobView, TaskView, AudioView, UserTasksView

urlpatterns = [
        path('task/<str:task_id>/<int:block_id>/', TaskView.as_view(), name='delete-task'),
        path('task/', UserTasksView.as_view(), name='get-user-tasks'),
        path('task/add', TaskView.as_view(), name='add-task'),
        path('data/<str:task_id>/<str:filepath>', TaskView.as_view(), name='submit-task'),
        path('data/<str:filepath>', AudioView.as_view(), name='get-audio')
]