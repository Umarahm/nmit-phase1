import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-transparent">
      {/* Header Content */}
      <div className="flex items-center justify-between px-8 py-6">
        {/* Dashboard Title */}
        <h1 className="text-text-primary font-aeonik text-3xl font-normal">
          Dashboard
        </h1>
        
        {/* Header Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100 w-[400px]">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for anything..." 
                  className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none font-aeonik"
                />
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-full p-3 shadow-sm border border-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
          
          {/* User Profile */}
          <div className="bg-white rounded-full pl-2 pr-5 py-2 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
              </div>
              
              {/* User Info */}
              <div className="flex flex-col">
                <span className="text-text-primary font-aeonik text-sm font-medium">
                  Alex meian
                </span>
                <span className="text-text-secondary font-aeonik text-xs">
                  Product manager
                </span>
              </div>
              
              {/* Dropdown Arrow */}
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-black/8 mx-8"></div>
    </div>
  );
}
