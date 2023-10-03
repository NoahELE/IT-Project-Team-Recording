from django.urls import path
from .views import AddBatchJobView

urlpatterns = [
        path('clara/add-batch-job', AddBatchJobView.as_view(), name='add-batch-job'),
]