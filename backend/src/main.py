from fastapi import FastAPI

app = FastAPI()

# home
@app.get("/")
async def root():
    return {"message": "Hello World"}

# get event details
@app.get("/event/{event_id}")
async def read_event(event_id: int):
    # read event from db
    return {"event": {}}

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