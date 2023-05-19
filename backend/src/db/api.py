import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.db import schema

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = "tapcheck"

engine = create_engine(f"mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
Session = sessionmaker(bind=engine)
session = Session()


# insert user to users
def insert_user(wallet):
    user = schema.User(wallet=wallet)
    session.add(user)
    session.commit()
    return user


# delete user from users
def delete_user(user_id):
    user = session.query(schema.User).filter(schema.User.id == user_id).first()
    session.delete(user)
    session.commit()
    return user


# create an event
def create_event(
    created_user_id, title, thumbnail, location, opening_time, is_special, description
):
    event = schema.Event(
        created_user_id=created_user_id,
        title=title,
        thumbnail=thumbnail,
        location=location,
        opening_time=opening_time,
        is_special=is_special,
        description=description,
    )
    session.add(event)
    session.commit()
    return event


# get event by id
def get_event(event_id):
    event = session.query(schema.Event).filter(schema.Event.id == event_id).first()
    return event
