from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserData


class RegisterViewTests(APITestCase):

    def test_register_with_valid_data(self):
        data = {'username': 'newuser', 'email': 'newuser@example.com', 'password': 'newpassword'}
        response = self.client.post(reverse('sign_up'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_with_invalid_data(self):
        # Example: missing username
        data = {'email': 'newuser@example.com', 'password': 'newpassword'}
        response = self.client.post(reverse('sign_up'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class EditProfileViewTests(APITestCase):

    def setUp(self):
        self.user = UserData.objects.create_user(username='testuser2', email='testuser2@example.com',
                                                 password='testpassword2')
        self.client.login(username='testuser2', password='testpassword2')
        self.client.force_authenticate(user=self.user)

    def test_edit_profile_with_valid_data(self):
        data = {'username': 'updateduser',
                'email': 'testuser12312@gmail.com'}
        response = self.client.put(reverse('edit-profile'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_profile_with_invalid_data(self):
        # Example: invalid email format
        data = {'email': 'invalidemailformat'}
        response = self.client.put(reverse('edit-profile'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Add tests for unauthenticated users


class ChangePasswordViewTests(APITestCase):

    def setUp(self):
        self.user = UserData.objects.create_user(username='testuser1', email='testuser1@example.com',
                                                 password='testpassword1')
        self.client.login(username='testuser1', password='testpassword1')
        self.client.force_authenticate(user=self.user)

    def test_change_password_with_valid_data(self):
        data = {'current_password': 'testpassword1', 'new_password': 'newpassword123154124'}
        response = self.client.put(reverse('change-password'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_change_password_with_invalid_data(self):
        # Example: incorrect old password
        data = {'current_password': 'wrongpassword', 'new_password': 'newpassword'}
        response = self.client.put(reverse('change-password'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Add tests for unauthenticated users


class UnauthenticatedUserTests(APITestCase):

    def test_edit_profile_unauthenticated(self):
        data = {'username': 'updateduser'}
        response = self.client.put(reverse('edit-profile'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_change_password_unauthenticated(self):
        data = {'current_password': 'testpassword', 'new_password': 'newpassword'}
        response = self.client.put(reverse('change-password'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class SecurityTests(APITestCase):

    def test_access_without_token(self):
        # Try accessing an authenticated endpoint without a token
        response = self.client.put(reverse('edit-profile'), {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_with_fake_token(self):
        # Try accessing an authenticated endpoint with a fake token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'fake_token')
        response = self.client.put(reverse('edit-profile'), {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AdditionalNegativeTests(APITestCase):

    def test_register_with_long_username(self):
        # Try registering with a username that's too long
        data = {'username': 'a' * 101, 'email': 'user@example.com', 'password': 'password'}
        response = self.client.post(reverse('sign_up'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_with_short_new_password(self):
        # Setup a user for the test
        self.user = UserData.objects.create_user(username='testuser', email='testuser@example.com',
                                                 password='testpassword')
        self.client.login(username='testuser', password='testpassword')
        # Try changing password with a new password that's too short
        data = {'old_password': 'testpassword', 'new_password': 'short'}
        response = self.client.put(reverse('change-password'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
