from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..core.database import get_session
from ..schemas.project_schema import ProjectCreate, ProjectRead
from ..services.project_service import create_project, list_projects, get_project_by_id
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
    
