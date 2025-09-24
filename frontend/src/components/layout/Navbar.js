import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      {user && user.role === 'official' && (
        <>
          <li><Link to="/admin/dashboard">Admin</Link></li>
          <li><Link to="/admin/analytics">Analytics</Link></li>
        </>
      )}
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/report-issue">Report Issue</Link></li>
      <li><Link to="/toll-free">Toll-Free</Link></li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/toll-free">Toll-Free</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-flag"></i> Civic Reporter
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;