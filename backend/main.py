"""FastAPI application for portfolio management.

This module initializes and configures the FastAPI application with:
- CORS (Cross-Origin Resource Sharing) middleware for cross-origin requests
- PostgreSQL database setup with SQLModel ORM
- Authentication and project management routers
- Static file serving for the frontend

The application provides RESTful API endpoints for managing portfolio projects
and admin authentication.
"""

from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .core.database import create_db_and_tables
from .routers import projects_router, auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle events.
    
    Runs once when the application starts. Creates all required database
    tables if they don't exist.
    """
    create_db_and_tables()
    yield


# Initialize FastAPI application with metadata and lifecycle management
app = FastAPI(title="Mi Portfolio de Proyectos", 
              description="API para gestionar proyectos utilizando FastAPI y base de datos PostgreSQL con SQLModel", 
              lifespan=lifespan)

# Configure CORS middleware to allow requests from any origin
# This is necessary for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers for API endpoints
app.include_router(projects_router.router)  # Routes for project CRUD operations
app.include_router(auth_router.router)  # Routes for admin authentication

# Mount frontend static files at root path
# Serves HTML, CSS, and JavaScript files from the "frontend" directory
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")