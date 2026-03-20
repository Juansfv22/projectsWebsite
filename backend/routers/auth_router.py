"""Authentication API endpoints.

Provides admin login endpoint with JWT token generation.
Tokens are used to authenticate requests for creating, updating, and deleting projects.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.config import settings
from ..security.auth import create_token


# Create router with /auth prefix for all routes
router = APIRouter(prefix="/auth", tags=["auth"])


class LoginData(BaseModel):
    """Login request schema."""
    
    username: str
    password: str


@router.post("/login")
def login(data: LoginData):
    """Admin login endpoint.
    
    Authenticates admin credentials and returns JWT token if valid.
    Token is valid for TOKEN_EXPIRE_MINUTES as configured.
    """

    # Verify credentials against configured admin username and password
    if (
        data.username == settings.ADMIN_USERNAME
        and data.password == settings.ADMIN_PASSWORD
    ):
        # Generate JWT token for authenticated requests
        token = create_token()

        return {"access_token": token}

    # Invalid credentials
    raise HTTPException(status_code=401, detail="Invalid credentials")