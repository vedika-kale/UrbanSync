import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">U</div>
          <div>
            <h2>UrbanSync</h2>
            <p>Society Management</p>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="navigation">
          <a href="#dashboard" className="nav-item active">▦ <span>Dashboard</span></a>
          <a href="#residents" className="nav-item">♙ <span>Residents</span></a>
          <a href="#complaints" className="nav-item">🔧 <span>Complaints</span></a>
          <a href="#billing" className="nav-item">₹ <span>Billing & Expenses</span></a>
          <a href="#services" className="nav-item">⌘ <span>Service Bookings</span></a>
          <a href="#visitors" className="nav-item">♧ <span>Visitors</span></a>
          <a href="#notices" className="nav-item">▤ <span>Notice Board</span></a>
          <a href="#rentals" className="nav-item">⌂ <span>Rental Listings</span></a>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <h3>Need help?</h3>
            <p>Contact your society administrator for assistance.</p>
            <button onClick={() => alert('Please contact your society administrator.')}>
              Get Support
            </button>
          </div>
          <div className="admin-profile">
            <div className="avatar">A</div>
            <div>
              <strong>Admin User</strong>
              <p>Administrator</p>
            </div>
            <span className="profile-dots">⋯</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Pages / Dashboard</p>
            <h1>Dashboard Overview</h1>
          </div>
          <div className="topbar-right">
            <div className="date-label">▦ &nbsp; October 23, 2026</div>
            <button className="notification" onClick={() => alert('You are all caught up!')}>
              ♧ <span></span>
            </button>
            <div className="avatar top-avatar">A</div>
          </div>
        </header>

        <section className="welcome-banner">
          <div>
            <p className="welcome-eyebrow">FRIDAY, OCTOBER 23</p>
            <h2>Welcome back, Admin! 👋</h2>
            <p>Here's what's happening in your society today.</p>
            <button onClick={() => document.getElementById('complaints')?.scrollIntoView({ behavior: 'smooth' })}>
              View Complaints <span>→</span>
            </button>
          </div>
          <div className="banner-art" aria-hidden="true">
            <div className="sun"></div>
            <div className="building building-one"></div>
            <div className="building building-two"></div>
            <div className="building building-three"></div>
            <div className="tree">♣</div>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total Residents</span>
              <div className="stat-icon residents-icon">♙</div>
            </div>
            <h2>248</h2>
            <p><span className="positive">↑ 12%</span> <span className="muted">from last month</span></p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Pending Complaints</span>
              <div className="stat-icon complaints-icon">🔧</div>
            </div>
            <h2>18</h2>
            <p><span className="warning">6 urgent</span> <span className="muted">need attention</span></p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Monthly Collection</span>
              <div className="stat-icon collection-icon">₹</div>
            </div>
            <h2>₹4.85L</h2>
            <p><span className="positive">↑ 8.4%</span> <span className="muted">from last month</span></p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Available Flats</span>
              <div className="stat-icon flats-icon">⌂</div>
            </div>
            <h2>12</h2>
            <p><span className="muted">Across 4 buildings</span></p>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel complaints-panel" id="complaints">
            <div className="panel-heading">
              <div>
                <h2>Recent Complaints</h2>
                <p>Track and manage resident complaints</p>
              </div>
              <button className="text-button" onClick={() => alert('All complaints will be available here when that page is built.')}>
                View all →
              </button>
            </div>

            <div className="complaint-table">
              <div className="table-row table-header">
                <span>COMPLAINT</span>
                <span>RESIDENT</span>
                <span>STATUS</span>
              </div>
              <div className="table-row">
                <div className="complaint-name"><span className="issue-icon water">≈</span><div><strong>Water leakage</strong><small>Block A · Flat 102</small></div></div>
                <span className="resident-name">Priya Sharma</span>
                <span className="status pending">Pending</span>
              </div>
              <div className="table-row">
                <div className="complaint-name"><span className="issue-icon electric">ϟ</span><div><strong>Lift not working</strong><small>Block B · Lift 2</small></div></div>
                <span className="resident-name">Rahul Patil</span>
                <span className="status progress">In Progress</span>
              </div>
              <div className="table-row">
                <div className="complaint-name"><span className="issue-icon cleaning">✧</span><div><strong>Cleaning required</strong><small>Block C · Floor 3</small></div></div>
                <span className="resident-name">Sneha Joshi</span>
                <span className="status resolved">Resolved</span>
              </div>
              <div className="table-row">
                <div className="complaint-name"><span className="issue-icon repair">⚒</span><div><strong>Parking light repair</strong><small>Block A · Parking</small></div></div>
                <span className="resident-name">Amit Kulkarni</span>
                <span className="status pending">Pending</span>
              </div>
            </div>
          </article>

          <article className="panel announcements-panel" id="notices">
            <div className="panel-heading">
              <div>
                <h2>Society Notices</h2>
                <p>Latest announcements</p>
              </div>
              <button className="more-button" onClick={() => alert('Notice management will be added next.')}>⋯</button>
            </div>
            <div className="notice-item">
              <div className="notice-icon water-notice">◉</div>
              <div><strong>Water Supply Maintenance</strong><p>Water supply will be interrupted from 10 AM to 1 PM.</p><small>Today · 9:00 AM</small></div>
            </div>
            <div className="notice-item">
              <div className="notice-icon meeting-notice">▣</div>
              <div><strong>Monthly Society Meeting</strong><p>Join us in the community hall this Sunday.</p><small>Yesterday · 4:30 PM</small></div>
            </div>
            <div className="notice-item">
              <div className="notice-icon event-notice">✧</div>
              <div><strong>Diwali Celebration</strong><p>Registrations are now open for the society event.</p><small>Oct 21 · 11:00 AM</small></div>
            </div>
            <button className="all-notices" onClick={() => alert('The full notice board will be added next.')}>View all announcements →</button>
          </article>
        </section>

        <footer className="footer">
          <span>© 2026 UrbanSync Society Management</span>
          <span>Made for better community living ♥</span>
        </footer>
      </main>
    </div>
  )
}

export default App