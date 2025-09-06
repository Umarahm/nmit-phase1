import React from "react";
import {
  BarChart,
  Briefcase,
  CheckSquare,
  Settings,
  Clock,
  Database,
  Users,
  Layers,
  Plus,
  ChevronLeft,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", icon: BarChart, active: true },
  { name: "Projects", icon: Briefcase, active: false },
  { name: "Tasks", icon: CheckSquare, active: false },
  { name: "Dashboard", icon: Settings, active: false },
  { name: "Time log", icon: Clock, active: false },
  { name: "Resource mgnt", icon: Database, active: false },
  { name: "Users", icon: Users, active: false },
  { name: "Project template", icon: Layers, active: false },
  { name: "Menu settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-[260px] bg-sidebar-bg flex flex-col">
      {/* Logo */}
      <div className="p-8 pt-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-primary rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-white font-aeonik text-lg font-medium">
            Promage
          </span>
        </div>
      </div>

      {/* Create New Project Button */}
      <div className="px-8 mb-8">
        <button className="w-full bg-white rounded-3xl p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="bg-orange-primary rounded-full p-2">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-sidebar-bg font-aeonik text-sm">
            Create new project
          </span>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-8">
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className={`
              flex items-center gap-4 px-4 py-3 rounded-3xl cursor-pointer transition-colors
              ${
                item.active
                  ? "bg-white text-orange-primary"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }
            `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-aeonik text-sm">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Collapse Button */}
      <div className="absolute right-[-15px] top-8">
        <button className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
          <ChevronLeft className="w-4 h-4 text-sidebar-bg" />
        </button>
      </div>
    </div>
  );
}
