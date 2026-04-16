import React from 'react';

export function ProgressRing({ radius = 60, stroke = 8, progress = 0, color = 'var(--primary-color)' }) {
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg className="progress-ring" width={radius * 2} height={radius * 2}>
        <circle
          className="progress-ring-circle-bg"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="progress-ring-circle"
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: 'absolute', fontSize: '1.2rem', fontWeight: 'bold' }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
