"""Pydantic schemas for project API endpoints.

Defines request/response schemas for project-related API endpoints.
These schemas handle data validation and API documentation.
"""

from sqlmodel import Field, SQLModel


class ProjectCreate(SQLModel):
    """Schema for creating a new project.
    
    Used when receiving project creation requests from the frontend.
    Only requires the project name; other fields are optional and set later.
    """
    name: str = Field(unique=True)

class ProjectUpdate(SQLModel):
    """Schema for updating an existing project.
    
    Used when receiving project update requests from the frontend.
    All fields are optional to allow partial updates.
    """
    name: str | None = None
    description: str | None = None
    stack: str | None = None
    attachment: str | None = None


class ProjectRead(SQLModel):
    """Schema for reading/returning project data in API responses.
    
    Used when returning project data to the frontend.
    Includes all project fields that should be visible to clients.
    """
    id: int
    name: str
    description: str | None
    stack: str | None
    attachment: str | None