import React, { useState } from 'react';
import axios from 'axios';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    latitude: null,
    longitude: null,
    image: null
  });

  const { title, description, category, latitude, longitude } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = e => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log(`Location found: ${position.coords.latitude}, ${position.coords.longitude}`);
      }, (err) => {
        console.error("Error getting location: " + err.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const reportData = new FormData();
    reportData.append('title', title);
    reportData.append('description', description);
    reportData.append('category', category);
    reportData.append('latitude', latitude);
    reportData.append('longitude', longitude);
    if (formData.image) {
      reportData.append('image', formData.image);
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      await axios.post(`${process.env.REACT_APP_API_URL}/reports`, reportData, config);
      console.log('Report submitted successfully');
      // Add alert and redirect
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Report an Issue</h1>
      <p className="lead">
        <i className="fas fa-edit"></i> Let us know what's wrong
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Describe the issue"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select name="category" value={category} onChange={onChange} required>
            <option value="">* Select a category</option>
            <option value="Pothole">Pothole</option>
            <option value="Streetlight">Broken Streetlight</option>
            <option value="Trash">Overflowing Trash</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <button type="button" onClick={getLocation} className="btn btn-light">
            Get My Location
          </button>
          {latitude && longitude && (
            <p>Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
          )}
        </div>
        <div className="form-group">
          <p>Upload a photo (optional)</p>
          <input type="file" name="image" onChange={onFileChange} />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit Report" />
      </form>
    </section>
  );
};

export default ReportIssue;