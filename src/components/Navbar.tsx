import React from 'react';
import { UserSession } from '../types';
import { 
  Building2, 
  Users, 
  LayoutDashboard, 
  UserPlus, 
  LogOut, 
  FolderGit2, 
  ShieldAlert, 
  RotateCcw,
  Monitor
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  activeTab: 'app' | 'project';
  setActiveTab: (tab: 'app' | 'project') => void;
  userSession: UserSession;
  onLogout: () => void;
  onSwitchRole: (newRole: 'ADMIN' | 'USER') => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeTab,
  setActiveTab,
  userSession,
  onLogout,
  onSwitchRole,
  onResetData
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b-2 border-blue-600 text-white shadow-md">
      {/* Top Banner for Internship & Mode Switcher */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Codec Technologies &bull; Academic Java Internship Submission Project</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-blue-400 font-mono">Spring Boot 3.2.4 &bull; MySQL &bull; Thymeleaf &bull; Spring Security 6</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded p-0.5">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                activeTab === 'app'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Live Application</span>
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                activeTab === 'project'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Maven Project &amp; Export (.zip)</span>
            </button>
          </div>

          <button
            onClick={onResetData}
            title="Reset database to initial sample data"
            className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Seed Data</span>
          </button>
        </div>
      </div>

      {/* Main Corporate Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => { setActiveTab('app'); setCurrentView('dashboard'); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-extrabold text-white text-lg tracking-wider shadow-sm group-hover:scale-105 transition-transform">
            CT
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">Codec Technologies</span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded">
                EMS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">Employee Management System</p>
          </div>
        </div>

        {/* Navigation Items (when in app mode) */}
        {activeTab === 'app' && (
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView('employees')}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentView === 'employees' || currentView === 'add-employee' || currentView === 'edit-employee'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Employees</span>
            </button>

            <button
              onClick={() => setCurrentView('departments')}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentView === 'departments'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Departments</span>
            </button>

            {userSession.role === 'ADMIN' ? (
              <button
                onClick={() => setCurrentView('add-employee')}
                className="ml-2 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded text-sm font-semibold transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Register Employee</span>
              </button>
            ) : (
              <span 
                title="USER role cannot register employees (Admin only)"
                className="ml-2 flex items-center gap-1 text-slate-500 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1.5 rounded text-xs cursor-not-allowed"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Required to Add</span>
              </span>
            )}
          </nav>
        )}

        {/* User Session & Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Role Toggle for testing RBAC */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded border border-slate-700">
            <span className="text-xs text-slate-400">Testing RBAC:</span>
            <button
              onClick={() => onSwitchRole(userSession.role === 'ADMIN' ? 'USER' : 'ADMIN')}
              className={`text-[11px] font-bold px-2 py-0.5 rounded transition-all ${
                userSession.role === 'ADMIN'
                  ? 'bg-red-900/60 text-red-200 border border-red-700 hover:bg-red-800/80'
                  : 'bg-blue-900/60 text-blue-200 border border-blue-700 hover:bg-blue-800/80'
              }`}
            >
              Switch to {userSession.role === 'ADMIN' ? 'USER' : 'ADMIN'}
            </button>
          </div>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-white leading-tight">{userSession.name}</div>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className={`inline-block text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded tracking-wider ${
                  userSession.role === 'ADMIN'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                  {userSession.role}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">@{userSession.username}</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign out of portal"
              className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 sm:px-3 sm:py-1.5 rounded text-xs font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Sub-bar */}
      {activeTab === 'app' && (
        <div className="md:hidden flex items-center justify-around bg-slate-800/90 border-t border-slate-700 px-2 py-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center text-xs py-1 px-3 rounded ${
              currentView === 'dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentView('employees')}
            className={`flex flex-col items-center text-xs py-1 px-3 rounded ${
              currentView === 'employees' ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span>Directory</span>
          </button>
          <button
            onClick={() => setCurrentView('departments')}
            className={`flex flex-col items-center text-xs py-1 px-3 rounded ${
              currentView === 'departments' ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Building2 className="w-4 h-4 mb-0.5" />
            <span>Departments</span>
          </button>
          {userSession.role === 'ADMIN' && (
            <button
              onClick={() => setCurrentView('add-employee')}
              className={`flex flex-col items-center text-xs py-1 px-3 rounded ${
                currentView === 'add-employee' ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <UserPlus className="w-4 h-4 mb-0.5" />
              <span>+ Add</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
