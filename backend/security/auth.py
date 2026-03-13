from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..core.config import settings

ALGORITHM = "HS256"

security = HTTPBearer()


def create_token():

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": settings.ADMIN_USERNAME,
        "exp": expire
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)

    return token


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload["sub"] != settings.ADMIN_USERNAME:
            raise HTTPException(status_code=401)

    except:
        raise HTTPException(status_code=401)
    