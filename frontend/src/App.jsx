import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';
import CustomerForm from './pages/CustomerForm';
import TrainList from './pages/TrainList';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Home />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<CustomerForm />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/about" element={<About />} />
          {/* Redirect any legacy auth paths to dashboard */}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
