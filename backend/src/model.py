from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    id: int
    wallet: str
    create_at: datetime


class Event(BaseModel):
    id: int
    created_user_id: int
    title: str
    thumbnail: str
    location: str
    opening_time: datetime
    is_special: bool
    description: str
    created_user: User


class Favorite(BaseModel):
    id: int
    user_id: int
    event_id: int
    create_at: datetime
    user: User
    event: Event


class UserParticipation(BaseModel):
    id: int
    user_id: int
    event_id: int
    create_at: datetime
    user: User
    event: Event


class PreRegistration(BaseModel):
    id: int
    user_id: int
    event_id: int
    create_at: datetime
    user: User
    event: Event
