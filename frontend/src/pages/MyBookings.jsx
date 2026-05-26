import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar, Clock, MapPin, Download } from 'lucide-react';
import { fetchUserBookings } from '../api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || { id: 1 };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await fetchUserBookings(user.id);
        setBookings(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, [user.id]);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>My <span className="text-gold">Journeys</span></h2>

      {loading ? (
        <div>Loading your tickets...</div>
      ) : bookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {bookings.map((booking, i) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card" 
              style={{ overflow: 'hidden' }}
            >
              <div style={{ background: 'var(--primary)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Ticket size={24} className="text-gold" />
                  <span style={{ fontWeight: '600' }}>Booking ID: #ER{booking.id}00</span>
                </div>
                <span style={{ background: '#22c55e', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: '700' }}>
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '40px', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px' }}>{booking.train_name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                    <MapPin size={16} /> {booking.source} → {booking.destination}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>Departure</p>
                    <p style={{ fontWeight: '600' }}>{booking.departure_time}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>Travel Date</p>
                    <p style={{ fontWeight: '600', color: 'var(--primary)' }}>{booking.travel_date}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>Seat</p>
                    <p style={{ fontWeight: '600', color: 'var(--secondary)' }}>{booking.seat_number}</p>
                  </div>
                </div>

                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                  <Download size={18} /> Ticket
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '64px', textAlign: 'center' }}>
          <Ticket size={64} style={{ color: '#eee', marginBottom: '24px' }} />
          <h3>No bookings found yet.</h3>
          <p style={{ color: '#666', marginTop: '12px' }}>Start your luxury journey by searching for trains!</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
