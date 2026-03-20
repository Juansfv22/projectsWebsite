"""Database configuration and session management.

This module handles SQLite database initialization and provides
dependency injection for database sessions throughout the application.
"""

from sqlmodel import SQLModel, create_engine, Session

# SQLite database URL pointing to database/database.db file
sqlite_url = "sqlite:///database/database.db"

# Create database engine with SQLite connection
engine = create_engine(sqlite_url)


def create_db_and_tables():
    """Initialize database and create all required tables.
    
    Creates the SQLite database file and all tables defined in SQLModel
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