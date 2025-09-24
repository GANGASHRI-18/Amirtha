import React from 'react';

const TollFree = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">Toll-Free Numbers</h1>
      <p className="lead">For urgent issues, please use the numbers below.</p>
      <div className="toll-free-list">
        <div className="toll-free-item">
          <h3>Public Works (Potholes, Streetlights)</h3>
          <p>1-800-555-0101</p>
        </div>
        <div className="toll-free-item">
          <h3>Sanitation (Trash, Recycling)</h3>
          <p>1-800-555-0102</p>
        </div>
        <div className="toll-free-item">
          <h3>General Inquiries</h3>
          <p>1-800-555-0199</p>
        </div>
      </div>
    </section>
  );
};

export default TollFree;