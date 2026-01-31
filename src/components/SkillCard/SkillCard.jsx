'use client';

import './SkillCard.css';

export default function SkillCard({
  skill = "React",
  description = "Frontend Framework",
  icon = "⚛️",
  color = "#61dafb"
}) {
  return (
    <div className="skill-card">
      <div className="skill-card-border" style={{ borderTopColor: color }}></div>

      <div className="skill-card-content">
        <div className="skill-icon" style={{ color: color }}>
          {icon}
        </div>

        <div className="skill-info">
          <h3 className="skill-name">{skill}</h3>
          <p className="skill-description">{description}</p>
        </div>
      </div>

      <div className="skill-card-glow" style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }}></div>
    </div>
  );
}
