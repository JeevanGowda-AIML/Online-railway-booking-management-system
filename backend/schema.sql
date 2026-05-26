-- EliteRail Database Schema
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS trains (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    train_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    total_seats INTEGER DEFAULT 60,
    price_base REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    train_id INTEGER NOT NULL,
    seat_number TEXT NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);

-- Seed Data
INSERT OR IGNORE INTO trains (train_number, name, source, destination, departure_time, arrival_time, price_base) VALUES
('12433', 'Chennai Rajdhani', 'Chennai', 'Delhi', '06:00', '10:30', 3200.00),
('12002', 'Bhopal Shatabdi', 'Delhi', 'Bhopal', '06:15', '14:00', 1800.00),
('22436', 'Vande Bharat Express', 'Delhi', 'Varanasi', '06:00', '14:00', 2500.00),
('12260', 'Duronto Express', 'Kolkata', 'Delhi', '17:00', '10:30', 2800.00),
('12951', 'Mumbai Rajdhani', 'Mumbai', 'Delhi', '16:35', '08:35', 3100.00),
('12124', 'Deccan Queen', 'Pune', 'Mumbai', '07:15', '10:25', 900.00),
('12841', 'Coromandel Express', 'Kolkata', 'Chennai', '15:20', '17:15', 1800.00),
('12622', 'Tamil Nadu Express', 'Delhi', 'Chennai', '21:05', '06:15', 2400.00),
('12007', 'Mysuru Shatabdi', 'Chennai', 'Mysore', '06:00', '13:00', 1400.00),
('12723', 'Telangana Express', 'Hyderabad', 'Delhi', '06:25', '09:05', 2100.00),
('12213', 'Duronto Express', 'Bangalore', 'Delhi', '23:40', '07:00', 2900.00),
('12932', 'Double Decker Exp', 'Ahmedabad', 'Mumbai', '06:00', '13:00', 1100.00),
('12015', 'Ajmer Shatabdi', 'Delhi', 'Jaipur', '06:05', '10:45', 1300.00),
('12301', 'Kolkata Rajdhani', 'Kolkata', 'Delhi', '16:50', '10:00', 3050.00),
('12505', 'North East Express', 'Guwahati', 'Delhi', '12:40', '19:35', 1900.00),
('12137', 'Punjab Mail', 'Mumbai', 'Firozpur', '19:35', '05:10', 1600.00),
('12617', 'Mangala Lakshadweep', 'Ernakulam', 'Delhi', '13:15', '13:15', 2300.00),
('12033', 'Kanpur Shatabdi', 'Kanpur', 'Delhi', '06:00', '11:20', 1200.00);

-- Seed User
INSERT OR IGNORE INTO users (name, email, password, role) VALUES
('Jeevan', 'jeevan@gmail.com', 'Jeevan@333', 'user'),
('Admin', 'admin@eliterail.com', 'admin123', 'admin');
