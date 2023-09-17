from django.urls import path
from .views import RegisterView, EditProfileView, ChangePasswordView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup', RegisterView.as_view(), name="sign_up"),
    path('verify', TokenVerifyView.as_view(), name='token_verify'),
    path('edit-profile', EditProfileView.as_view(), name='edit-profile'),
    path('change-password', ChangePasswordView.as_view(), name='change-password'),
]
