"""Project management API endpoints.

Provides CRUD (Create, Read, Update, Delete) operations for portfolio projects.
Create, update, and delete operations require JWT authentication.
Read operations (list and get) are publicly accessible.
"""

from fastapi import APIRouter, Depends, Response, status
from sqlmodel import Session
from ..core.database import get_session
from ..schemas.project_schema import ProjectCreate, ProjectRead, ProjectUpdate
from ..services.project_service import (
    create_project,
    delete_project,
    get_project_by_id,
    list_projects,
    update_project,
)
from ..security.auth import verify_token


# Create router with /projects prefix for all routes
router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/", dependencies=[Depends(verify_token)], response_model=ProjectRead)
def create(project: ProjectCreate, session: Session = Depends(get_session)):
    """Create a new project.
    
    Requires JWT authentication. Creates and saves a new project to the database.
    Project names must be unique.
    """
    return create_project(session, project)


@router.get("/", response_model=list[ProjectRead])
def list_all(session: Session = Depends(get_session)):
    """List all projects.
    
    Public endpoint - no authentication required.
    Returns all projects sorted by database order.
    """
    return list_projects(session)


@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, session: Session = Depends(get_session)):
    """Get a single project by ID.
    
    Public endpoint - no authentication required.
    Returns detailed project information.
    """
    return get_project_by_id(session, project_id)
    

@router.patch(
    "/{project_id}",
    dependencies=[Depends(verify_token)],
    response_model=ProjectRead,
)
def edit_project(
    project_id: int,
    project: ProjectUpdate,
    session: Session = Depends(get_session),
):
    """Update an existing project.
    
    Requires JWT authentication. Updates specified fields of a project.
    All fields are optional, allowing partial updates.
    """
    return update_project(session, project_id, project)


@router.delete(
    "/{project_id}",
    dependencies=[Depends(verify_token)],
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_project(project_id: int, session: Session = Depends(get_session)):
    """Delete a project.
    
    Requires JWT authentication. Permanently removes a project from database.
    """
    delete_project(session, project_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
