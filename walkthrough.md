# Elite Rail - Premium Railway Booking Portal — Walkthrough

## What Was Built
A complete, full-stack Relational Database Management System (RDBMS) mini-project for high-speed premium railway bookings. Featuring a gorgeous glassmorphic React frontend, custom designed and optimized Node.js express APIs, and an integrated SQLite3 database that implements primary keys, foreign key references, and relational mappings.

---

## Technology Stack
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Database** | SQLite (`sqlite3`) | Relational database with users, trains, and bookings tables linked via Foreign Keys. |
| **Backend** | Node.js + Express.js | RESTful API server running on port `5000` with request logging and CORS handling. |
| **Frontend** | React.js (Vite) | Single Page Application (SPA) running on port `5173` with dynamic routing. |
| **Styling** | Vanilla CSS (Glassmorphic design system) | Backdrop blurs, harmonious premium colors (navy, gold, white), responsive flexbox grids. |
| **Routing** | React Router v7 | Dynamic, fast client-side navigation. |

---

## Project Structure
```text
Online Railway Booking/
├── backend/                  # Node.js + Express.js API Server
│   ├── database.js           # SQLite3 verbose connection & serialize setup
│   ├── index.js              # REST endpoints (authentication, trains, bookings)
│   ├── railway.db            # Active SQLite database file
│   ├── schema.sql            # Table definitions (users, trains, bookings) & seed data
│   └── package.json          # Server dependencies (express, cors, sqlite3)
├── frontend/                 # React + Vite Client Application
│   ├── src/
│   │   ├── api/              # Axios client setup & unified backend connectors
│   │   ├── components/       # Reusable modular UI units (Navbar, Logo, GlassCard)
│   │   ├── pages/            # Passenger pages (Dashboard, Scheduling, Booking, Journeys)
│   │   ├── index.css         # Global CSS style tokens & custom layout system
│   │   ├── App.jsx           # Main layout, client-side routes & route controls
│   │   └── main.jsx          # App element mount bootstrapping
│   ├── index.html            # Static entrypoint, page title & favicon setup
│   └── package.json          # Client dependencies (framer-motion, lucide-react)
├── interfaces/               # Visual asset locker
│   ├── booking.png           # Interactive seat map selection screenshot
│   ├── dashboard.png         # Main user travel overview dashboard screenshot
│   ├── er_diagram.png        # Chen-style ER diagram (Chen ER Spec)
│   ├── favicon.svg           # Page tab branding SVG vector
│   ├── hero-bg.png           # Home page background banner gradient
│   ├── journeys.png          # Active e-tickets listing ledger screenshot
│   ├── schema_diagram.png    # Crow's foot notation database schema diagram
│   └── scheduling.png        # Scheduled routes admin management console screenshot
├── README.md                 # Primary project overview, installation, running instructions
└── package.json              # Workspace-wide concurrent service executor config
```

---

## Database Schema (DBMS Concepts Demonstrated)

### Tables
1. **`users`** — Stores credentials, full names, login emails, and authorization access roles (`user` or `admin`).
2. **`trains`** — Catalog of luxury train schedules, route locations (`source` and `destination`), scheduled times, capacity bounds, and basic fares.
3. **`bookings`** — Core transaction ledger referencing passenger users via **Foreign Keys** and specific journeys, storing seat assignments and travel timelines.

### SQL View / JOIN Relationships
A central join query links passenger transactions with their scheduled train route details:
```sql
SELECT b.*, t.name as train_name, t.source, t.destination, t.departure_time, t.price_base 
FROM bookings b 
JOIN trains t ON b.train_id = t.id 
WHERE b.user_id = ?
ORDER BY b.travel_date ASC;
```
*This showcases how the **JOIN** operation successfully reconstructs complete transaction records from normalized tables in real time.*

### Other DBMS Features
* **Foreign Key Constraints** link `bookings.user_id ➡️ users.id` and `bookings.train_id ➡️ trains.id` to guarantee referential integrity.
* **Auto-Incrementing Integer Keys** (`id`) for each table to uniquely identify rows.
* **Unique Constraints** on `users.email` and `trains.train_number` to prevent duplicate identities or overlapping train lists.
* **Default Values** such as `role = 'user'`, `total_seats = 60`, `status = 'confirmed'`, and `booking_date = CURRENT_TIMESTAMP`.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Service health status check. |
| **POST** | `/api/login` | Validates passenger credentials and retrieves authorized roles. |
| **POST** | `/api/register` | Inserts new passenger credentials into `users` table. |
| **GET** | `/api/trains` | Retrieves all luxury trains or filters by `source` & `destination` queries. |
| **GET** | `/api/trains/:id` | Fetches details for a single selected high-speed train. |
| **POST** | `/api/trains` | Inserts a new train route scheduling record (Admin access). |
| **DELETE** | `/api/trains/:id` | Deletes a scheduled train route record from the database (Admin access). |
| **POST** | `/api/bookings` | Inserts a new ticket transaction record into the `bookings` table. |
| **GET** | `/api/bookings/user/:userId` | Retrieves a passenger's full booking ledger, performing an INNER JOIN on `trains`. |

---

## Pages & Features

### 📊 Passenger Dashboard
* **Dynamic Stats**: Real-time widgets displaying total trips booked, upcoming active journeys, and elite rewards points (`2,450`).
* **Visual Premium Layout**: A dark-mode hero banner greeting passengers dynamically by name, coupled with responsive summaries.
* **Journey Feed**: Lists quick summaries of travel schedules or offers clean blank state call-to-actions.

### 🗺️ Train Scheduling & Management
* **Route Browsing**: Lists scheduled active high-speed lines in cards displaying departure and arrival times, source/destination, base fares, and codes.
* **Admin Actions**: Floating interactive inputs to register new luxury trains with validation, plus direct deletable controls (`trash` action button).
* **Live Search**: Integrated real-time query inputs filtering train routes on the fly.

### 💺 Interactive Seat Selection
* **Interactive Grid**: Customizable seat matrix (`1A`, `1B`, `1C`, etc.) illustrating occupied vs. available layouts.
* **Live Costing**: Real-time totals updating automatically based on seats selected, incorporating standardized administrative service charges.
* **Checkout Workflow**: One-click transactional checkout sending instant API booking posts.

### 🎫 My Journeys Dashboard
* **Digital Locker**: Sleek, readable lists of confirmed passenger e-tickets displaying ticket booking IDs (`#ER400`, `#ER500`), travel source/destination, departure times, dates, and seat assignments.
* **Active Statuses**: Color-coded badges indicating transaction states (`confirmed`, `cancelled`).

---

*Developed for Elite Rail - Excellence in Motion.*
