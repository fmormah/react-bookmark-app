// Import React, useState and useEffect hooks from React library
import React, { useState, useEffect } from "react";

// Alert component, takes in props 'message', 'onClose', 'id', 'messageType'
const Alert = ({ message, onClose, id, messageType }) => {
  // State variable to manage the visibility of the alert
  const [isVisible, setIsVisible] = useState(true);
  // Timeout for alert auto close in milliseconds
  const alertAutoCloseTime = 5000;

  // useEffect to set timeout for alert visibility
  useEffect(() => {
    // Set timeout to change the visibility of the alert to false after the given time
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, alertAutoCloseTime);
    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  // Return the JSX for the Alert component
  return (
    <div
      className={`alert ${
        isVisible ? "alert-visible" : "alert-hidden"
      } ${messageType}`}
    >
      <div className="alert-message">{message}</div>
      <div
        data-testid="close-button-1"
        className="alert-close"
        onClick={() => onClose(id)}
      >
        X
      </div>
    </div>
  );
};

// PageAlerts component, takes in props 'alertMessage', 'alerts', 'removeAlert', 'addAlert'
const PageAlerts = ({ alertMessage, alerts, removeAlert, addAlert }) => {
  // useEffect to add new alert when 'alertMessage' changes and 'addAlert' is available
  useEffect(() => {
    if (alertMessage !== null && addAlert) addAlert();
  }, [addAlert, alertMessage]);

  // Return the JSX for PageAlerts component
  return (
    <div className="alert-container" data-testid="alert-container">
      {
        // Map through alerts and render Alert components with necessary props
        alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            messageType={alert.messageType}
            onClose={() => {
              removeAlert(alert.id);
            }}
            id={alert.id}
          />
        ))
      }
    </div>
  );
};

// Export PageAlerts component as default
export default PageAlerts;
