import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Ticket, CreditCard, Bell, ChevronRight } from 'lucide-react';
import { fetchUserBookings } from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { id: 1, name: 'Valued Guest' };

  useEffect(() => {
    fetchUserBookings(user.id).then(res => setBookings(res.data));
  }, []);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: <Ticket className="text-gold" /> },
    { label: 'Upcoming Trips', value: bookings.filter(b => new Date(b.travel_date) > new Date()).length, icon: <Bell className="text-gold" /> },
    { label: 'Elite Points', value: '2,450', icon: <CreditCard className="text-gold" /> }
  ];

  return (
    <div>
      <div className="dashboard-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Welcome back, <span className="text-gold">{user?.name}</span></h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Your luxury travel summary and account overview.</p>
        </motion.div>
      </div>
      
      <div className="dashboard-content-wrapper">

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card" 
            style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <div style={{ background: 'var(--primary-container)', padding: '12px', borderRadius: '12px' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{stat.label}</p>
              <h2 style={{ fontSize: '24px', margin: 0 }}>{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0 }}>Upcoming Journeys</h3>
            <span style={{ fontSize: '12px', background: 'var(--secondary)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px', fontWeight: '700' }}>
              Confirmed
            </span>
          </div>
          {bookings.filter(b => new Date(b.travel_date) >= new Date(new Date().setHours(0,0,0,0))).slice(0, 2).map((booking, i) => {
            const daysToTrip = Math.ceil((new Date(booking.travel_date) - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <div key={i} style={{ display: 'flex', gap: '20px', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', marginBottom: i === 0 ? '16px' : 0 }}>
                <div style={{ textAlign: 'center', minWidth: '60px', padding: '8px', borderRight: '1px solid #ddd' }}>
                  <p style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{daysToTrip}</p>
                  <p style={{ fontSize: '10px', color: '#666', margin: 0 }}>DAYS LEFT</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{booking.train_name}</p>
                  <p style={{ fontSize: '12px', color: '#666' }}>{booking.travel_date} | {booking.departure_time}</p>
                </div>
              </div>
            );
          })}
          {bookings.filter(b => new Date(b.travel_date) >= new Date(new Date().setHours(0,0,0,0))).length === 0 && 
            <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No upcoming trips. Ready for a new adventure?</p>
          }
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0 }}>Recent Activity</h3>
            <Link to="/my-bookings" style={{ color: 'var(--secondary)', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>View All</Link>
          </div>
          {bookings.slice(0, 3).map((booking, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < 2 ? '1px solid #eee' : 'none' }}>
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px' }}>{booking.train_name}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>{booking.source} → {booking.destination}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '600', color: 'var(--secondary)', marginBottom: '4px' }}>
                  ₹{(parseFloat(booking.price_base || 0) * (booking.seat_number ? booking.seat_number.split(',').length : 1)) + 150}
                </p>
                <p style={{ fontSize: '12px', color: '#666' }}>{booking.travel_date}</p>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No recent bookings found.</p>}
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { label: 'Update Profile', icon: <User size={18} />, link: '/profile' },
              { label: 'View Train Schedule', icon: <ChevronRight size={18} />, link: '/trains' },
              { label: 'Contact Support', icon: <ChevronRight size={18} />, link: '/about' }
            ].map((action, i) => (
              <Link 
                key={i} 
                to={action.link} 
                className="btn-primary" 
                style={{ background: 'transparent', border: '1px solid #ddd', color: 'var(--primary)', justifyContent: 'space-between', padding: '16px 24px' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{action.icon} {action.label}</span>
                <ChevronRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
