"""Application configuration settings.

This module loads configuration from environment variables (.env file).
Settings are validated using Pydantic and provide defaults where applicable.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration settings.
    
    Loads configuration from environment variables defined in .env file.
    All settings should be configured before running the application.
    """
    
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str
    SECRET_KEY: str
    TOKEN_EXPIRE_MINUTES: int = 10

    class Config:
        env_file = ".env"  # Load environment variables from .env file


# Global settings instance used throughout the application
settings = Settings()