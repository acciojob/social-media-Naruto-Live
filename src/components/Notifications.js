import React from "react";

function Notifications({
  notifications,
  refreshNotifications
}) {
  return (
    <section className="notificationsList">

      <button
        className="button"
        onClick={refreshNotifications}
      >
        Refresh Notifications
      </button>

      {notifications.map(
        (notification) => (
          <div key={notification.id}>
            {notification.message}
          </div>
        )
      )}

    </section>
  );
}

export default Notifications;