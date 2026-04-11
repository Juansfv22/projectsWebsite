# Projects Portfolio Website

A personal projects portfolio web application built with FastAPI, PostgreSQL and frontend with Tailwind CSS. This app allows users to view a collection of projects, while authenticated admins can create, update, and delete project entries.

## Features

- **Project Management**: CRUD operations for projects (Create, Read, Update, Delete)
- **Authentication**: JWT-based login for admin access to manage projects
- **Responsive Frontend**: Modern UI built with Tailwind CSS
- **PostgreSQL**: Serverless database for storing project data
- **SQLModel ORM**: Database management using OOP
- **CORS Support**: Configured for cross-origin requests
- **Static File Serving**: Frontend served directly from the backend

## Tech Stack

- **Backend**: FastAPI, SQLModel, PostgreSQL
- **Authentication**: Python-Jose for JWT tokens
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Server**: Uvicorn ASGI server

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd projectsWebsite
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a .env file in the root of the project and configure environment variables according to .env.example

## Usage

1. Run the application:
   ```bash
   python run.py
   ```

2. Open your browser and navigate to `http://localhost:8000`

3. For admin access:
   - Go to the login page
   - Use the configured admin credentials to log in
   - Access project management features

## API Endpoints

### Authentication
- `POST /auth/login`: Login with username and password, returns JWT token

### Projects
- `GET /projects/`: List all projects
- `GET /projects/{project_id}`: Get a specific project by ID
- `POST /projects/`: Create a new project (requires authentication)
- `PATCH /projects/{project_id}`: Update a project (requires authentication)
- `DELETE /projects/{project_id}`: Delete a project (requires authentication)

## Project Structure

```
projectsWebsite/
├── backend/
│   ├── core/
│   │   ├── config.py          # Configuration settings
│   │   ├── database.py        # Database setup and session management
│   ├── models/
│   │   └── project.py         # Project data model
│   ├── routers/
│   │   ├── auth_router.py     # Authentication endpoints
│   │   └── projects_router.py # Project CRUD endpoints
│   ├── schemas/
│   │   └── project_schema.py  # Pydantic schemas for API
│   ├── security/
│   │   └── auth.py            # JWT token creation and verification
│   ├── services/
│   │   └── project_service.py # Business logic for projects
│   └── main.py                # FastAPI app setup
├── frontend/
│   ├── index.html             # Main portfolio page
│   ├── login.html             # Admin login page
│   ├── project.html           # Individual project page
│   ├── css/
│   │   └── styles.css         # Additional styles
│   ├── js/
│   │   ├── main.js            # Main page logic
│   │   ├── login.js           # Login page logic
│   │   ├── project.js         # Project page logic
│   │   ├── setupLog.js        # Setup logging
│   │   ├── api/               # API client functions
│   │   └── components/        # Reusable components
│   └── images/                # Static images
├── .env                       # Environment variables
├── run.py                     # Application entry point
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Collaborations

This is a personal portfolio project. I'm not accepting pull requests or contributions. However, feel free to fork and use this code for your own portfolio!
