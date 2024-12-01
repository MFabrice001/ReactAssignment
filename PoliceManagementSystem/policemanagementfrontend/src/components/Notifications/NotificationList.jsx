import React, { useState, useEffect } from "react";
import api from "../../services/api";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} ({notification.timestamp})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
