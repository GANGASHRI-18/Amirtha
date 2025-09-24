import React, { useRef, useEffect, useState } from 'react';
/* eslint-import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ({ reports }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.0060); // Default to NYC
  const [lat, setLat] = useState(40.7128);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current || !reports) return;

    // Add markers for each report
    reports.forEach(report => {
      const { coordinates } = report.location;

      // Create a popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${report.title}</h3><p>${report.description}</p><p>Status: ${report.status}</p>`
      );

      // Create a marker and add it to the map.
      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

  }, [reports]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" style={{ height: '500px' }} />
    </div>
  );
};

export default Map;