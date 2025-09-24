import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/reports/my-reports`);
        setReports(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
      setLoading(false);
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">My Reports</h1>
      <p className="lead">
        <i className="fas fa-list-alt"></i> Here are the issues you've reported
      </p>
      <div className="reports">
        {reports.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report._id}>
                  <td>{report.title}</td>
                  <td>{report.category}</td>
                  <td><span className={`status status-${report.status}`}>{report.status}</span></td>
                  <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not reported any issues yet.</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;