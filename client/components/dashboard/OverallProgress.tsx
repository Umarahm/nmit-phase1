import React from "react";
import { ChevronDown } from "lucide-react";

interface ProgressStat {
  label: string;
  value: string;
  color: string;
}

const progressStats: ProgressStat[] = [
  { label: "Total projects", value: "95", color: "text-text-primary" },
  { label: "Completed", value: "26", color: "text-green-success" },
  { label: "Delayed", value: "35", color: "text-yellow-warning" },
  { label: "On going", value: "35", color: "text-orange-primary" },
];

function CircularProgressChart() {
  // This is a simplified circular progress representation
  // In a real app, you'd use a charting library like Chart.js or D3
  const progress = 72;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#f3f4f6"
          strokeWidth="8"
          fill="none"
        />

        {/* Completed progress (green) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#1A932E"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />

        {/* Delayed progress (yellow) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#DFA510"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference * 0.3}
          strokeDashoffset={circumference * 0.4}
          strokeLinecap="round"
        />

        {/* Ongoing progress (orange) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#E65F2B"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference * 0.25}
          strokeDashoffset={circumference * 0.1}
          strokeLinecap="round"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-text-primary font-aeonik text-3xl font-normal">
            72%
          </div>
          <div className="text-text-secondary font-aeonik text-sm">
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}

export function OverallProgress() {
  return (
    <div className="bg-card-bg rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h3 className="text-text-primary font-aeonik text-lg font-normal">
            Overall Progress
          </h3>

          {/* Filter */}
          <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-aeonik text-sm">All</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="flex flex-col items-center gap-8">
          <CircularProgressChart />

          {/* Progress Statistics */}
          <div className="w-full grid grid-cols-2 gap-4">
            {progressStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <span
                  className={`font-aeonik text-2xl font-normal ${stat.color}`}
                >
                  {stat.value}
                </span>
                <span className="text-text-secondary font-aeonik text-sm text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
