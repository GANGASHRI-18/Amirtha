import React, { useEffect, useState } from 'react';
import Map from '../map/Map';
import axios from 'axios';
import './Dashboard.css';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/reports`);
      setReports(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/reports/${id}`, { status: newStatus });
      setReports(reports.map(report => (report._id === id ? { ...report, status: newStatus } : report)));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Admin Dashboard</h1>
      <p className="lead">
        <i className="fas fa-tasks"></i> Manage all reported issues
      </p>

      <div className="map-view" style={{ marginBottom: '2rem' }}>
        <h2>Issue Map</h2>
        <Map reports={reports.filter(r => r.location && r.location.coordinates)} />
      </div>

      <div className="reports">
        <h2>All Reports</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Reported By</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report._id}>
                <td>{report.title}</td>
                <td>{report.category}</td>
                <td>{report.user.username}</td>
                <td><span className={`status status-${report.status}`}>{report.status}</span></td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report._id, e.target.value)}
                  >
                    <option value="submitted">Submitted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard;