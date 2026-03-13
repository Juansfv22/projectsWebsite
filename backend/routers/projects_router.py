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


router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/", dependencies=[Depends(verify_token)], response_model=ProjectRead)
def create(project: ProjectCreate, session: Session = Depends(get_session)):
    return create_project(session, project)


@router.get("/", response_model=list[ProjectRead])
def list_all(session: Session = Depends(get_session)):
    return list_projects(session)


@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, session: Session = Depends(get_session)):
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
    return update_project(session, project_id, project)


@router.delete(
    "/{project_id}",
    dependencies=[Depends(verify_token)],
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_project(project_id: int, session: Session = Depends(get_session)):
    delete_project(session, project_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
