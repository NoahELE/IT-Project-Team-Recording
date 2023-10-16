from django.urls import path
from .views import AddBatchJobView, TaskView, ClearTaskIDView, UserTasksView, FilterUsersView

urlpatterns = [
        path('add-batch-job', AddBatchJobView.as_view(), name='add-batch-job'),
        path('task/<int:task_id>/<int:block_id>/', TaskView.as_view(), name='delete-task'),
        path('data/<int:task_id>/<string:filepath>', TaskView.as_view(), name='submit-task'),
        path('task/', FilterUsersView.as_view(), name='get-users')
        path('data/<string:filepath>', )
]