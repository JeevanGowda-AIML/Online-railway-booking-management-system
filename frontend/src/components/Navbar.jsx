import React from 'react';
import { Link } from 'react-router-dom';
import { Train, LayoutDashboard, List, User, Info, Search, Clock } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
        <Logo size={40} />
      </Link>
      
      <div className="nav-links">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/trains" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} /> Scheduling
        </Link>
        <Link to="/search" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} /> Book Ticket
        </Link>
        <Link to="/my-bookings" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Train size={18} /> My Journeys
        </Link>
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} /> Customer Info
        </Link>
        <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} /> About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
