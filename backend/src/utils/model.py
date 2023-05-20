from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    # id: int
    wallet: str
    # create_at: datetime


class Event(BaseModel):
    created_user_id: int
    title: str
    opening_time: str
    addr: str
    thumbnail: str | None = None
    location: str | None = None
    is_special: bool = False
    description: str | None = None
    code: str | None = None


class Favorite(BaseModel):
    id: int
    user_id: int
    event_id: int
    create_at: datetime


class UserParticipation(BaseModel):
    id: int
    user_id: int
    event_id: int
    create_at: datetime


class PreRegistration(BaseModel):
    id: int
    user_id: int
    event_id: int
    create_at: datetime
