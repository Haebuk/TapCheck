from datetime import datetime
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

from src.db import schema
from src.utils.model import User, Event

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = "tapcheck"

engine = create_engine(f"mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
Session = sessionmaker(bind=engine)
session = Session()


# insert user to users
def insert_user(wallet: str):
    user = schema.User(wallet=wallet)
    session.add(user)
    session.commit()
    return user


# read user from users
def read_user(user_id: int):
    user = session.query(schema.User).filter(schema.User.id == user_id).first()
    return user


def delete_user(user_id: int):
    try:
        user = session.query(schema.User).filter(schema.User.id == user_id).first()
        if user:
            session.delete(user)
            session.commit()
            return user
        else:
            return None
    except SQLAlchemyError as e:
        # SQLAlchemyError 예외 처리
        session.rollback()  # 롤백 수행
        print("SQLAlchemy 에러 발생:", str(e))
        # 추가적인 에러 처리 로직 수행

    return None


# create an event
def create_event(event: Event):
    event = schema.Event(
        created_user_id=event.created_user_id,
        title=event.title,
        thumbnail=event.thumbnail,
        location=event.location,
        opening_time=event.opening_time,
        is_special=event.is_special,
        description=event.description,
        code=event.code,
    )
    try:
        session.add(event)
        session.commit()
    except SQLAlchemyError as e:
        session.rollback()
        print("SQLAlchemy 에러 발생:", str(e))
        return None
    return event


# get event by id
def get_event(event_id):
    event = session.query(schema.Event).filter(schema.Event.id == event_id).first()
    return event


# get events
def get_events():
    events = session.query(schema.Event).all()
    return events
