from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select
from ..models.project import Project


def create_project(session: Session, project_data):
    try:
        project = Project.model_validate(project_data)

        session.add(project)
        session.commit()
        session.refresh(project)

        return project
    
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=400, detail="Project name already exists")


def list_projects(session: Session):
    statement = select(Project)
    return session.exec(statement).all()


def get_project_by_id(session: Session, project_id: int):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project