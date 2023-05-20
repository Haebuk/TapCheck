from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    TIMESTAMP,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


# 스키마에 해당하는 모델 클래스 정의
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    wallet = Column(String(255))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")


class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    thumbnail = Column(String(255))
    location = Column(String(255))
    opening_time = Column(TIMESTAMP)
    is_special = Column(Boolean)
    description = Column(Text)
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    created_user = relationship("User", backref="events")


class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    user = relationship("User", backref="favorites")
    event = relationship("Event", backref="favorites")


class UserParticipation(Base):
    __tablename__ = "user_participations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    user = relationship("User", backref="participations")
    event = relationship("Event", backref="participations")


class PreRegistration(Base):
    __tablename__ = "pre_registrations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    user = relationship("User", backref="pre_registrations")
    event = relationship("Event", backref="pre_registrations")
