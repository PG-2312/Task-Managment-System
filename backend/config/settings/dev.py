from decouple import Csv, config

from .base import *  # noqa: F401, F403

DEBUG = True

CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173,http://127.0.0.1:5173',
    cast=Csv(),
)

CORS_ALLOW_CREDENTIALS = True
