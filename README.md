# UrbanSync – Smart Society Management System

A web-based Smart Society Management System designed to simplify residential society operations through a centralized digital platform.

## About the Project

UrbanSync aims to connect society administrators, residents, security staff, and maintenance staff through separate role-based dashboards.

The system is designed to reduce manual work, improve communication, and make everyday society management more organized.

## User Roles

The application is designed for four types of users:

- **Society Admin:** Manages society operations, records, complaints, finances, and reports.
- **Resident:** Views maintenance bills, submits complaints, requests visitor passes, and books facilities.
- **Security Staff:** Handles visitor registration, entry and exit records, and delivery tracking.
- **Maintenance Staff:** Manages assigned complaints, work orders, and maintenance activities.

## Features

### Admin Dashboard
- Dashboard overview and statistics
- Society management modules
- Complaint management
- Rental enquiry interface
- Analytics and graphical reports
- AI-based complaint analysis

### Resident Dashboard
- Maintenance bill overview
- Complaint submission and tracking
- Visitor requests
- Facility booking requests
- Notices and announcements
- Upcoming society events

### Other Planned Modules
- Security and visitor management
- Maintenance staff task management
- Asset and warranty tracking
- Society expenses and payment records
- Community activities and notifications

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Recharts
- Git and GitHub

## Project Structure

```text
UrbanSync/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── dashboards/
│   │   │   ├── ResidentDashboard.jsx
│   │   │   └── ResidentDashboard.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## How to Run the Project

### Prerequisites
- Node.js
- npm
- Visual Studio Code (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vedika-kale/UrbanSync.git
```

2. Navigate to the frontend directory:

```bash
cd UrbanSync/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

## Project Status

**Frontend Development – In Progress**

UrbanSync is currently being developed as a frontend prototype. Demo role-based login and sample dashboard data are used. Backend integration and database connectivity are planned for future development.

## Future Enhancements

- Spring Boot backend integration
- MySQL database connectivity
- Secure authentication and authorization
- Dynamic announcements and event management
- Real-time notifications
- Online maintenance bill payments
- Complete role-based functionality

## Repository

GitHub: https://github.com/vedika-kale/UrbanSync
