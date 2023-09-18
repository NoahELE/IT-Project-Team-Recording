from django.urls import path
from .views import AddBatchJob

urlpatterns = [
        path('add-batch-job', TokenObtainPairView.as_view(), name='add-batch-job'),

]