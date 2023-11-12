# 🎙️ IT Project Team Recording
Welcome to the IT Project Team Recording repository. 
Our web application empowers users to effortlessly create and manage their recordings. 
Dive in to understand our project's structure, setup, and functionalities.
---

## 📌 Table of Contents

- [Demo](#-demo)
- [Documentation](#-documentation)
- [Features](#-features-user-stories-organized-in-sprints)
- [System Requirements](#-system-requirements)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Frontend and Backend Communication](#frontend-and-backend-communication)
  - [Frontend and Backend Build up](#frontend-and-backend-build-up)
  - [Frontend and Backend Deployment](#frontend-and-backend-deployment)
  - [Frontend and Backend Testing](#frontend-and-backend-testing)
- [Changelog](#-changelog)
- [Traceability Matrix](#-traceability-matrix)
- [License](#-license)

---
## 🎥 Demo

Experience our application in action!  
[IT Project Team Recording Live Demo](https://it-project-team-recording.vercel.app)

---
## 📚 Documentation

- **User Stories**: [User Stories PDF](docs/Acceptance%20Criteria.pdf)
- **Architecture**: [Architecture Document PDF](docs/Architectural%20Design.pdf)
- **Frontend Documentation**: [Frontend Documentation PDF](docs/Frontend%20Documentation.pdf)
- **Backend Documentation**: [Backend Documentation PDF](docs/Backend%20Documentation.pdf)
- **Frontend Testing**: [Frontend Testing PDF](docs/Frontend%20Testing.pdf)
- **Backend Testing**: [Backend Testing PDF](docs/Backend%20Testing.pdf)
- **Frontend Deployment**: [Frontend Deployment PDF](docs/Frontend%20Deployment.pdf)
- **Backend Deployment**: [Backend Deployment PDF](docs/Backend%20Deployment.pdf)
---

## 🚀 Features (User Stories Organized in Sprints)
- Our application is built upon a strong foundation of user-centric design. We prioritize features based on the needs and wants of our users, and organize them into sprints for systematic and efficient development. This not only ensures that our application meets the expectations of our users but also delivers a seamless and intuitive experience.
- For detailed key user stories organized in Sprints, see [User Stories](docs/Features.md).
---

## 🖥️ System Requirements

- **Frontend**: React.js, Axios (For API requests)
- **Backend**: Django, Django REST Framework
- **Database**: PostgreSQL
- **Deployment**: Vercel (Frontend), Heroku (Backend)
- **Tools**: npm, Python 3.10
- **Version Control**: git

---

## 🌟 Getting Started

### Prerequisites

- node.js & npm
- Python 3.10
- PostgreSQL 15.4
- Django 4.2.3
- django-cors-headers 4.2.0
- djangorestframework 3.14.0
- djangorestframework-simplejwt 5.3.0
- psycopg2 2.9.7
- drf-yasg 1.21.7

### Installation & Setup

#### 🌐 Frontend:

1. Navigate to the `web` directory: 
    
   ```bash
   cd web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
   
3. Create a `.env` file inside the `web` folder and add the following line: `VITE_API_URL=xxxxxx`, where `xxxxxx` is the URL of the backend API.
4. Run the development server: `npm run dev`
5. Build the project: `npm run build`
6. Run the project: `npm run start`
7. Currently deployed to <https://it-project-team-recording.vercel.app> with Vercel.
8. See more details in the [Frontend Documentation](docs/Frontend%20Documentation.pdf)
#### 📦 Backend:

1. Clone the repository
2. Install the required packages using `pip install -r requirements.txt`
3. Create a PostgreSQL database and add the database credentials to the `settings.py` file.
4. Apply the migrations using `python manage.py migrate`
5. Run the server using `python manage.py runserver`
6. The server will be running locally on `http://localhost:8000/`
7. See more details in the [Backend Documentation](docs/Backend%20Documentation.pdf)

### Frontend and Backend Communication

- The frontend and backend communicate using REST APIs.
- The frontend sends requests to the backend using the `axios` library.
- The backend sends responses to the frontend in the form of JSON objects.
- The backend uses the `django-cors-headers` library to allow cross-origin requests from the frontend.
- The backend uses the `djangorestframework` library to create REST APIs.
- The backend uses the `djangorestframework-simplejwt` library to implement JWT authentication.
- The backend uses the `drf-yasg` library to generate Swagger documentation for the REST APIs.
- The backend uses the `psycopg2` library to connect to the PostgreSQL database.


### Frontend and Backend Build up

- create a new file called `.env` in the root directory of the project.
- Add the following lines to the `.env` file: `VITE_API_URL=http://localhost:8000`
- To fully build up the Front end, see the `README` file in the Front end directory.
- To connect to the Front end, run the server using `python manage.py runserver` and then run the Front end using `npm run dev` in the Front end directory.


### Frontend and Backend Deployment

- The frontend is deployed to Vercel. [Frontend Deployment PDF](docs/Frontend%20Deployment.pdf)
- The backend is deployed to Heroku. [Backend Deployment PDF](docs/Backend%20Deployment.pdf)

### Frontend and Backend Testing

- Frontend is testing manually, see the [Frontend Testing](docs/Frontend%20Testing.pdf) for more details.
- Backend is testing using Django test framework, see the [Backend Testing](docs/Backend%20Testing.pdf) for more details.

---

## 📜 Changelog
- A changelog is a record of all notable changes made to a project, especially one involving software. It's a valuable resource for both developers and users to keep track of the evolution of the software, from major features to minor tweaks. Our changelog captures each step of our software's journey, so you're always in the know about its latest state and its history.

- **Version 1.0.0** - Initial release.
  - **Feature**: User registration system.
  - **Feature**: Login system.
  - **Feature**: Frontend web page for user registration and login.
  
- **Version 1.1.0** - Profile management and audio recording.
  - **Enhancement**: Users can now change their username, email, or password.
  - **Feature**: Audio recording functionality added.

- **Version 1.2.0** - Audio recording management.
  - **Feature**: Users can view their audio recordings.
  - **Enhancement**: Added options to edit or delete user recordings.

- **Version 1.2.1** - Minor bug fixes related to audio recording playback.
  - **Bug Fix**: Fixed a bug where audio recordings would not play.
  - 
- **Version 1.3.0** - Backend and Frontend Deployment.
  - **Feature**: Backend and Frontend Deployment.
  - **Enhancement**: Added options to edit or delete user recordings.
---

## 🔍 Traceability Matrix
- The Traceability Matrix is an essential tool in software development, ensuring that all requirements are met and validated through testing. It provides a clear linkage between the system's requirements and the tests designed to validate those requirements. By maintaining this matrix, we ensure that our software meets the highest quality standards and fulfills the needs of our users.

- For detailed testing and traceability matrix, see [Traceability Matrix](docs/TraceabilityMatrix.md).

---

## 📜 License

This project is licensed under the [Terms and Conditions](docs/Terms%20and%20Conditions.pdf)

---