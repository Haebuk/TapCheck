from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.db import api
from src.utils import utils, qr
from src.utils.model import User, Event, Favorite, UserParticipation, PreRegistration
from src.contracts.checkin import checkin

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# home
@app.get("/")
async def root():
    return {"message": "Hello World"}


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


# get user
@app.get("/user/{user_id:int}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int):
    user = api.read_user(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {"user": user}


# delete user
@app.delete("/user/{user_id:int}")
async def delete_user(user_id: int):
    res = api.delete_user(user_id)

    if not res:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not deleted",
        )

    return {"StatusCode": 201, "message": "User deleted"}


# get user list
@app.get("/user/list", status_code=status.HTTP_200_OK)
async def read_user_list():
    users = api.read_user_list()

    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {"users": users}


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

    return {"StatusCode": 201, "message": "Event created", "event": res}


# get event details
@app.get("/event/{event_id:int}", status_code=status.HTTP_200_OK)
async def read_event(event_id: int):
    event = api.get_event(event_id)

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )

    return {"event": event}


# delete event
@app.delete("/event/{event_id}")
async def delete_event(event_id: int):
    res = api.delete_event(event_id)

    if not res:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event not deleted",
        )

    return {"StatusCode": 201, "message": "Event deleted"}


# get latest event QR code
@app.get("/event/{event_id}/latest")
async def get_latest_qr_code_url(event_id: int):
    event = api.get_event(event_id)

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )

    return f"https://tapcheck-bucket.s3.ap-northeast-2.amazonaws.com/qr/{event_id}/{event.code}.png"


# 이벤트의 현재 난수코드와 QR코드내 난수코드가 일치하는지 확인
@app.get("/event/{event_id}/match/{code}")
async def check_event_code_match(event_id, code):
    latest_event_code = api.get_event(event_id).code
    if latest_event_code == code:
        return True
    return False


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


# get events list
@app.get("/event/list")
async def get_event_list():
    # get events list
    events = api.get_events()
    return {"events": events}


# like an event
@app.post("/like/{event_id}")
async def like_event(event_id: int):
    # create like event
    return {"StatusCode": 201, "message": "Event liked"}
