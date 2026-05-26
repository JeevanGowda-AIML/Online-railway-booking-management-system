import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Train, Clock, MapPin, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchTrains } from '../api';

const SearchResults = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get('source');
  const destination = queryParams.get('destination');

  useEffect(() => {
    const loadTrains = async () => {
      try {
        const response = await fetchTrains(source, destination);
        setTrains(response.data);
      } catch (err) {
        console.error('Error fetching trains:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTrains();
  }, [source, destination]);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>Available Trains</h2>
          <p style={{ color: '#666' }}>{source} <ChevronRight size={16} style={{ verticalAlign: 'middle' }} /> {destination}</p>
        </div>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
          <Filter size={18} /> Filter
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px' }}>Loading luxury journeys...</div>
      ) : trains.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {trains.map((train, i) => (
            <motion.div 
              key={train.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card" 
              style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '32px', alignItems: 'center' }}
            >
              <div style={{ background: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
                <Train size={32} className="text-gold" />
              </div>

              <div>
                <h3 style={{ marginBottom: '8px' }}>{train.name}</h3>
                <div style={{ display: 'flex', gap: '24px', color: '#666', fontSize: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} /> {train.departure_time} - {train.arrival_time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Train size={16} /> #{train.train_number}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
                  ₹{train.price_base}
                </div>
                <button 
                  onClick={() => {
                    const travelDate = queryParams.get('date');
                    navigate(`/book/${train.id}${travelDate ? `?date=${travelDate}` : ''}`);
                  }} 
                  className="btn-primary"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>No trains found for this route.</h3>
          <p style={{ marginTop: '16px' }}>Try searching between different cities like 'New Delhi' and 'Mumbai'.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', marginTop: '24px' }}>Back to Search</Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
