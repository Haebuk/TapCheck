from fastapi import FastAPI, status, HTTPException

from src.model import User, Event, Favorite, UserParticipation, PreRegistration
from src.db import api
from src.utils import utils

app = FastAPI()


# home
@app.get("/")
async def root():
    return {"message": "Hello World"}


# get user
@app.get("/user/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int):
    user = api.read_user(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {"user": user}


# create user
@app.post("/user")
async def create_user(user: User):
    res = api.insert_user(user.wallet)

    if not res:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not created",
        )

    return {"StatusCode": 201, "message": "User created"}


# delete user
@app.delete("/user/{user_id}")
async def delete_user(user_id: int):
    res = api.delete_user(user_id)

    if not res:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not deleted",
        )

    return {"StatusCode": 201, "message": "User deleted"}


# get event details
@app.get("/event/{event_id}", status_code=status.HTTP_200_OK)
async def read_event(event_id: int):
    event = api.get_event(event_id)

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )

    return {"event": event}


# create an event
@app.post("/event")
async def create_event(event: Event):
    code = utils.generate_random_string()
    event.code = code

    res = api.create_event(event)

    if not res:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event not created",
        )

    return {"StatusCode": 201, "message": "Event created"}


# refresh an event
@app.post("/event/refresh")
async def refresh_event():
    # refresh event
    return {"StatusCode": 201, "message": "Event refreshed"}


# like an event
@app.post("/like/{event_id}")
async def like_event(event_id: int):
    # create like event
    return {"StatusCode": 201, "message": "Event liked"}


# get events list
@app.get("/events")
async def read_events():
    # get events list
    events = api.get_events()
    return {"events": events}
