require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// API Endpoints
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Get all trains or filter by source/destination
app.get('/api/trains', (req, res) => {
    const { source, destination } = req.query;
    let query = 'SELECT * FROM trains';
    const params = [];

    if (source && destination) {
        query += ' WHERE source LIKE ? AND destination LIKE ?';
        params.push(`%${source}%`, `%${destination}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get single train details
app.get('/api/trains/:id', (req, res) => {
    db.get('SELECT * FROM trains WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Train not found' });
        res.json(row);
    });
});

// Create new train
app.post('/api/trains', (req, res) => {
    console.log('Adding new train:', req.body);
    const { train_number, name, source, destination, departure_time, arrival_time, price_base } = req.body;
    const query = 'INSERT INTO trains (train_number, name, source, destination, departure_time, arrival_time, price_base) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(query, [train_number, name, source, destination, departure_time, arrival_time, price_base], function(err) {
        if (err) {
            console.error('Database Error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: 'Train added successfully' });
    });
});

// Delete train
app.delete('/api/trains/:id', (req, res) => {
    db.run('DELETE FROM trains WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Train deleted successfully' });
    });
});

// Create booking
app.post('/api/bookings', (req, res) => {
    const { user_id, train_id, seat_number, travel_date } = req.body;
    
    if (!user_id || !train_id || !seat_number || !travel_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO bookings (user_id, train_id, seat_number, travel_date) VALUES (?, ?, ?, ?)';
    db.run(query, [user_id, train_id, seat_number, travel_date], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Booking successful' });
    });
});

// Get user bookings
app.get('/api/bookings/user/:userId', (req, res) => {
    const query = `
        SELECT b.*, t.name as train_name, t.source, t.destination, t.departure_time, t.price_base 
        FROM bookings b 
        JOIN trains t ON b.train_id = t.id 
        WHERE b.user_id = ?
        ORDER BY b.travel_date ASC
    `;
    db.all(query, [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// User Login (Simplified for mini project)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT id, name, email, role FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: 'Invalid credentials' });
        res.json(row);
    });
});

// User Register
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'User registered successfully' });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
