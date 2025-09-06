import React from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Header } from '../components/dashboard/Header';
import { OverviewSection } from '../components/dashboard/OverviewSection';
import { ProjectSummary } from '../components/dashboard/ProjectSummary';
import { OverallProgress } from '../components/dashboard/OverallProgress';
import { TodayTasks } from '../components/dashboard/TodayTasks';
import { ProjectsWorkload } from '../components/dashboard/ProjectsWorkload';
import { HelpButton } from '../components/dashboard/HelpButton';

export default function Index() {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Main Layout Container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 ml-[260px]">
          {/* Header */}
          <Header />
          
          {/* Content Area */}
          <div className="px-8 pb-8">
            {/* Overview Section */}
            <OverviewSection />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
              {/* Project Summary - Takes 2 columns */}
              <div className="xl:col-span-2">
                <ProjectSummary />
              </div>
              
              {/* Overall Progress - Takes 1 column */}
              <div className="xl:col-span-1">
                <OverallProgress />
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
              {/* Today Tasks - Takes 2 columns */}
              <div className="xl:col-span-2">
                <TodayTasks />
              </div>
              
              {/* Projects Workload - Takes 1 column */}
              <div className="xl:col-span-1">
                <ProjectsWorkload />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Help Button - Fixed position */}
      <HelpButton />
    </div>
  );
}
