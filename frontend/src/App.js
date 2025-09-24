import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ReportIssue from './components/reports/ReportIssue';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Analytics from './components/dashboard/Analytics';
import TollFree from './components/layout/TollFree';
import Alert from './components/layout/Alert';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

function App() {
  const alerts = []; // This would come from a global state

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <section className="container">
        <Alert alerts={alerts} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/toll-free" element={<TollFree />} />
          <Route path="/report-issue" element={<PrivateRoute><ReportIssue /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/analytics" element={<PrivateRoute adminOnly={true}><Analytics /></PrivateRoute>} />
        </Routes>
      </section>
    </Router>
  </AuthProvider>
  );
}

export default App;