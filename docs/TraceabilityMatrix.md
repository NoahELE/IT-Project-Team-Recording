

# 🔍 Traceability Matrix
- The Traceability Matrix presented in this document consolidates the detailed testing scenarios for both the User API and the Data app. Each testing scenario is meticulously mapped to specific functionalities, providing a holistic view of our comprehensive testing endeavors.


## Traceability Matrix for Data app
- Source document: [Traceability Matrix](#link-to-pdf)

| Requirement ID | Requirement Description                            | Unit Test ID | Function Name                  | Test Scenario                                    |
|:--------------:|:--------------------------------------------------:|:------------:|:------------------------------:|:------------------------------------------------:|
| R1             | Ability to add a new task                          | UT_001       | `add_task()`                   | Adding a new task                                |
| R2             | Ability to retrieve tasks assigned to a user       | UT_002       | `get_user_tasks()`             | Retrieving tasks assigned to a user              |
| R3             | Ability to delete audio data from an existing task | UT_003       | `delete_existing_audio_data()` | Deleting a existing audio data from a task       |
| R4             | Ability to retrieve audio data for a task          | UT_004       | `get_audio()`                  | Retrieving audio data associated with a task     |

## Traceability Matrix for User app
- Source document: [Traceability Matrix](#link-to-pdf)
### 1. Functional Testing for API

| Requirement ID | Requirement Description                                                                 | Test Scenario ID | View/Class         | Test Scenario                                 |
|:--------------:|:---------------------------------------------------------------------------------------:|:----------------:|:------------------:|:----------------------------------------------:|
| R1             | Ability for users to register with correct details                                      | TS_001           | `RegisterView`     | Register user account with valid data          |
| R2             | Ensure users cannot register with incorrect details                                      | TS_002           | `RegisterView`     | Register user account with invalid data        |
| R3             | Ability for authenticated users to edit their profile with valid data                    | TS_003           | `EditProfileView`  | Edit profile with valid data for authenticated users |
| R4             | Prevent users from editing their profile with invalid data                               | TS_004           | `EditProfileView`  | Edit profile with invalid data for authenticated users |
| R5             | Prevent unauthenticated users from accessing the edit profile endpoint                   | TS_005           | `EditProfileView`  | Edit profile with valid data whilst unauthenticated |
| R6             | Ensure authenticated users can change their password                                     | TS_006           | `ChangePasswordView` | Change password by inputting new then old password |
| R7             | Prevent users from changing password with incorrect old password                         | TS_007           | `ChangePasswordView` | Change password by inputting new then incorrect old password |
| R8             | Ensure users cannot change password if unauthenticated                                   | TS_008           | `ChangePasswordView` | Change password whilst being unauthenticated  |

### 2. Regression Testing for API

* **Description:** After each bug fix or new feature development, run the entire suite of functional tests to ensure no existing functionality is broken.

### 3. Security Testing for API

| Requirement ID | Requirement Description                                             | Test Scenario ID | View/Class        | Test Scenario                                         |
|:--------------:|:-------------------------------------------------------------------:|:----------------:|:-----------------:|:----------------------------------------------------:|
| R9             | Users should not access authenticated endpoint without a token       | TS_009           | `SecurityTests`   | Access an authenticated endpoint without a token      |
| R10            | Users should not access authenticated endpoint with a fake token    | TS_010           | `SecurityTests`   | Access an authenticated endpoint with a fake token    |

### 4. Automation Testing for API

* **Description:** All tests in the `tests.py` file are automated and can be run using Django's test runner. Regularly run these tests, especially after code changes.

### 5. Additional Negative Testing for API

| Requirement ID | Requirement Description                                                   | Test Scenario ID | View/Class                | Test Scenario                                            |
|:--------------:|:-------------------------------------------------------------------------:|:----------------:|:--------------------------:|:--------------------------------------------------------:|
| R11            | Users cannot register with a username which exceeds the allowed limit      | TS_010           | `AdditionalNegativeTests` | Register with a long username                            |
| R12            | Users cannot change password with a password that is below minimum limit   | TS_011           | `AdditionalNegativeTests` | Change password with a very short new password           |

