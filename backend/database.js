const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'railway.db');
const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(path.resolve(__dirname, 'schema.sql'), 'utf8');

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database:', err);
        } else {
            console.log('Database initialized successfully.');
        }
    });
});

module.exports = db;
