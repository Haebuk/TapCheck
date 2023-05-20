from fastapi import FastAPI, status, HTTPException

from src.db import api
from src.utils import utils, qr
from src.utils.model import User, Event, Favorite, UserParticipation, PreRegistration
from src.contracts.checkin import checkin

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

    qr_url = qr.generate_qr(event_id=res.id, code=res.code)

    if not qr_url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event not created",
        )

    return {"StatusCode": 201, "message": "Event created"}


@app.post("/event/{event_id}/checkin/{code}")
async def checkin_event(event_id: int, code: str, user: User):
    current_event_code = api.get_event(event_id).code
    if current_event_code != code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid code",
        )

    user_wallet_address = user.wallet
    # checkin event
    res = checkin(user_wallet_address, event_id)
    return res


# refresh an event
@app.post("/event/{event_id}/refresh")
async def refresh_event(event_id: int):
    # refresh event
    new_code = utils.generate_random_string()
    res = api.refresh_event(event_id, new_code)
    if not res:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event not refreshed",
        )

    qr_url = qr.generate_qr(event_id=event_id, code=new_code)

    if not qr_url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Generate QR failed",
        )

    return {
        "StatusCode": 201,
        "message": "Event refreshed",
        "event_id": event_id,
        "code": new_code,
    }


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
