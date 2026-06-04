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
      <header id="header" style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 id="title" style={{ fontSize: '2rem', margin: 0 }}>✈️ SkyFlow Operations Center </h1>
      </header>

      {/* Query Block */}
      <section id="query-block" style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
        <input 
          id="filter-origin"
          type="text" 
          placeholder="Filter Departure Station (e.g., JFK)" 
          value={filterOrigin}
          onChange={(e) => setFilterOrigin(e.target.value)}
          style={{ padding: '10px', width: '280px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
        />
        <button id="query-schedule-btn" onClick={handleQuerySchedule} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
          Query Schedule
        </button>
        <button id="reset-btn" onClick={() => { setFilterOrigin(''); setFlights(INITIAL_FLIGHTS); }} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer' }}>
          Reset
        </button>
        <button id="add-random-flight" onClick={() => {
          const newFlight = { id: Date.now(), flight_num: `FX-${Math.floor(Math.random()*900)}`, from_code: 'SFO', to_code: 'SEA', status: 'On Time', gate: 'D1', price: 150 };
          setFlights([newFlight, ...flights]);
        }} style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer' }}>
          Add Random Flight
        </button>
      </section>

      {/* Flight Board Mapping */}
      <main style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 id="flight-board-title" style={{ fontSize: '1.25rem', marginTop: 0 }}>Live Flight Status</h2>
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
              <tr id={`flight-row-${f.id}`} key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td id={`flight-num-${f.id}`} style={{ padding: '12px 8px', fontWeight: 600 }}>{f.flight_num}</td>
                <td id={`flight-route-${f.id}`} style={{ padding: '12px 8px' }}>{f.from_code} ➔ {f.to_code}</td>
                <td id={`flight-gate-${f.id}`} style={{ padding: '12px 8px' }}>{f.gate}</td>
                <td id={`flight-status-${f.id}`} style={{ padding: '12px 8px', color: f.status === 'On Time' ? '#16a34a' : f.status === 'Delayed' ? '#d97706' : '#dc2626' }}>{f.status}</td>
                <td id={`flight-fare-${f.id}`} style={{ padding: '12px 8px' }}>${f.price}</td>
                <td style={{ padding: '12px 8px', display: 'flex', gap: '8px' }}>
                  <button id={`select-${f.id}`} onClick={() => setActiveFlight(f)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Select
                  </button>
                  <button id={`details-${f.id}`} onClick={() => alert(JSON.stringify(f))} style={{ background: '#94a3b8', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Details
                  </button>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input id={`chk-${f.id}`} type="checkbox" />
                    <span style={{ fontSize: '0.85rem', color: '#475569' }}>Watch</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Interaction Modal Window */}
      {activeFlight && (
        <section id="active-flight-section" style={{ marginTop: '30px', padding: '24px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
          <h3 id="active-flight-title" style={{ margin: '0 0 10px 0' }}>Manifest Processing: {activeFlight.flight_num}</h3>
          <p id="active-flight-desc" style={{ margin: '0 0 20px 0', color: '#334155' }}>Route Segment: {activeFlight.from_code} to {activeFlight.to_code} | Gate allocation: {activeFlight.gate}</p>
          <form id="reservation-form" onSubmit={executeReservation} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <input 
              id="passenger-name"
              type="text" 
              placeholder="Passenger Legal Name" 
              value={passenger} 
              onChange={(e) => setPassenger(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: '1 1 200px' }}
            />
            <input 
              id="passport-id"
              type="text" 
              placeholder="Passport Code Identifier" 
              value={passport} 
              onChange={(e) => setPassport(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', flex: '1 1 200px' }}
            />
            <select id="seat-class" value={''} onChange={() => {}} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}> 
              <input id="notify-checkbox" type="checkbox" />
              <span>Send SMS notification</span>
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button id="issue-ticket" type="submit" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
                Issue Ticket File
              </button>
              <button id="cancel-selection" type="button" onClick={() => setActiveFlight(null)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {alertBanner && (
        <div id="alert-banner" style={{ marginTop: '25px', padding: '15px', background: '#f1f5f9', borderLeft: '4px solid #64748b', borderRadius: '0 4px 4px 0', fontWeight: 500 }}>
          {alertBanner}
        </div>
      )}

      {/* Bookings list */}
      <section id="bookings" style={{ marginTop: '24px' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Recent Bookings</h4>
        {bookings.length === 0 ? (
          <div id="no-bookings" style={{ color: '#94a3b8' }}>No bookings yet</div>
        ) : (
          <ul id="bookings-list">
            {bookings.map((b, idx) => (
              <li id={`booking-${idx}`} key={b.ticket_reference} style={{ marginBottom: '8px' }}> {b.ticket_reference} — {b.passenger} — {b.flight_details.flight_num} </li>
            ))}
          </ul>
        )}
        <button id="export-bookings" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(bookings)); setAlertBanner('Bookings copied to clipboard'); }} style={{ marginTop: '10px', background: '#0ea5a4', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
          Export Bookings
        </button>
      </section>
    </div>
  );
}

export default App;
