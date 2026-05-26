import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Train, Clock, MapPin, Search, Trash2 } from 'lucide-react';
import { addTrain, deleteTrain, fetchTrains } from '../api';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [newTrain, setNewTrain] = useState({ train_number: '', name: '', source: '', destination: '', departure_time: '', arrival_time: '', price_base: '' });

  const loadTrains = () => {
    fetchTrains().then(res => setTrains(res.data));
  };

  useEffect(() => {
    loadTrains();
  }, []);

  const handleAddTrain = (e) => {
    e.preventDefault();
    const trainToSave = {
      ...newTrain,
      price_base: parseFloat(newTrain.price_base)
    };
    
    addTrain(trainToSave).then(() => {
      setIsAddModalOpen(false);
      loadTrains();
      setNewTrain({ train_number: '', name: '', source: '', destination: '', departure_time: '', arrival_time: '', price_base: '' });
      alert('Train added successfully!');
    }).catch(err => {
      console.error('Full Error Object:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Unknown network error';
      alert(`Failed to add train: ${errorMsg}`);
    });
  };

  const handleDeleteTrain = (id) => {
    if (window.confirm('Are you sure you want to delete this luxury train route?')) {
      deleteTrain(id).then(() => {
        loadTrains();
      }).catch(err => alert('Error deleting train'));
    }
  };

  const filteredTrains = trains.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Train Scheduling & Management</h1>
            <p style={{ color: '#666' }}>Browse all available luxury routes and schedules.</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="btn-primary" style={{ height: 'fit-content' }}>
            + Add Train
          </button>
        </div>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input 
            type="text" 
            placeholder="Search trains or cities..." 
            className="input-field" 
            style={{ paddingLeft: '48px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {filteredTrains.map((train, i) => (
          <motion.div 
            key={train.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card" 
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '8px', borderRadius: '8px' }}>
                  <Train size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{train.name}</h3>
                  <span style={{ fontSize: '12px', color: '#999' }}>#{train.train_number}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--secondary)' }}>₹{train.price_base}</span>
                <p style={{ fontSize: '12px', color: '#999' }}>Base Fare</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{train.source}</p>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>{train.departure_time}</p>
              </div>
              <div style={{ textAlign: 'center', color: '#ddd' }}>→</div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{train.destination}</p>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>{train.arrival_time}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setSelectedTrain(train)}
                className="btn-primary" 
                style={{ flex: 1, background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}
              >
                View Route Details
              </button>
              <button 
                onClick={() => handleDeleteTrain(train.id)}
                className="btn-primary" 
                style={{ padding: '0 16px', background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626' }}
                title="Delete Train"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Train Modal */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ background: 'white', padding: '32px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '24px' }}>Add New Train</h2>
            <form onSubmit={handleAddTrain} style={{ display: 'grid', gap: '16px' }}>
              <input required placeholder="Train Number (e.g. 12001)" className="input-field" value={newTrain.train_number} onChange={e => setNewTrain({...newTrain, train_number: e.target.value})} />
              <input required placeholder="Train Name" className="input-field" value={newTrain.name} onChange={e => setNewTrain({...newTrain, name: e.target.value})} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <select required className="input-field" value={newTrain.source} onChange={e => setNewTrain({...newTrain, source: e.target.value})}>
                  <option value="" disabled>Select Source City</option>
                  {Array.from(new Set([...trains.flatMap(t => [t.source, t.destination]), 'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata'])).sort().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <select required className="input-field" value={newTrain.destination} onChange={e => setNewTrain({...newTrain, destination: e.target.value})}>
                  <option value="" disabled>Select Destination City</option>
                  {Array.from(new Set([...trains.flatMap(t => [t.source, t.destination]), 'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata'])).sort().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input required type="time" placeholder="Departure Time" className="input-field" value={newTrain.departure_time} onChange={e => setNewTrain({...newTrain, departure_time: e.target.value})} />
                <input required type="time" placeholder="Arrival Time" className="input-field" value={newTrain.arrival_time} onChange={e => setNewTrain({...newTrain, arrival_time: e.target.value})} />
              </div>
              <input required type="number" placeholder="Base Fare (₹)" className="input-field" value={newTrain.price_base} onChange={e => setNewTrain({...newTrain, price_base: e.target.value})} />
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Add Train</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedTrain && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ background: 'white', padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <Train size={48} className="text-gold" style={{ marginBottom: '16px' }} />
            <h2 style={{ marginBottom: '8px' }}>{selectedTrain.name}</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>Train #{selectedTrain.train_number}</p>
            
            <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#666' }}>From:</span>
                <span style={{ fontWeight: '600' }}>{selectedTrain.source} ({selectedTrain.departure_time})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#666' }}>To:</span>
                <span style={{ fontWeight: '600' }}>{selectedTrain.destination} ({selectedTrain.arrival_time})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Base Fare:</span>
                <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>₹{selectedTrain.price_base}</span>
              </div>
            </div>

            <button onClick={() => setSelectedTrain(null)} className="btn-primary" style={{ width: '100%' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainList;
