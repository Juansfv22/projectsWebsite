'''API for managing projects using FastAPI and SQLite database with SQLModel'''


from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .core.database import create_db_and_tables
from .routers import projects_router, auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(title="Mi Portfolio de Proyectos", 
              description="API para gestionar proyectos utilizando FastAPI y base de datos SQLite con SQLModel", 
              lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects_router.router)
app.include_router(auth_router.router)

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")