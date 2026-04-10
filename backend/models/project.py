"""Project data model for database.

Defines the Project model using SQLModel which combines SQLAlchemy ORM
with Pydantic validation.
"""

from sqlmodel import SQLModel, Field


class Project(SQLModel, table=True):
    """Project portfolio entry.
    
    Represents a portfolio project stored in the database.
    All fields except 'id' and 'name' are optional to allow flexible project entries.
    
    Attributes:
        id: Unique project identifier (auto-generated primary key)
        name: Project name (required, must be unique)
        description: Detailed description of the project (optional)
        image_url: URL to project image or screenshot (optional, currently local images)
        Stack: Technologies used in the project as string (optional)
        attachment: Additional content or resources (optional)
    """
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True)  # Project names must be unique
    description: str | None = None
    image_url: str | None = None
    Stack: str | None = None
    attachment: str | None = None