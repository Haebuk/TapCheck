from fastapi import FastAPI, status, HTTPException

from src.model import User, Event, Favorite, UserParticipation, PreRegistration
from src.db import api

app = FastAPI()


# home
@app.get("/")
async def root():
    return {"message": "Hello World"}


# get event details
@app.get("/event/{event_id}", status_code=status.HTTP_200_OK)
async def read_event(event_id: int):
    event = api.get_event(event_id)

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found"
        )

    return {"event": event}


# create an event
@app.post("/event")
async def create_event():
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
    # read event from db order by created_at desc
    return {"events": []}
