
import { useState,useEffect } from "react";
import { getSocieties, addSociety } from "./services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import "./App.css";
import ResidentDashboard from "./dashboards/ResidentDashboard";


const modules = [
  {
    name: "Society Management",
    icon: "🏢",
    description: "Manage societies, buildings, flats, residents and staff.",
    features: ["Society details", "Buildings", "Flat directory", "Residents", "Staff management"],
    records: [
      { id: "F001", name: "Flat A-101", category: "2 BHK", person: "Aarav Sharma", status: "Occupied" },
      { id: "F002", name: "Flat A-102", category: "2 BHK", person: "Available", status: "Vacant" },
      { id: "F003", name: "Flat B-201", category: "3 BHK", person: "Ananya Patil", status: "Occupied" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Society",
  },
  {
    name: "Residents",
    icon: "👥",
    description: "Manage owners, tenants, resident details and occupancy.",
    features: ["Resident directory", "Owner and tenant records", "Contact details", "Occupancy status"],
    records: [
      { id: "R001", name: "Aarav Sharma", category: "Owner", person: "Flat A-101", status: "Active" },
      { id: "R002", name: "Ananya Patil", category: "Resident", person: "Flat B-201", status: "Active" },
      { id: "R003", name: "Rohan Deshmukh", category: "Tenant", person: "Flat C-101", status: "Active" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Resident",
  },
  {
    name: "Security and Entry",
    icon: "🛡️",
    description: "Manage visitor passes, deliveries and domestic staff.",
    features: ["Visitor registration", "Digital visitor passes", "Delivery tracking", "Domestic staff records", "Entry and exit logs"],
    records: [
      { id: "V001", name: "Suresh Kumar", category: "Delivery", person: "Flat A-101", status: "Checked Out" },
      { id: "V002", name: "Meena Joshi", category: "Guest", person: "Flat B-201", status: "Inside" },
      { id: "V003", name: "Ramesh More", category: "Domestic Staff", person: "Flat A-102", status: "Inside" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Register Entry",
  },
  {
    name: "Complaints and Maintenance",
    icon: "🔧",
    description: "Register complaints and track maintenance until resolution.",
    features: ["Register complaint", "Assign staff", "Track status", "Detect duplicate complaints", "Maintenance history"],
    records: [
      { id: "C001", name: "Water leakage", category: "Plumbing", person: "Flat A-101", status: "Pending" },
      { id: "C002", name: "Lift maintenance", category: "Equipment", person: "Building B", status: "In Progress" },
      { id: "C003", name: "Corridor lights", category: "Electrical", person: "Building A", status: "Resolved" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Register Complaint",
  },
  {
    name: "Assets and Maintenance",
    icon: "🧰",
    description: "Maintain asset details, warranties and preventive inspections.",
    features: ["Asset register", "Warranty tracking", "Inspection schedule", "Preventive maintenance", "Repair history"],
    records: [
      { id: "A001", name: "Lift - Building A", category: "Lift", person: "Warranty: Dec 2027", status: "Active" },
      { id: "A002", name: "Water pump", category: "Pump", person: "Warranty: Jun 2027", status: "Active" },
      { id: "A003", name: "Generator", category: "Power Backup", person: "Inspection due", status: "Due" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Asset",
  },
  {
    name: "Home Services",
    icon: "🛠️",
    description: "Find service providers and manage bookings and reviews.",
    features: ["Plumbers", "Electricians", "Cleaning services", "Provider quotations", "Bookings and reviews"],
    records: [
      { id: "S001", name: "Plumbing repair", category: "Plumbing", person: "Flat A-101", status: "Requested" },
      { id: "S002", name: "Electrical repair", category: "Electrical", person: "Flat B-201", status: "Scheduled" },
      { id: "S003", name: "House cleaning", category: "Cleaning", person: "Flat A-102", status: "Completed" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Book Service",
  },
  {
    name: "Finance and Payments",
    icon: "💳",
    description: "Manage maintenance bills, payments, receipts, budgets and expenses.",
    features: ["Maintenance bills", "Payment records", "Receipts", "Expense tracking", "Budget reports"],
    records: [
      { id: "P001", name: "Aarav Sharma", category: "Maintenance", person: "₹2,500", status: "Paid" },
      { id: "P002", name: "Ananya Patil", category: "Maintenance", person: "₹2,500", status: "Pending" },
      { id: "P003", name: "Lift repair", category: "Expense", person: "₹8,000", status: "Recorded" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Record",
  },
  {
    name: "Property Management",
    icon: "🏠",
    description: "List vacant flats and manage rental enquiries.",
    features: ["Vacant-flat listings", "Flat photos", "Rental details", "Rental enquiries", "Lease records"],
    records: [
      { id: "PR001", name: "Flat A-102", category: "2 BHK", person: "₹18,000/month", status: "Available" },
      { id: "PR002", name: "Flat C-301", category: "3 BHK", person: "₹25,000/month", status: "Available" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Listing",
  },
  {
    name: "Events and Facilities",
    icon: "📅",
    description: "Organize society events and reserve shared facilities.",
    features: ["Society events", "Celebrations", "Event registrations", "Hall booking", "Facility availability"],
    records: [
      { id: "E001", name: "Society meeting", category: "Meeting Hall", person: "25 Oct 2026", status: "Scheduled" },
      { id: "E002", name: "Community gathering", category: "Garden", person: "30 Oct 2026", status: "Open" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Event",
  },
  {
    name: "Community and Sustainability",
    icon: "♻️",
    description: "Encourage community participation and sustainable living.",
    features: ["Community polls", "Voting", "Lost and found", "Waste management", "Reuse listings"],
    records: [
      { id: "CM001", name: "Choose garden plants", category: "Poll", person: "Residents", status: "Open" },
      { id: "CM002", name: "Keys found near gate", category: "Lost and Found", person: "Security desk", status: "Unclaimed" },
      { id: "CM003", name: "E-waste collection", category: "Waste Management", person: "Collection point", status: "Scheduled" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Add Listing",
  },
  {
    name: "Communication",
    icon: "🔔",
    description: "Publish announcements and send reminders and emergency information.",
    features: ["Announcements", "Notifications", "Payment reminders", "Complaint updates", "Emergency contacts"],
    records: [
      { id: "N001", name: "Monthly society meeting", category: "Announcement", person: "All Residents", status: "Published" },
      { id: "N002", name: "Water tank cleaning", category: "Reminder", person: "All Residents", status: "Scheduled" },
      { id: "N003", name: "Security desk", category: "Emergency Contact", person: "Reception", status: "Available" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "Create Notice",
  },
  {
    name: "AI and Reporting",
    icon: "🤖",
    description: "Explore AI-assisted complaint analysis and society insights.",
    features: ["Complaint classification", "Image-analysis interface", "Duplicate detection", "Service recommendations", "Cost prediction", "Report summaries"],
    records: [
      { id: "AI001", name: "Water leakage", category: "Suggested: Plumbing", person: "High priority", status: "Demo" },
      { id: "AI002", name: "Repeated lift complaint", category: "Possible duplicate", person: "Review required", status: "Demo" },
      { id: "AI003", name: "Monthly expense overview", category: "Report summary", person: "Sample data", status: "Demo" },
    ],
    columns: ["id", "name", "category", "person", "status"],
    addLabel: "",
  },
];

const initialResidents = [
  { id: "R001", name: "Aarav Sharma", category: "Owner", person: "Flat A-101", status: "Active" },
  { id: "R002", name: "Ananya Patil", category: "Resident", person: "Flat B-201", status: "Active" },
  { id: "R003", name: "Rohan Deshmukh", category: "Tenant", person: "Flat C-101", status: "Active" },
];


const maintenanceChartData = [
  { month: "Jan", collected: 72, pending: 18 },
  { month: "Feb", collected: 85, pending: 15 },
  { month: "Mar", collected: 78, pending: 22 },
  { month: "Apr", collected: 92, pending: 12 },
  { month: "May", collected: 88, pending: 17 },
  { month: "Jun", collected: 95, pending: 10 },
];

const complaintChartData = [
  { name: "Pending", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Resolved", value: 30 },
];

const complaintTrendData = [
  { month: "Jan", complaints: 24 },
  { month: "Feb", complaints: 19 },
  { month: "Mar", complaints: 28 },
  { month: "Apr", complaints: 17 },
  { month: "May", complaints: 13 },
  { month: "Jun", complaints: 10 },
];

const complaintColors = ["#E9A23B", "#4788D8", "#35A879"];


function Status({ value }) {
  const className = String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return <span className={`status-pill status-${className}`}>{value}</span>;
}

const roles = [
  {
    name: "Society Admin",
    icon: "🏢",
    description: "Manage society operations, residents, complaints, finances and reports.",
  },
  {
    name: "Resident",
    icon: "🏠",
    description: "View bills, raise complaints, approve visitors and book facilities.",
  },
  {
    name: "Security Staff",
    icon: "🛡️",
    description: "Register visitors, manage entry and exit, and track deliveries.",
  },
  {
    name: "Maintenance Staff",
    icon: "🧰",
    description: "View assigned complaints, manage work orders and update repair status.",
  },
];

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const demoAccounts = [
    {
      email: "admin@urbansync.demo",
      password: "Admin@123",
      role: "Society Admin",
    },
    {
      email: "resident@urbansync.demo",
      password: "Resident@123",
      role: "Resident",
    },
    {
      email: "security@urbansync.demo",
      password: "Security@123",
      role: "Security Staff",
    },
    {
      email: "maintenance@urbansync.demo",
      password: "Maintain@123",
      role: "Maintenance Staff",
    },
  ];

  function handleLogin(event) {
    event.preventDefault();

    const account = demoAccounts.find(
      (user) =>
        user.email === email.trim().toLowerCase() &&
        user.password === password
    );

    if (account) {
      setError("");
      onLogin(account.role);
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-logo">U</div>
          <div>
            <h2>UrbanSync</h2>
            <span>SMART SOCIETY MANAGEMENT</span>
          </div>
        </div>

        <div className="login-heading">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Sign in to UrbanSync</h1>
          <p>Enter your assigned account credentials to continue.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="field-label">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              required
            />
          </label>

          <label className="field-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button className="primary-button login-button" type="submit">
            Sign In →
          </button>
        </form>

        <p className="login-footer">
          UrbanSync · Frontend demonstration
        </p>
      </div>
    </div>
  );
}


function RoleDashboard({ role, onSwitchRole }) {
  if (role === "Resident") {
    return (
      <div className="resident-app-shell">
        <header className="role-demo-topbar">
          <div className="role-brand">
            <div className="brand-logo">U</div>
            <div>
              <h2>UrbanSync</h2>
              <span>SMART SOCIETY</span>
            </div>
          </div>

          <button
            className="role-switch-button"
            onClick={onSwitchRole}
          >
            Logout
          </button>
        </header>

        <ResidentDashboard />
      </div>
    );
  }

  const dashboardContent = {
    "Security Staff": {
      icon: "🛡️",
      description:
        "Manage visitor entry, exit and society security activities.",
      features: [
        "Register Visitor",
        "Visitor Check-In / Check-Out",
        "Delivery Tracking",
        "Visitors Currently Inside",
        "Domestic Staff Records",
        "Emergency Contacts",
      ],
    },

    "Maintenance Staff": {
      icon: "🧰",
      description:
        "Track assigned repair jobs and update maintenance progress.",
      features: [
        "My Assigned Complaints",
        "Pending Work Orders",
        "In-Progress Tasks",
        "Asset Maintenance",
        "Repair Notes",
        "Completed Work",
      ],
    },
  };

  const content = dashboardContent[role];

  if (!content) {
    return <p>Dashboard not available for this role.</p>;
  }

  return (
    <div className="role-demo-dashboard">
      <header className="role-demo-topbar">
        <div className="role-brand">
          <div className="brand-logo">U</div>
          <div>
            <h2>UrbanSync</h2>
            <span>SMART SOCIETY</span>
          </div>
        </div>

        <button
          className="role-switch-button"
          onClick={onSwitchRole}
        >
          Logout
        </button>
      </header>

      <main className="role-demo-main">
        <p className="eyebrow">{role.toUpperCase()} WORKSPACE</p>

        <div className="role-demo-welcome">
          <span className="role-card-icon">{content.icon}</span>
          <div>
            <h1>{role} Dashboard</h1>
            <p>{content.description}</p>
          </div>
        </div>

        <section className="role-demo-panel">
          <h2>Your Workspace</h2>
          <p>These are the main features planned for this role.</p>

          <div className="role-feature-grid">
            {content.features.map((feature) => (
              <div className="role-feature-card" key={feature}>
                <span>✓</span>
                <strong>{feature}</strong>
                <small>Interface to be developed</small>
              </div>
            ))}
          </div>
        </section>

        <p className="role-demo-note">
          Frontend prototype · Backend integration pending
        </p>
      </main>
    </div>
  );
}


function App(){
  const [selectedRole, setSelectedRole] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [records, setRecords] = useState(() => ({
    ...Object.fromEntries(modules.map((module) => [module.name, module.records])),
    Residents: initialResidents,
  }));
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  // Society data from backend
const [societies, setSocieties] = useState([]);
const [societyLoading, setSocietyLoading] = useState(true);
const [societyError, setSocietyError] = useState("");

// Load societies from Spring Boot backend
useEffect(() => {
    const loadSocieties = async () => {
        try {
            const data = await getSocieties();
            setSocieties(data);
            setSocietyError("");
        } catch (error) {
            console.error("Society loading error:", error);
            setSocietyError("Unable to load societies from backend.");
        } finally {
            setSocietyLoading(false);
        }
    };

    loadSocieties();
}, []);

  const selectedModule = modules.find((module) => module.name === activePage);

// Use actual backend data for Society Management
const rows =
    activePage === "Society Management"
        ? societies
        : records[activePage] || [];
  const filteredRows = rows.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalResidents = records.Residents.length;
  const openComplaints = records["Complaints and Maintenance"].filter(
    (record) => record.status !== "Resolved"
  ).length;
  const pendingPayments = records["Finance and Payments"].filter(
    (record) => record.category === "Maintenance" && record.status === "Pending"
  ).length;
  const activeVisitors = records["Security and Entry"].filter(
    (record) => record.status === "Inside"
  ).length;

  function navigate(page) {
    setActivePage(page);
    setSearch("");
    setMessage("");
    setAnalysisResult(null);
  }

  
async function addRecord() {
  if (!selectedModule?.addLabel) return;

  // Add Society directly to MySQL through the backend
  if (activePage === "Society Management") {
    const societyName = window.prompt("Enter society name:");
    if (!societyName?.trim()) return;

    const address = window.prompt("Enter society address:");
    if (!address?.trim()) return;

    const city = window.prompt("Enter city:");
    if (!city?.trim()) return;

    const state = window.prompt("Enter state:");
    if (!state?.trim()) return;

    const pincode = window.prompt("Enter pincode:");
    if (!pincode?.trim()) return;

    const contactNumber = window.prompt("Enter contact number:");
    if (!contactNumber?.trim()) return;

    const email = window.prompt("Enter society email:");
    if (!email?.trim()) return;

    const societyData = {
      societyName: societyName.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      contactNumber: contactNumber.trim(),
      email: email.trim()
    };

    try {
      const savedSociety = await addSociety(societyData);
      setSocieties((previous) => [...previous, savedSociety]);
      setMessage("Society added successfully to the database!");
    } catch (error) {
      console.error("Society saving error:", error);
      setMessage("Unable to save society. Please check the backend.");
    }

    return;
  }

  // Existing demo functionality for other modules
  const name = window.prompt("Enter a name or description:");
  if (!name?.trim()) return;

  const category = window.prompt("Enter the category:");
  if (!category?.trim()) return;

  const person = window.prompt("Enter flat number, person, date or details:");
  if (!person?.trim()) return;

  const prefix = activePage.split(" ").map((word) => word[0]).join("").toUpperCase();

  const newRecord = {
    id: `${prefix}${Date.now().toString().slice(-5)}`,
    name: name.trim(),
    category: category.trim(),
    person: person.trim(),
    status: activePage === "Finance and Payments" ? "Pending" : "New",
  };

  setRecords((previous) => ({
    ...previous,
    [activePage]: [newRecord, ...previous[activePage]],
  }));

  setMessage("Record added to this demo. It will not persist after refresh.");
}


  function updateStatus(id, status) {
    setRecords((previous) => ({
      ...previous,
      [activePage]: previous[activePage].map((record) =>
        record.id === id ? { ...record, status } : record
      ),
    }));
    setMessage(`Record ${id} updated to "${status}".`);
  }

  function runDemoAnalysis() {
    if (!complaintText.trim()) {
      setAnalysisResult({ type: "warning", text: "Enter a complaint description first." });
      return;
    }

    const text = complaintText.toLowerCase();
    let category = "General Maintenance";
    let priority = "Medium";

    if (/water|leak|pipe|tap|drain/.test(text)) category = "Plumbing";
    else if (/light|electric|wire|power|switch/.test(text)) category = "Electrical";
    else if (/lift|elevator/.test(text)) category = "Lift / Equipment";
    else if (/clean|garbage|waste|smell/.test(text)) category = "Cleaning / Waste";

    if (/urgent|danger|fire|spark|flood|emergency/.test(text)) priority = "High";

    const possibleDuplicate = records["Complaints and Maintenance"].some((record) =>
      record.name.toLowerCase().includes(text.trim()) ||
      text.trim().includes(record.name.toLowerCase())
    );

    setAnalysisResult({
      type: "success",
      text: `Demo suggestion: ${category}. Suggested priority: ${priority}. ${
        possibleDuplicate
          ? "A similar sample record may exist; please review it."
          : "No exact text match found in the sample records."
      } This is a keyword-based frontend demo, not a real AI model.`,
    });
  }

  function renderTable(data, columns) {
    if (!data.length) return <p className="empty-message">No matching records found.</p>;

    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column === "id" ? "ID" : column[0].toUpperCase() + column.slice(1)}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id}>
                {columns.map((column) => (
                  <td key={column}>
                    {column === "status" ? <Status value={record[column]} /> : record[column]}
                  </td>
                ))}
                <td>
                  {activePage === "Complaints and Maintenance" && record.status !== "Resolved" && (
                    <button className="text-button" onClick={() => updateStatus(record.id, "Resolved")}>
                      Resolve
                    </button>
                  )}
                  {activePage === "Finance and Payments" && record.category === "Maintenance" && record.status !== "Paid" && (
                    <button className="text-button" onClick={() => updateStatus(record.id, "Paid")}>
                      Mark paid
                    </button>
                  )}
                  {activePage === "Security and Entry" && record.status === "Inside" && (
                    <button className="text-button" onClick={() => updateStatus(record.id, "Checked Out")}>
                      Check out
                    </button>
                  )}
                  {activePage === "Community and Sustainability" && record.category === "Poll" && record.status === "Open" && (
                    <button className="text-button" onClick={() => updateStatus(record.id, "Voted (demo)")}>
                      Vote
                    </button>
                  )}
                  {activePage === "Events and Facilities" && record.status === "Open" && (
                    <button className="text-button" onClick={() => updateStatus(record.id, "Booked (demo)")}>
                      Book
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderDashboard() {
    return (
      <>
        <div className="stats-grid">
          <div className="stat-card"><span className="stat-icon">👥</span><p>Total Residents</p><h2>{totalResidents}</h2><span className="stat-note">Sample records</span></div>
          <div className="stat-card"><span className="stat-icon">🔧</span><p>Open Complaints</p><h2>{openComplaints}</h2><span className="stat-note">Awaiting resolution</span></div>
          <div className="stat-card"><span className="stat-icon">₹</span><p>Pending Payments</p><h2>{pendingPayments}</h2><span className="stat-note">Sample unpaid bills</span></div>
          <div className="stat-card"><span className="stat-icon">🚪</span><p>Visitors Inside</p><h2>{activeVisitors}</h2><span className="stat-note">Sample entry records</span></div>
        </div>

        
        <section className="panel analytics-panel">
          <div className="panel-header">
            <div>
              <h3>Analytics &amp; Insights</h3>
              <p>Monitor society finances and maintenance performance</p>
            </div>
            <span className="status-pill status-demo">Sample data</span>
          </div>

          <div className="analytics-grid">
            <div className="chart-card">
              <div className="chart-heading">
                <h4>Maintenance Collection</h4>
                <p>Collected vs pending (₹ thousands)</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maintenanceChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}k`} />
                    <Legend />
                    <Bar
                      dataKey="collected"
                      name="Collected"
                      fill="#35A879"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="pending"
                      name="Pending"
                      fill="#E9A23B"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-heading">
                <h4>Complaint Status</h4>
                <p>Breakdown of maintenance complaints</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complaintChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius="70%"
                      paddingAngle={3}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {complaintChartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={complaintColors[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card chart-card-wide">
              <div className="chart-heading">
                <h4>Monthly Complaints Trend</h4>
                <p>Track the number of complaints reported each month</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={complaintTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="complaints"
                      name="Complaints"
                      stroke="#4788D8"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="panel module-overview">
          <div className="panel-header">
            <div><h3>All Project Modules</h3><p>Explore the complete UrbanSync scope</p></div>
          </div>
          <div className="module-grid">
            {modules.map((module) => (
              <button className="module-card" key={module.name} onClick={() => navigate(module.name)}>
                <span className="module-icon">{module.icon}</span>
                <strong>{module.name}</strong>
                <span>{module.description}</span>
                <span className="module-link">Open module →</span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header"><div><h3>Recent Complaints</h3><p>Maintenance requests from sample data</p></div><button className="text-button" onClick={() => navigate("Complaints and Maintenance")}>View all →</button></div>
          {renderTable(records["Complaints and Maintenance"].slice(0, 3), ["id", "name", "category", "person", "status"])}
        </section>
      </>
    );
  }

  function renderAI() {
    return (
      <section className="panel">
        <div className="panel-header"><div><h3>AI Complaint Assistant</h3><p>Try the keyword-based analysis prototype</p></div><span className="status-pill status-demo">Frontend demo</span></div>
        <label className="field-label" htmlFor="complaint-description">Describe the maintenance complaint</label>
        <textarea id="complaint-description" className="analysis-input" rows="4" value={complaintText} onChange={(event) => setComplaintText(event.target.value)} placeholder="Example: Water is leaking near the kitchen tap and flooding the floor." />
        <button className="primary-button" onClick={runDemoAnalysis}>Analyse complaint</button>
        {analysisResult && <div className={`analysis-result ${analysisResult.type}`}>{analysisResult.text}</div>}
        <div className="feature-grid">
          {selectedModule.features.map((feature) => <div className="feature-card" key={feature}><span>✦</span><strong>{feature}</strong><p>Planned capability for the UrbanSync system.</p></div>)}
        </div>
      </section>
    );
  }

  
function renderModule() {
  if (activePage === "Dashboard") return renderDashboard();
  if (activePage === "AI and Reporting") return renderAI();

  return (
    <>
      {/* Module Overview */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>{activePage} Overview</h3>
            <p>{selectedModule.description}</p>
          </div>

          {selectedModule.addLabel && (
            <button className="primary-button" onClick={addRecord}>
              + {selectedModule.addLabel}
            </button>
          )}
        </div>

        <div className="feature-grid">
          {selectedModule.features.map((feature) => (
            <div className="feature-card" key={feature}>
              <span>✓</span>
              <strong>{feature}</strong>
              <p>Included in the planned frontend module.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module Records */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>{activePage} Records</h3>
            <p>
              {activePage === "Society Management"
                ? `${societies.length} society record(s) from database`
                : `${filteredRows.length} record(s) shown · Sample data`}
            </p>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search records..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {activePage === "Society Management" && societyLoading ? (
          <p>Loading societies from database...</p>
        ) : activePage === "Society Management" && societyError ? (
          <p className="empty-message">{societyError}</p>
        ) : (
          renderTable(
            filteredRows,
            activePage === "Society Management"
              ? [
                  "id",
                  "societyName",
                  "address",
                  "city",
                  "state",
                  "pincode",
                  "contactNumber",
                  "email"
                ]
              : selectedModule.columns
          )
        )}
      </section>

      {activePage === "Property Management" && (
        <section className="panel">
          <h3>Rental enquiry form</h3>
          <p className="page-description">
            Prototype enquiry form. It does not send information to a server yet.
          </p>
          <RentalEnquiry
            onSubmit={() =>
              setMessage("Rental enquiry captured in this demonstration only.")
            }
          />
        </section>
      )}
    </>
  );
}

  
    if (!selectedRole) {
  return <LoginScreen onLogin={setSelectedRole} />;
}

  if (selectedRole !== "Society Admin") {
    return (
      <RoleDashboard
        role={selectedRole}
        onSwitchRole={() => setSelectedRole(null)}
      />
    );
  }


  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-logo">U</div><div><h2>UrbanSync</h2><span>SMART SOCIETY</span></div></div>
        
<div className="nav-label">WORKSPACE</div>

<nav className="nav-menu">
  <button
    className={`nav-item ${activePage === "Dashboard" ? "active" : ""}`}
    onClick={() => navigate("Dashboard")}
  >
    <span className="nav-icon">▦</span>
    <span>Dashboard</span>
  </button>

  <div className="nav-section-label">SOCIETY MANAGEMENT</div>
  {modules
    .filter((module) =>
      ["Society Management", "Residents", "Property Management"].includes(
        module.name
      )
    )
    .map((module) => (
      <button
        key={module.name}
        className={`nav-item ${activePage === module.name ? "active" : ""}`}
        onClick={() => navigate(module.name)}
      >
        <span className="nav-icon">{module.icon}</span>
        <span>{module.name}</span>
      </button>
    ))}

  <div className="nav-section-label">OPERATIONS</div>
  {modules
    .filter((module) =>
      [
        "Security and Entry",
        "Complaints and Maintenance",
        "Assets and Maintenance",
        "Home Services",
      ].includes(module.name)
    )
    .map((module) => (
      <button
        key={module.name}
        className={`nav-item ${activePage === module.name ? "active" : ""}`}
        onClick={() => navigate(module.name)}
      >
        <span className="nav-icon">{module.icon}</span>
        <span>{module.name}</span>
      </button>
    ))}

  <div className="nav-section-label">FINANCE & COMMUNITY</div>
  {modules
    .filter((module) =>
      [
        "Finance and Payments",
        "Events and Facilities",
        "Community and Sustainability",
        "Communication",
        "AI and Reporting",
      ].includes(module.name)
    )
    .map((module) => (
      <button
        key={module.name}
        className={`nav-item ${activePage === module.name ? "active" : ""}`}
        onClick={() => navigate(module.name)}
      >
        <span className="nav-icon">{module.icon}</span>
        <span>{module.name}</span>
      </button>
    ))}
</nav>

        <div className="sidebar-footer"><div className="admin-avatar">A</div><div><strong>Society Admin</strong><span>Administrator · Demo</span></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">UrbanSync / {activePage}</div>

          <div className="topbar-right">
            <span className="today-label">Society Workspace</span>

            <button
  className="role-switch-button"
  onClick={() => setSelectedRole(null)}
>
  Logout
</button>

            <div className="topbar-avatar">A</div>
          </div>
        </header>
        <div className="page-container">
          <div className="page-header">
            <div><p className="eyebrow">SMART SOCIETY MANAGEMENT</p><h1>{activePage}</h1><p className="page-description">{activePage === "Dashboard" ? "One place to manage your society's everyday activities." : selectedModule?.description}</p></div>
          </div>
          {message && <div className="notice-message">{message}<button onClick={() => setMessage("")} aria-label="Dismiss message">×</button></div>}
          {renderModule()}
          <footer className="app-footer">UrbanSync · Smart Society Management System · Frontend Prototype</footer>
        </div>
      </main>
    </div>
  );
}

function RentalEnquiry({ onSubmit }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [flat, setFlat] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!name.trim() || !contact.trim() || !flat.trim()) return;
    onSubmit();
    setName("");
    setContact("");
    setFlat("");
  }

  return (
    <form className="rental-form" onSubmit={submit}>
      <label className="field-label">Enquirer name<input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Enter your name" /></label>
      <label className="field-label">Contact details<input value={contact} onChange={(event) => setContact(event.target.value)} required placeholder="Phone or email" /></label>
      <label className="field-label">Flat of interest<input value={flat} onChange={(event) => setFlat(event.target.value)} required placeholder="Example: Flat A-102" /></label>
      <button className="primary-button" type="submit">Submit enquiry</button>
    </form>
  );
}

export default App;