import React from "react";
import { Search, Bell, ChevronDown, Sun, Moon, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
  };

  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-transparent">
      {/* Header Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-6 gap-4 lg:gap-0">
        {/* Mobile Menu & Title */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Mobile/Desktop Menu Button */}
          <SidebarTrigger className="bg-white rounded-full shadow-sm border border-gray-100 h-10 w-10" />

          {/* Dashboard Title */}
          <h1 className="text-text-primary font-aeonik text-2xl lg:text-3xl font-normal">
            Dashboard
          </h1>
        </div>

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

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-white rounded-full p-2 lg:p-3 shadow-sm border border-gray-100 flex-shrink-0 hover:bg-gray-50 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 lg:w-5 h-4 lg:h-5 text-gray-600" />
            ) : (
              <Moon className="w-4 lg:w-5 h-4 lg:h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="bg-white rounded-full p-2 lg:p-3 shadow-sm border border-gray-100 flex-shrink-0">
            <Bell className="w-4 lg:w-5 h-4 lg:h-5 text-gray-600" />
          </div>

          {/* User Profile - Updated with auth data and dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white rounded-full pl-1 lg:pl-2 pr-2 lg:pr-5 py-1 lg:py-2 shadow-sm border border-gray-100 flex-shrink-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-1 lg:gap-3">
                  {/* Avatar */}
                  <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-aeonik text-xs lg:text-sm font-medium">
                      {user ? getInitials(user.name) : 'U'}
                    </span>
                  </div>

                  {/* User Info - Hidden on mobile */}
                  <div className="hidden sm:flex flex-col">
                    <span className="text-text-primary font-aeonik text-sm font-medium">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-text-secondary font-aeonik text-xs">
                      {user?.role || 'Member'}
                    </span>
                  </div>

                  {/* Dropdown Arrow */}
                  <ChevronDown className="w-3 lg:w-4 h-3 lg:h-4 text-gray-600" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-black/8 mx-4 sm:mx-6 lg:mx-8"></div>
    </div>
  );
}
