import React from 'react';
import PropTypes from 'prop-types';
// In a real app, this would be connected to a context/redux store
// For now, it's a stateless component

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

export default Alert;