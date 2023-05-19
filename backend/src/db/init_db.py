import os

from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Text,
    Boolean,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

# SQLAlchemy 엔진 생성
ID = os.getenv("DB_ID")
PW = os.getenv("DB_PW")
HOST = os.getenv("DB_HOST")
engine = create_engine(f"mysql://{ID}:{PW}@{HOST}/tap_db?charset=utf8")

# 모델을 위한 기본 베이스 선언
Base = declarative_base()


# 사용자 모델 정의
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    wallet = Column(String(255))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")


# 이벤트 모델 정의
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


# 즐겨찾기 모델 정의
class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    user = relationship("User", backref="favorites")
    event = relationship("Event", backref="favorites")


# 사용자 참여 모델 정의
class UserParticipation(Base):
    __tablename__ = "user_participations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    user = relationship("User", backref="participations")
    event = relationship("Event", backref="participations")


# 테이블 생성
Base.metadata.create_all(engine)
