from sqlmodel import Field, SQLModel


class ProjectCreate(SQLModel):
    name: str = Field(unique=True)


class ProjectRead(SQLModel):
    id: int
    name: str
    description: str | None
    image_url: str | None
    attachment: str | None