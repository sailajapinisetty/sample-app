import React, { useState } from 'react';

// Static array replaces the FastAPI mock database
const INITIAL_FLIGHTS = [
  {"id": 1, "flight_num": "AA-412", "from_code": "JFK", "to_code": "LAX", "status": "On Time", "gate": "B12", "price": 310},
  {"id": 2, "flight_num": "DL-983", "from_code": "LAX", "to_code": "ORD", "status": "Delayed", "gate": "A4", "price": 240},
  {"id": 3, "flight_num": "UA-204", "from_code": "ORD", "to_code": "JFK", "status": "On Time", "gate": "C21", "price": 195},
  {"id": 4, "flight_num": "B6-551", "from_code": "JFK", "to_code": "SFO", "status": "Cancelled", "gate": "T5", "price": 420},
];

function App() {
  const [flights, setFlights] = useState(INITIAL_FLIGHTS);
  const [filterOrigin, setFilterOrigin] = useState('');
  const [activeFlight, setActiveFlight] = useState(null);
  const [passenger, setPassenger] = useState('');
  const [passport, setPassport] = useState('');
  const [alertBanner, setAlertBanner] = useState('');
  const [bookings, setBookings] = useState([]); // Stores bookings in browser memory

  // Simulated endpoint filtering logic
  const handleQuerySchedule = () => {
    if (filterOrigin.trim() === '') {
      setFlights(INITIAL_FLIGHTS);
    } else {
      const filtered = INITIAL_FLIGHTS.filter(
        (f) => f.from_code.toUpperCase() === filterOrigin.toUpperCase()
      );
      setFlights(filtered);
    }
  };

  // Simulated backend booking logic
  const executeReservation = (e) => {
    e.preventDefault();
    
    const ticketReference = `PNR-${1000 + bookings.length}`;
    const confirmedTicket = {
      ticket_reference: ticketReference,
      passenger: passenger,
      passport: passport,
      flight_details: activeFlight
    };

    // Save mock record to local state array
    setBookings([...bookings, confirmedTicket]);
    
    setAlertBanner(`Booking Secured! Ticket Ref: ${ticketReference}`);
    setPassenger('');
    setPassport('');
    setActiveFlight(null);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>✈️ SkyFlow Operations Center </h1>
      </header>

      {/* Query Block */}
      <section style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
        <input 
          type="text" 
          placeholder="Filter Departure Station (e.g., JFK)" 
          value={filterOrigin}
          onChange={(e) => setFilterOrigin(e.target.value)}
          style={{ padding: '10px', width: '280px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
        />
        <button onClick={handleQuerySchedule} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
          Query Schedule
        </button>
      </section>

      {/* Flight Board Mapping */}
      <main style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Live Flight Status</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #edf2f7', textAlign: 'left', color: '#64748b' }}>
              <th style={{ padding: '12px 8px' }}>Identifier</th>
              <th style={{ padding: '12px 8px' }}>Routing</th>
              <th style={{ padding: '12px 8px' }}>Gate</th>
              <th style={{ padding: '12px 8px' }}>Status</th>
              <th style={{ padding: '12px 8px' }}>Fare</th>
              <th style={{ padding: '12px 8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>{f.flight_num}</td>
                <td style={{ padding: '12px 8px' }}>{f.from_code} ➔ {f.to_code}</td>
                <td style={{ padding: '12px 8px' }}>{f.gate}</td>
                <td style={{ padding: '12px 8px', color: f.status === 'On Time' ? '#16a34a' : f.status === 'Delayed' ? '#d97706' : '#dc2626' }}>{f.status}</td>
                <td style={{ padding: '12px 8px' }}>${f.price}</td>
                <td style={{ padding: '12px 8px' }}>
                  <button onClick={() => setActiveFlight(f)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Interaction Modal Window */}
      {activeFlight && (
        <section style={{ marginTop: '30px', padding: '24px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Manifest Processing: {activeFlight.flight_num}</h3>
          <p style={{ margin: '0 0 20px 0', color: '#334155' }}>Route Segment: {activeFlight.from_code} to {activeFlight.to_code} | Gate allocation: {activeFlight.gate}</p>
          <form onSubmit={executeReservation} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Passenger Legal Name" 
              value={passenger} 
              onChange={(e) => setPassenger(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: '1 1 200px' }}
            />
            <input 
              type="text" 
              placeholder="Passport Code Identifier" 
              value={passport} 
              onChange={(e) => setPassport(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: '1 1 200px' }}
            />
            <button type="submit" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
              Issue Ticket File
            </button>
          </form>
        </section>
      )}

      {alertBanner && (
        <div style={{ marginTop: '25px', padding: '15px', background: '#f1f5f9', borderLeft: '4px solid #64748b', borderRadius: '0 4px 4px 0', fontWeight: 500 }}>
          {alertBanner}
        </div>
      )}
    </div>
  );
}

export default App;
