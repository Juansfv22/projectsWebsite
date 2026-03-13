from sqlmodel import Field, SQLModel


class ProjectCreate(SQLModel):
    name: str = Field(unique=True)

class ProjectUpdate(SQLModel):
    name: str | None = None
    description: str | None = None
    image_url: str | None = None
    attachment: str | None = None


class ProjectRead(SQLModel):
    id: int
    name: str
    description: str | None
    image_url: str | None
    attachment: str | None