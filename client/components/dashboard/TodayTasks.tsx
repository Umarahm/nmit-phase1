import React from 'react';
import { Check } from 'lucide-react';

interface TaskStatus {
  label: string;
  color: string;
  bgColor: string;
}

interface Task {
  title: string;
  status: TaskStatus;
  completed: boolean;
}

const tasks: Task[] = [
  {
    title: "Create a user flow of social application design",
    status: { label: "Approved", color: "text-green-success", bgColor: "bg-green-success/18" },
    completed: true
  },
  {
    title: "Create a user flow of social application design",
    status: { label: "In review", color: "text-red-danger", bgColor: "bg-red-danger/18" },
    completed: true
  },
  {
    title: "Landing page design for Fintech project of singapore",
    status: { label: "In review", color: "text-red-danger", bgColor: "bg-red-danger/18" },
    completed: true
  },
  {
    title: "Interactive prototype for app screens of deltamine project",
    status: { label: "On going", color: "text-orange-primary", bgColor: "bg-orange-primary/18" },
    completed: false
  },
  {
    title: "Interactive prototype for app screens of deltamine project",
    status: { label: "Approved", color: "text-green-success", bgColor: "bg-green-success/18" },
    completed: true
  }
];

const taskCategories = [
  { name: "All", count: 10, active: true },
  { name: "Important", count: null, active: false },
  { name: "Notes", count: 5, active: false },
  { name: "Links", count: 10, active: false }
];

function TaskItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
          ${task.completed 
            ? 'bg-orange-primary border-orange-primary' 
            : 'border-gray-400 bg-transparent hover:border-orange-primary'
          }
        `}>
          {task.completed && (
            <Check className="w-3 h-3 text-white" strokeWidth={2} />
          )}
        </div>
        
        {/* Task Title */}
        <span className={`
          font-aeonik text-sm
          ${task.completed ? 'text-text-primary' : 'text-text-primary'}
        `}>
          {task.title}
        </span>
      </div>
      
      {/* Status Badge */}
      <div className={`inline-flex px-2 py-1 rounded-2xl ${task.status.bgColor}`}>
        <span className={`font-aeonik text-xs ${task.status.color}`}>
          {task.status.label}
        </span>
      </div>
    </div>
  );
}

export function TodayTasks() {
  return (
    <div className="bg-card-bg rounded-2xl p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-text-primary font-aeonik text-lg font-normal mb-4">
          Today task
        </h3>
        
        {/* Category Tabs */}
        <div className="flex items-center gap-8 border-b border-black/10 pb-2">
          {taskCategories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`
                font-aeonik text-sm cursor-pointer
                ${category.active 
                  ? 'text-text-primary border-b-2 border-blue-info pb-2' 
                  : 'text-text-primary hover:text-blue-info'
                }
              `}>
                {category.name}
              </span>
              
              {category.count && (
                <div className="bg-blue-info/10 rounded-full px-2 py-1">
                  <span className="text-blue-info font-aeonik text-xs">
                    {category.count < 10 ? `0${category.count}` : category.count}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Task List */}
      <div className="space-y-1">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </div>
    </div>
  );
}
