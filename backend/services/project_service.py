"""Project business logic and database operations.

Provides service functions for project CRUD operations.
Handles database interactions and error handling for project management.
"""

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select
from ..models.project import Project


def create_project(session: Session, project_data):
    """Create a new project.
    
    Creates and saves a new project to the database.
    """
    try:
        # Validate and convert project data to model
        project = Project.model_validate(project_data)

        # Add project to session and commit to database
        session.add(project)
        session.commit()
        session.refresh(project)  # Refresh to get auto-generated ID

        return project
    
    except IntegrityError:
        # Project name already exists (unique constraint violation)
        session.rollback()
        raise HTTPException(status_code=400, detail="Project name already exists")


def list_projects(session: Session):
    """Retrieve all projects.
    
    Fetches all projects from the database.
    """
    statement = select(Project)
    return session.exec(statement).all()


def get_project_by_id(session: Session, project_id: int):
    """Retrieve a project by ID.
    
    Fetches a single project from the database.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


def update_project(session: Session, project_id: int, project_data):
    """Update an existing project.
    
    Updates specified fields of an existing project.
    Only provided fields are updated (partial updates supported).
    """
    # Get existing project
    project = get_project_by_id(session, project_id)
    
    # Extract only provided fields (exclude unset fields for partial updates)
    updates = project_data.model_dump(exclude_unset=True)

    if not updates:
        # No fields to update
        return project

    try:
        # Apply updates to project
        for key, value in updates.items():
            setattr(project, key, value)

        # Save changes to database
        session.add(project)
        session.commit()
        session.refresh(project)
        return project
    except IntegrityError:
        # Updated name already exists (unique constraint violation)
        session.rollback()
        raise HTTPException(status_code=400, detail="Project name already exists")


def delete_project(session: Session, project_id: int):
    """Delete a project.
    
    Removes a project from the database.
    """
    # Get project to ensure it exists
    project = get_project_by_id(session, project_id)
    
    # Delete and commit
    session.delete(project)
    session.commit()