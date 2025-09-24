import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/summary`);
        setAnalytics(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  const statusData = {
    labels: Object.keys(analytics.byStatus),
    datasets: [{
      data: Object.values(analytics.byStatus),
      backgroundColor: ['#3498db', '#f1c40f', '#2ecc71'],
    }]
  };

  const categoryData = {
    labels: Object.keys(analytics.byCategory),
    datasets: [{
      label: 'Reports by Category',
      data: Object.values(analytics.byCategory),
      backgroundColor: '#3498db',
    }]
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Analytics</h1>
      <p className="lead">
        <i className="fas fa-chart-bar"></i> Insights into civic issues
      </p>

      <div className="analytics-summary">
        <h2>Total Reports: {analytics.totalReports}</h2>
      </div>

      <div className="charts" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
        <div className="chart" style={{ width: '45%' }}>
          <h3>Reports by Status</h3>
          {/* <Pie data={statusData} /> */}
          <p>Chart.js Pie chart would be here.</p>
        </div>
        <div className="chart" style={{ width: '45%' }}>
          <h3>Reports by Category</h3>
          {/* <Bar data={categoryData} /> */}
          <p>Chart.js Bar chart would be here.</p>
        </div>
      </div>
    </section>
  );
};

export default Analytics;