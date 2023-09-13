from django.urls import path
from .views import RegisterView, TaskCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name="sign_up"),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # For C-LARA to create a new task.
    path('api/tasks/', TaskCreateView.as_view(), name='task_create'),
]

