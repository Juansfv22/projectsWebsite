from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.config import settings
from ..security.auth import create_token


router = APIRouter(prefix="/auth", tags=["auth"])


class LoginData(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginData):

    if (
        data.username == settings.ADMIN_USERNAME
        and data.password == settings.ADMIN_PASSWORD
    ):

        token = create_token()

        return {"access_token": token}

    raise HTTPException(status_code=401, detail="Invalid credentials")