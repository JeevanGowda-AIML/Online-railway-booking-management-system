import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Train, Check, Info, Calendar } from 'lucide-react';
import { fetchTrainById, createBooking } from '../api';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const travelDate = queryParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [train, setTrain] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || { id: 1 };

  useEffect(() => {
    const loadTrain = async () => {
      try {
        const response = await fetchTrainById(id);
        setTrain(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTrain();
  }, [id, user, navigate]);

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) return;
    try {
      await createBooking({
        user_id: user.id,
        train_id: id,
        seat_number: selectedSeats.join(', '),
        travel_date: travelDate
      });
      alert(`Booking Confirmed for ${travelDate}! Bon Voyage!`);
      navigate('/my-bookings');
    } catch (err) {
      alert('Error creating booking');
    }
  };

  const seats = Array.from({ length: 40 }, (_, i) => `${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading seat layout...</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>{train?.name}</h2>
          <p style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {train?.source} to {train?.destination} | {train?.departure_time} | <Calendar size={14} /> {travelDate}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>Base Fare</p>
          <h3 className="text-gold">₹{train?.price_base}</h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>Select Your Seat</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '12px', 
            maxWidth: '400px', 
            margin: '0 auto' 
          }}>
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat);
              return (
              <button
                key={seat}
                onClick={() => {
                  if (isSelected) {
                    setSelectedSeats(selectedSeats.filter(s => s !== seat));
                  } else {
                    setSelectedSeats([...selectedSeats, seat]);
                  }
                }}
                style={{
                  height: '50px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  background: isSelected ? 'var(--secondary)' : 'white',
                  color: isSelected ? 'var(--primary)' : 'inherit',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {seat}
              </button>
            )})}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Seats Selected</span>
                <span className="text-gold" style={{ fontWeight: '700', maxWidth: '150px', textAlign: 'right' }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Number of Seats</span>
                <span>{selectedSeats.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ticket Fare</span>
                <span>₹{train?.price_base} x {selectedSeats.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Service Charge</span>
                <span>₹150</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '18px' }}>
                <span>Total Amount</span>
                <span>₹{(parseFloat(train?.price_base || 0) * selectedSeats.length) + 150}</span>
              </div>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '24px' }}
              disabled={selectedSeats.length === 0}
              onClick={handleConfirmBooking}
            >
              Proceed to Pay
            </button>
          </div>

          <div className="glass-card" style={{ padding: '20px', background: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--secondary)' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Info className="text-gold" size={20} />
              <p style={{ fontSize: '14px', color: '#554400' }}>
                Free cancellation up to 24 hours before departure. Premium lounge access included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
