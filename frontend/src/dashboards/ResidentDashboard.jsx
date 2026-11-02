
import { useState } from "react";
import "./ResidentDashboard.css";

export default function ResidentDashboard() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Water leakage in bathroom",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Lift maintenance issue",
      status: "Pending",
    },
  ]);

  const [complaintTitle, setComplaintTitle] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorPurpose, setVisitorPurpose] = useState("");
  const [facility, setFacility] = useState("Clubhouse");
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");

  const [visitors, setVisitors] = useState([
    { id: 1, name: "Delivery Partner", purpose: "Parcel delivery" },
  ]);

  const [bookings, setBookings] = useState([]);

  function addComplaint(event) {
    event.preventDefault();

    if (!complaintTitle.trim()) return;

    setComplaints((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: complaintTitle.trim(),
        status: "Pending",
      },
    ]);

    setComplaintTitle("");
    setMessage("Complaint submitted successfully.");
  }

  function addVisitor(event) {
    event.preventDefault();

    if (!visitorName.trim() || !visitorPurpose.trim()) return;

    setVisitors((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: visitorName.trim(),
        purpose: visitorPurpose.trim(),
      },
    ]);

    setVisitorName("");
    setVisitorPurpose("");
    setMessage("Visitor request added.");
  }

  function addBooking(event) {
    event.preventDefault();

    if (!bookingDate) return;

    setBookings((previous) => [
      ...previous,
      {
        id: Date.now(),
        facility,
        date: bookingDate,
      },
    ]);

    setBookingDate("");
    setMessage("Facility booking request added.");
  }

  return (
    <div className="resident-dashboard">
      <header className="resident-header">
        <div>
          <p className="resident-eyebrow">URBANSYNC / RESIDENT</p>
          <h1>Resident Dashboard</h1>
          <p className="resident-subtitle">
            Manage your home, requests, visitors and community activities.
          </p>
        </div>

        <div className="resident-avatar">R</div>
      </header>

      {message && (
        <div className="resident-message">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      <section className="resident-stats">
        <article className="resident-stat-card">
          <span>My Complaints</span>
          <strong>{complaints.length}</strong>
          <small>All submitted complaints</small>
        </article>

        <article className="resident-stat-card">
          <span>Pending Complaints</span>
          <strong>
            {complaints.filter((item) => item.status === "Pending").length}
          </strong>
          <small>Awaiting action</small>
        </article>

        <article className="resident-stat-card">
          <span>Visitor Requests</span>
          <strong>{visitors.length}</strong>
          <small>Demo visitor list</small>
        </article>

        <article className="resident-stat-card">
          <span>Facility Bookings</span>
          <strong>{bookings.length}</strong>
          <small>Requests created here</small>
        </article>
      </section>

      <section className="resident-panel-grid">
        <article className="resident-panel">
          <h2>My Maintenance Bills</h2>
          <p className="resident-muted">
            View your society maintenance payment information.
          </p>

          <div className="resident-bill">
            <div>
              <strong>October Maintenance</strong>
              <p>Sample bill · Flat A-204</p>
            </div>
            <strong>₹3,500</strong>
          </div>

          <span className="resident-status resident-status-pending">
            Payment status: Demo
          </span>
        </article>

        <article className="resident-panel">
          <h2>Submit a Complaint</h2>
          <p className="resident-muted">
            Report a repair or society-related issue.
          </p>

          <form onSubmit={addComplaint} className="resident-form">
            <label htmlFor="complaintTitle">Complaint description</label>
            <input
              id="complaintTitle"
              value={complaintTitle}
              onChange={(event) => setComplaintTitle(event.target.value)}
              placeholder="e.g. Water leakage"
              required
            />
            <button type="submit" className="resident-primary-button">
              Submit Complaint
            </button>
          </form>
        </article>

        <article className="resident-panel">
          <h2>My Complaints</h2>

          <div className="resident-list">
            {complaints.map((complaint) => (
              <div className="resident-list-item" key={complaint.id}>
                <div>
                  <strong>{complaint.title}</strong>
                  <p>Complaint #{complaint.id}</p>
                </div>
                <span className="resident-status">
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="resident-panel">
          <h2>Visitor Requests</h2>
          <p className="resident-muted">
            Add a visitor request for the demo.
          </p>

          <form onSubmit={addVisitor} className="resident-form">
            <label htmlFor="visitorName">Visitor name</label>
            <input
              id="visitorName"
              value={visitorName}
              onChange={(event) => setVisitorName(event.target.value)}
              placeholder="Enter visitor name"
              required
            />

            <label htmlFor="visitorPurpose">Purpose of visit</label>
            <input
              id="visitorPurpose"
              value={visitorPurpose}
              onChange={(event) => setVisitorPurpose(event.target.value)}
              placeholder="e.g. Guest or delivery"
              required
            />

            <button type="submit" className="resident-primary-button">
              Add Visitor Request
            </button>
          </form>

          <div className="resident-list">
            {visitors.map((visitor) => (
              <div className="resident-list-item" key={visitor.id}>
                <div>
                  <strong>{visitor.name}</strong>
                  <p>{visitor.purpose}</p>
                </div>
                <span className="resident-status">Requested</span>
              </div>
            ))}
          </div>
        </article>

        <article className="resident-panel">
          <h2>Facility Bookings</h2>
          <p className="resident-muted">
            Request a date for a society facility.
          </p>

          <form onSubmit={addBooking} className="resident-form">
            <label htmlFor="facility">Choose facility</label>
            <select
              id="facility"
              value={facility}
              onChange={(event) => setFacility(event.target.value)}
            >
              <option>Clubhouse</option>
              <option>Community Hall</option>
              <option>Sports Court</option>
            </select>

            <label htmlFor="bookingDate">Booking date</label>
            <input
              id="bookingDate"
              type="date"
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
              required
            />

            <button type="submit" className="resident-primary-button">
              Request Booking
            </button>
          </form>

          {bookings.map((booking) => (
            <div className="resident-list-item" key={booking.id}>
              <div>
                <strong>{booking.facility}</strong>
                <p>{booking.date}</p>
              </div>
              <span className="resident-status">Requested</span>
            </div>
          ))}
        </article>

        
      <article className="resident-panel">
        <h2>Notices &amp; Announcements</h2>

        <div className="resident-notice">
          <strong>Monthly Society Meeting</strong>
          <p>Residents are requested to attend the monthly society meeting.</p>
          <small>Date: 30 October 2026 · Venue: Society Clubhouse</small>
        </div>

        <div className="resident-notice">
          <strong>Water Supply Update</strong>
          <p>Please check society announcements for scheduled maintenance.</p>
          <small>Date: 28 October 2026 · Time: 10:00 AM</small>
        </div>

        <div className="resident-notice">
          <strong>Community Activities</strong>
          <p>Check upcoming events and facility availability.</p>
          <small>Date: 2 November 2026 · Venue: Community Hall</small>
        </div>
      </article>

      <article className="resident-panel">
        <h2>Upcoming Events</h2>

        <div className="resident-notice">
          <strong>Diwali Community Celebration</strong>
          <p>Join your neighbours for the society's festive celebration.</p>
          <small>Date: 1 November 2026 · Time: 6:00 PM</small>
        </div>

        <div className="resident-notice">
          <strong>Yoga and Wellness Session</strong>
          <p>Participate in a morning wellness session for residents.</p>
          <small>Date: 5 November 2026 · Time: 7:00 AM</small>
        </div>

        <div className="resident-notice">
          <strong>Society Cleanliness Drive</strong>
          <p>Help keep our common areas clean and green.</p>
          <small>Date: 8 November 2026 · Time: 8:00 AM</small>
        </div>
      </article>

      </section>

      <p className="resident-demo-note">
        Demo mode: information is stored in temporary page state and will reset
        when the page is refreshed. No backend is connected yet.
      </p>
    </div>
  );
}