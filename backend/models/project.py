from sqlmodel import SQLModel, Field


class Project(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    description: str | None = None
    image_url: str | None = None
    attachment: str | None = None