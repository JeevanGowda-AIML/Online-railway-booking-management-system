import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Heart, Award } from 'lucide-react';
import Logo from '../components/Logo';

const About = () => {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}
      >
        <Logo size={80} className="mb-8" />
        <h1 style={{ fontSize: '48px', marginBottom: '20px', marginTop: '32px' }}>Excellence in <span className="text-gold">Motion</span></h1>
        <p style={{ fontSize: '20px', color: '#666', lineHeight: '1.8' }}>
          Redefining the landscape of luxury rail travel in India. Elite Rail combines heritage, 
          technology, and world-class service to deliver an unparalleled journey experience.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '80px' }}>
        {[
          { icon: <Shield size={32} />, title: 'Safety First', desc: 'Advanced safety protocols and real-time monitoring.' },
          { icon: <Clock size={32} />, title: 'Punctuality', desc: 'Committed to 99.9% on-time arrivals and departures.' },
          { icon: <Award size={32} />, title: 'Luxury', desc: 'Premium cabins and gourmet dining at 130 km/h.' },
          { icon: <Heart size={32} />, title: 'Hospitality', desc: 'Exceptional service that feels like home.' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ color: 'var(--secondary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '24px' }}>Our Mission</h2>
        <p style={{ color: '#444', fontSize: '18px', lineHeight: '1.8', fontStyle: 'italic' }}>
          "To provide a seamless, secure, and sophisticated booking experience that empowers 
          passengers to explore the beauty of India with dignity and comfort."
        </p>
      </div>
    </div>
  );
};

export default About;
