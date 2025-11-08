import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import NavigationBar from './components/navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import Bookings from './pages/bookings';
import Admin from './pages/admin';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
        <ToastProvider />
      </Router>
    </AuthProvider>
  );
}

export default App;