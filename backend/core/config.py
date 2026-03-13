from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str
    SECRET_KEY: str
    TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"


settings = Settings()