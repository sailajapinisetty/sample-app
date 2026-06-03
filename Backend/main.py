from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Airline Core API", version="1.0.0")

# Enable Cross-Origin Resource Sharing (CORS) for front-end integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory Mock Data Sources
FLIGHT_DATABASE = [
    {"id": 1, "flight_num": "AA-412", "from_code": "JFK", "to_code": "LAX", "status": "On Time", "gate": "B12", "price": 310},
    {"id": 2, "flight_num": "DL-983", "from_code": "LAX", "to_code": "ORD", "status": "Delayed", "gate": "A4", "price": 240},
    {"id": 3, "flight_num": "UA-204", "from_code": "ORD", "to_code": "JFK", "status": "On Time", "gate": "C21", "price": 195},
    {"id": 4, "flight_num": "B6-551", "from_code": "JFK", "to_code": "SFO", "status": "Cancelled", "gate": "T5", "price": 420},
]

BOOKING_DATABASE = []

# Input Validation Schemas
class TicketSubmission(BaseModel):
    flight_id: int
    passenger_name: str
    passport_number: str

@app.get("/api/flights")
def list_flights(origin: Optional[str] = None):
    """Retrieve available flights, filtering by origin city code if provided."""
    if origin:
        return [f for f in FLIGHT_DATABASE if f["from_code"].upper() == origin.upper()]
    return FLIGHT_DATABASE

@app.post("/api/bookings", status_code=21)
def process_booking(payload: TicketSubmission):
    """Process flight matching payload data and archive booking sequence."""
    flight_match = next((f for f in FLIGHT_DATABASE if f["id"] == payload.flight_id), None)
    if not flight_match:
        raise HTTPException(status_code=404, detail="Requested flight scheme does not exist.")
    
    confirmed_ticket = {
        "ticket_reference": f"PNR-{1000 + len(BOOKING_DATABASE)}",
        "passenger": payload.passenger_name,
        "passport": payload.passport_number,
        "flight_details": flight_match
    }
    BOOKING_DATABASE.append(confirmed_ticket)
    return {"status": "success", "data": confirmed_ticket}
