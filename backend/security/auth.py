"""JWT authentication module.

Handles JWT token creation and validation for admin authentication.
Tokens are required to create, update, or delete projects.
"""

from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..core.config import settings

# JWT algorithm used for token encoding/decoding
ALGORITHM = "HS256"

# Security scheme for HTTP Bearer token authentication
security = HTTPBearer()


def create_token():
    """Create a JWT authentication token.
    
    Generates a JWT token for authenticated requests.
    Token includes admin username and expiration time.
    """
    # Calculate token expiration time
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.TOKEN_EXPIRE_MINUTES
    )

    # Create token payload with username and expiration
    payload = {
        "sub": settings.ADMIN_USERNAME,  # sub = subject (username)
        "exp": expire  # exp = expiration time
    }

    # Encode payload into JWT token
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)

    return token


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT authentication token.
    
    Validates JWT token from HTTP Authorization header.
    Used as a dependency in protected endpoints.
    """
    # Extract token from credentials
    token = credentials.credentials

    try:
        # Decode and validate JWT token
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # Verify that token belongs to admin user
        if payload["sub"] != settings.ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Invalid credentials")

    except:
        # Token is invalid, expired, or tampered with
        raise HTTPException(status_code=401, detail="Invalid credentials")