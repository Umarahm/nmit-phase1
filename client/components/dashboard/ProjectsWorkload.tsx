import React from 'react';
import { ChevronDown } from 'lucide-react';

interface WorkloadUser {
  name: string;
  workload: number;
  isHighlighted?: boolean;
}

interface WorkloadData {
  [key: string]: WorkloadUser[];
}

const workloadUsers: WorkloadUser[] = [
  { name: 'Sam', workload: 7 },
  { name: 'Meldy', workload: 8 },
  { name: 'Ken', workload: 2 },
  { name: 'Dmitry', workload: 10, isHighlighted: true },
  { name: 'Vego', workload: 8 },
  { name: 'Kadin', workload: 2 },
  { name: 'Melm', workload: 4 }
];

// Create a grid representing the workload calendar
function createWorkloadGrid() {
  const grid = [];
  for (let row = 0; row < 7; row++) {
    const gridRow = [];
    for (let col = 0; col < 7; col++) {
      const userIndex = row * 7 + col;
      if (userIndex < workloadUsers.length) {
        gridRow.push(workloadUsers[userIndex]);
      } else {
        gridRow.push(null);
      }
    }
    grid.push(gridRow);
  }
  return grid;
}

function WorkloadCell({ user, row, col }: { user: WorkloadUser | null, row: number, col: number }) {
  if (!user) {
    return <div className="w-8 h-8"></div>;
  }
  
  // Different patterns based on position for visual variety
  const isFilled = user.workload > 0;
  const isHighlighted = user.isHighlighted;
  
  let cellClass = "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-aeonik font-medium";
  
  if (isHighlighted) {
    cellClass += " bg-orange-primary border-orange-primary text-white";
  } else if (isFilled) {
    cellClass += " bg-text-primary border-text-primary text-white";
  } else {
    cellClass += " border-text-primary/60 text-text-primary bg-transparent";
  }
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cellClass}>
        {user.workload < 10 ? `0${user.workload}` : user.workload}
      </div>
      <span className="text-text-secondary font-aeonik text-xs">
        {user.name}
      </span>
    </div>
  );
}

export function ProjectsWorkload() {
  const workloadGrid = createWorkloadGrid();
  
  return (
    <div className="bg-card-bg rounded-2xl p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-text-primary font-aeonik text-lg font-normal">
          Projects Workload
        </h3>
        
        {/* Time Filter */}
        <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-text-primary font-aeonik text-sm">
              Last 3 months
            </span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
      
      {/* Workload Grid */}
      <div className="space-y-4">
        {workloadGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between items-center">
            {row.map((user, colIndex) => (
              <WorkloadCell 
                key={`${rowIndex}-${colIndex}`}
                user={user}
                row={rowIndex}
                col={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-text-primary"></div>
          <span className="text-text-secondary font-aeonik">Regular Load</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-primary"></div>
          <span className="text-text-secondary font-aeonik">High Load</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-text-primary/60"></div>
          <span className="text-text-secondary font-aeonik">Available</span>
        </div>
      </div>
    </div>
  );
}
