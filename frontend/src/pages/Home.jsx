import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/trains').then(res => {
      const uniqueCities = new Set();
      res.data.forEach(train => {
        uniqueCities.add(train.source);
        uniqueCities.add(train.destination);
      });
      setCities(Array.from(uniqueCities).sort());
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?source=${source}&destination=${destination}&date=${date}`);
  };

  return (
    <div>
      <div className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h1 style={{ fontSize: '56px', marginBottom: '16px' }}>Excellence in <span className="text-gold">Motion</span></h1>
          <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>
            Experience the pinnacle of luxury rail travel with Elite Rail. <br/>
            Book Vande Bharat, Rajdhani, and Shatabdi Express seamlessly.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card" 
          style={{ padding: '40px', width: '100%', maxWidth: '1000px' }}
        >
          <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'end' }}>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--primary)' }}>From</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <select 
                  className="input-field" 
                  style={{ paddingLeft: '48px', appearance: 'none' }}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Source City</option>
                  {cities.map(city => <option key={`src-${city}`} value={city}>{city}</option>)}
                </select>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--primary)' }}>To</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <select 
                  className="input-field" 
                  style={{ paddingLeft: '48px', appearance: 'none' }}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Destination</option>
                  {cities.map(city => <option key={`dest-${city}`} value={city}>{city}</option>)}
                </select>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--primary)' }}>Date</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="date" 
                  className="input-field" 
                  style={{ paddingLeft: '48px' }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ height: '56px' }}>
              Search Trains <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </div>

      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {[
          { title: 'Premium Suites', desc: 'Indulge in spacious private cabins with dedicated concierge service.' },
          { title: 'Fine Dining', desc: 'Savor gourmet meals prepared by world-renowned chefs onboard.' },
          { title: 'Smart Booking', desc: 'Advanced reservation system with real-time seat selection.' }
        ].map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="glass-card" 
            style={{ padding: '32px' }}
          >
            <h3 style={{ marginBottom: '12px' }}>{feat.title}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Home;
