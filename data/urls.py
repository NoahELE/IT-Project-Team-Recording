from django.urls import path
from .views import AddBatchJobView

urlpatterns = [
        path('add-batch-job', AddBatchJobView.as_view(), name='add-batch-job'),
]