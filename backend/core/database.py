"""Database configuration and session management.

This module manages PostgreSQL database initialization and provides
dependency injection for database sessions throughout the application.
"""

from sqlmodel import SQLModel, create_engine, Session
from ..core.config import settings

# Load database URL from environment variable
database_url = settings.DATABASE_URL

# Create database engine with PostgreSQL connection
engine = create_engine(
        database_url,
        pool_pre_ping=True,  # Enable connection pool pre-ping to check connections before use
        pool_recycle=300)  # Recycle connections after 5 minutes to prevent stale connections


def create_db_and_tables():
    """Initialize database and create all required tables.
    
    Creates the PostgreSQL database and all tables defined in SQLModel
    models if they don't already exist.
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """Provide database session for API endpoints.
    
    Generator function that creates a new database session for each request.
    Used as a dependency in FastAPI endpoints to interact with the database.
    The session is automatically closed after the request completes.
    
    Yields:
        Session: SQLModel database session for the current request
    """
    with Session(engine) as session:
        yield session