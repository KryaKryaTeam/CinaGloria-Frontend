import React from "react";
import "./ProfileWidget.css";

interface ProfileWidgetProps {
  profileId: string;
}

export default function ProfileWidget({ profileId }: ProfileWidgetProps) {
  return (
    <div className="profile-widget-container">
      {/* Место под аватарку */}
      <div className="profile-avatar-placeholder"></div>

      <h3 style={{ margin: "0", color: "#111" }}>User Profile</h3>

      <div className="profile-id">
        <span style={{ fontSize: "12px", color: "#666", display: "block" }}>
          ID:
        </span>
        <strong>{profileId}</strong>
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#0070f3" }}>
        Loading data...
      </div>
    </div>
  );
}
