import React from 'react';
import './StatsComponent.css'; // We'll create this CSS file

const StatsComponent = () => {
  return (
    <div className="stats-container">
      <header className="header">
        <h1 className="main-title">
          Empowering Aspiring Developers to Build Their Future in Tech!
        </h1>
      </header>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">
            Students land their first developer job in
          </div>
          <div className="stat-value highlight">6 months</div>
          <div className="stat-subtext">on average</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Over</div>
          <div className="stat-value">7,000,000+</div>
          <div className="stat-subtext">students trained</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Total YouTube Views</div>
          <div className="stat-value">1 Billion+</div>
          <div className="stat-subtext">views and counting</div>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;