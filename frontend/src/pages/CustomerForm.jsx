import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';

const CustomerForm = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Jeevan', email: 'jeevan@gmail.com' };
  const [formData, setFormData] = useState({
    name: user.name || 'Jeevan',
    email: user.email || 'jeevan@gmail.com',
    phone: '9876543210',
    address: 'Bangalore, India',
    preference: 'Veg'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully! (Demo)');
    localStorage.setItem('user', JSON.stringify({ ...user, name: formData.name }));
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ padding: '48px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'white', fontSize: '40px' }}>
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--secondary)', color: 'white', border: 'none', borderRadius: '50%', padding: '8px' }}>
              <Camera size={18} />
            </button>
          </div>
          <h2>My Profile</h2>
          <p style={{ color: '#666' }}>Manage your personal details and preferences.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ paddingLeft: '48px' }}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="email" 
                  className="input-field" 
                  style={{ paddingLeft: '48px' }}
                  value={formData.email}
                  disabled
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="tel" 
                  className="input-field" 
                  style={{ paddingLeft: '48px' }}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Dietary Preference</label>
              <select 
                className="input-field" 
                value={formData.preference}
                onChange={(e) => setFormData({...formData, preference: e.target.value})}
              >
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Jain</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Residential Address</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#999' }} />
              <textarea 
                className="input-field" 
                style={{ paddingLeft: '48px', minHeight: '100px', paddingTop: '12px' }}
                placeholder="Enter your full address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '12px' }}>
            Save Changes <Save size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerForm;
