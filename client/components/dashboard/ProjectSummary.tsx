import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ProjectStatus {
  label: string;
  color: string;
  bgColor: string;
}

interface Project {
  name: string;
  manager: string;
  dueDate: string;
  status: ProjectStatus;
  progress: number;
  progressColor: string;
}

const projects: Project[] = [
  {
    name: "Nelsa web developement",
    manager: "Om prakash sao",
    dueDate: "May 25, 2023",
    status: { label: "Completed", color: "text-green-success", bgColor: "bg-green-success/18" },
    progress: 100,
    progressColor: "stroke-green-success fill-green-success"
  },
  {
    name: "Datascale AI app",
    manager: "Neilsan mando",
    dueDate: "Jun 20, 2023",
    status: { label: "Delayed", color: "text-yellow-warning", bgColor: "bg-yellow-warning/18" },
    progress: 35,
    progressColor: "stroke-yellow-warning fill-yellow-warning"
  },
  {
    name: "Media channel branding",
    manager: "Tiruvelly priya",
    dueDate: "July 13, 2023",
    status: { label: "At risk", color: "text-red-danger", bgColor: "bg-red-danger/18" },
    progress: 68,
    progressColor: "stroke-red-danger fill-red-danger"
  },
  {
    name: "Corlax iOS app develpoement",
    manager: "Matte hannery",
    dueDate: "Dec 20, 2023",
    status: { label: "Completed", color: "text-green-success", bgColor: "bg-green-success/18" },
    progress: 100,
    progressColor: "stroke-green-success fill-green-success"
  },
  {
    name: "Website builder developement",
    manager: "Sukumar rao",
    dueDate: "Mar 15, 2024",
    status: { label: "On going", color: "text-orange-primary", bgColor: "bg-orange-primary/18" },
    progress: 50,
    progressColor: "stroke-orange-primary fill-orange-primary"
  }
];

function ProgressCircle({ progress, color }: { progress: number; color: string }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative w-8 h-8">
      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          strokeWidth="2"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-aeonik text-text-primary">
          {progress}%
        </span>
      </div>
    </div>
  );
}

export function ProjectSummary() {
  return (
    <div className="bg-card-bg rounded-2xl p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-text-primary font-aeonik text-lg font-normal">
          Project summary
        </h3>
        
        {/* Filters - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 overflow-x-auto">
          <div className="bg-white rounded-2xl px-3 lg:px-4 py-2 shadow-sm border border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-aeonik text-sm">Project</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl px-3 lg:px-4 py-2 shadow-sm border border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-aeonik text-sm hidden sm:inline">Project manager</span>
              <span className="text-text-primary font-aeonik text-sm sm:hidden">Manager</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl px-3 lg:px-4 py-2 shadow-sm border border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-aeonik text-sm">Status</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Table - Responsive layout */}
      <div className="space-y-4">
        {/* Desktop Table Header - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-12 gap-4 pb-2 border-b border-black/10">
          <div className="col-span-3">
            <span className="text-text-primary font-aeonik text-sm font-medium">Name</span>
          </div>
          <div className="col-span-3">
            <span className="text-text-primary font-aeonik text-sm font-medium">Project manager</span>
          </div>
          <div className="col-span-2">
            <span className="text-text-primary font-aeonik text-sm font-medium">Due date</span>
          </div>
          <div className="col-span-2">
            <span className="text-text-primary font-aeonik text-sm font-medium">Status</span>
          </div>
          <div className="col-span-2">
            <span className="text-text-primary font-aeonik text-sm font-medium">Progress</span>
          </div>
        </div>

        {/* Responsive Table Rows */}
        {projects.map((project, index) => (
          <div key={index} className="lg:grid lg:grid-cols-12 lg:gap-4 lg:py-2 lg:items-center">
            {/* Mobile Card Layout */}
            <div className="lg:hidden bg-white/20 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-text-primary font-aeonik text-sm font-medium mb-1">
                    {project.name}
                  </h4>
                  <p className="text-text-secondary font-aeonik text-xs">
                    {project.manager} • {project.dueDate}
                  </p>
                </div>
                <ProgressCircle
                  progress={project.progress}
                  color={project.progressColor}
                />
              </div>
              <div className={`inline-flex px-2 py-1 rounded-2xl ${project.status.bgColor}`}>
                <span className={`font-aeonik text-xs ${project.status.color}`}>
                  {project.status.label}
                </span>
              </div>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden lg:contents">
              <div className="col-span-3">
                <span className="text-text-primary font-aeonik text-sm">
                  {project.name}
                </span>
              </div>
              <div className="col-span-3">
                <span className="text-text-primary font-aeonik text-sm">
                  {project.manager}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-text-primary font-aeonik text-sm">
                  {project.dueDate}
                </span>
              </div>
              <div className="col-span-2">
                <div className={`inline-flex px-2 py-1 rounded-2xl ${project.status.bgColor}`}>
                  <span className={`font-aeonik text-xs ${project.status.color}`}>
                    {project.status.label}
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <ProgressCircle
                  progress={project.progress}
                  color={project.progressColor}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
