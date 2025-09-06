import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-transparent">
      {/* Header Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-6 gap-4 lg:gap-0">
        {/* Dashboard Title */}
        <h1 className="text-text-primary font-aeonik text-2xl lg:text-3xl font-normal">
          Dashboard
        </h1>

        {/* Header Actions */}
        <div className="flex items-center gap-2 lg:gap-4 w-full lg:w-auto">
          {/* Search Bar - Responsive width */}
          <div className="relative flex-1 lg:flex-none">
            <div className="bg-white rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-sm border border-gray-100 w-full lg:w-[400px]">
              <div className="flex items-center gap-3">
                <Search className="w-4 lg:w-5 h-4 lg:h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none font-aeonik"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-full p-2 lg:p-3 shadow-sm border border-gray-100 flex-shrink-0">
            <Bell className="w-4 lg:w-5 h-4 lg:h-5 text-gray-600" />
          </div>

          {/* User Profile - Condensed on mobile */}
          <div className="bg-white rounded-full pl-1 lg:pl-2 pr-2 lg:pr-5 py-1 lg:py-2 shadow-sm border border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-1 lg:gap-3">
              {/* Avatar */}
              <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
              </div>

              {/* User Info - Hidden on mobile */}
              <div className="hidden sm:flex flex-col">
                <span className="text-text-primary font-aeonik text-sm font-medium">
                  Alex meian
                </span>
                <span className="text-text-secondary font-aeonik text-xs">
                  Product manager
                </span>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown className="w-3 lg:w-4 h-3 lg:h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-black/8 mx-4 sm:mx-6 lg:mx-8"></div>
    </div>
  );
}
