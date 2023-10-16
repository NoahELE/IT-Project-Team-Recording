# IT Project Team Recording

The project is a web application that allows users to create and manage their recordings.

## Development

### Frontend

Frontend is located in the `web` folder.

Pre-requisites for the project: node.js, npm.

Steps to run the frontend:

1. Navigate to the `web` folder: `cd web`
2. Install dependencies: `npm install`
3. Create a `.env` file inside the `web` folder and add the following line: `VITE_API_URL=xxxxxx`, where `xxxxxx` is the URL of the backend API.
4. Run the development server: `npm run dev`
5. Build the project: `npm run build`

Currently deployed to <https://it-project-team-recording.vercel.app> with Vercel.


# Django Backend Design for C-LARA Application

This project is the Django backend for the C-LARA application. It is responsible for handling all server-side logic and database & frontend interactions.

## Prerequisites

- Python 3.10
- Django 4.2.3
- django-cors-headers 4.2.0
- djangorestframework 3.14.0
- djangorestframework-simplejwt 5.3.0
- psycopg2 2.9.7
- drf-yasg 1.21.7


## Installation

1. Clone the repository
2. Install the required packages using `pip install -r requirements.txt`
3. Apply the migrations using `python manage.py migrate`
4. Run the server using `python manage.py runserver`
5. The server will be running on `http://localhost:8000/`


## Frontend and Backend Communication

- The frontend and backend communicate using REST APIs.
- The frontend sends requests to the backend using the `axios` library.
- The backend sends responses to the frontend in the form of JSON objects.
- The backend uses the `django-cors-headers` library to allow cross-origin requests from the frontend.
- The backend uses the `djangorestframework` library to create REST APIs.
- The backend uses the `djangorestframework-simplejwt` library to implement JWT authentication.
- The backend uses the `drf-yasg` library to generate Swagger documentation for the REST APIs.
- The backend uses the `psycopg2` library to connect to the PostgreSQL database.


## Frontend and Backend Build up

- create a new file called `.env` in the root directory of the project.
- Add the following lines to the `.env` file: `VITE_API_URL=http://localhost:8000`
- To fully build up the Front end, see the `README` file in the Front end directory.
- To connect to the Front end, run the server using `python manage.py runserver` and then run the Front end using `npm run dev` in the Front end directory.
