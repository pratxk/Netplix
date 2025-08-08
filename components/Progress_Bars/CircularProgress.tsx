import React from 'react';
import { CircleProgressProps } from '@/types/global';

const CircleProgress: React.FC<CircleProgressProps> = ({ value }) => {
  const clamped = Math.max(1, Math.min(value, 10));
  const percentage = ((clamped - 1) / 9) * 100;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
        {/* Background circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="3"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f89e00" />
            <stop offset="100%" stopColor="#da2f68" />
          </linearGradient>
        </defs>
      </svg>
      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">
          {value?.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default CircleProgress;
