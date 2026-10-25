import React, { useState, useEffect } from 'react';
import { Department, Employee, UserSession } from './types';
import { INITIAL_DEPARTMENTS, INITIAL_EMPLOYEES } from './data/initialData';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { EmployeeListView } from './components/EmployeeListView';
import { EmployeeFormView } from './components/EmployeeFormView';
import { DepartmentView } from './components/DepartmentView';
import { EmployeeModal } from './components/EmployeeModal';
import { AccessDeniedModal } from './components/AccessDeniedModal';
import { LoginView } from './components/LoginView';
import { ProjectStudio } from './components/ProjectStudio';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  // Authentication State
  const [userSession, setUserSession] = useState<UserSession | null>({
    username: 'admin',
    role: 'ADMIN',
    name: 'Sarah Mitchell (Administrator)'
  });
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  // View state
  const [activeTab, setActiveTab] = useState<'app' | 'project'>('app');
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Persistence via localStorage
  const [departments, setDepartments] = useState<Department[]>(() => {
    try {
      const saved = localStorage.getItem('codec_ems_departments');
      return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
    } catch {
      return INITIAL_DEPARTMENTS;
    }
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem('codec_ems_employees');
      return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
    } catch {
      return INITIAL_EMPLOYEES;
    }
  });

  useEffect(() => {
    localStorage.setItem('codec_ems_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('codec_ems_employees', JSON.stringify(employees));
  }, [employees]);

  // Flash notifications
  const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showFlash = (text: string, type: 'success' | 'error' = 'success') => {
    setFlashMessage({ type, text });
    setTimeout(() => {
      setFlashMessage(null);
    }, 4500);
  };

  // Modals
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [accessDeniedAction, setAccessDeniedAction] = useState<string | null>(null);

  // Authentication Handlers
  const handleLogout = () => {
    setUserSession(null);
    setLogoutMessage('You have been logged out of Codec Technologies EMS portal.');
  };

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    setLogoutMessage(null);
    setCurrentView('dashboard');
    showFlash(`Welcome back, ${session.name}! Authenticated with ${session.role} privileges.`, 'success');
  };

  const handleSwitchRole = (newRole: 'ADMIN' | 'USER') => {
    if (!userSession) return;
    setUserSession({
      ...userSession,
      role: newRole,
      name: newRole === 'ADMIN' ? 'Sarah Mitchell (Administrator)' : 'Alex Johnson (Staff Member)'
    });
    showFlash(`Session switched to ${newRole} role for Spring Security RBAC testing.`, 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all employee and department records to initial seed data?')) {
      setDepartments(INITIAL_DEPARTMENTS);
      setEmployees(INITIAL_EMPLOYEES);
      showFlash('MySQL database simulation restored to initial seed dataset.', 'success');
    }
  };

  // Employee CRUD
  const handleSaveEmployee = (data: Omit<Employee, 'id'> & { id?: number }) => {
    if (data.id) {
      // Update
      setEmployees(prev => prev.map(emp => emp.id === data.id ? { ...emp, ...data, id: data.id! } : emp));
      showFlash(`Employee record for ${data.fullName} (${data.employeeCode}) was successfully updated!`, 'success');
    } else {
      // Add
      const nextId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      const newEmployee: Employee = {
        ...data,
        id: nextId
      };
      setEmployees(prev => [newEmployee, ...prev]);
      showFlash(`Employee ${data.fullName} (${data.employeeCode}) was registered successfully!`, 'success');
    }
    setEditingEmployee(null);
    setCurrentView('employees');
  };

  const handleEditEmployee = (emp: Employee) => {
    if (userSession?.role !== 'ADMIN') {
      setAccessDeniedAction('Update Employee Record');
      return;
    }
    setEditingEmployee(emp);
    setCurrentView('edit-employee');
  };

  const handleDeleteEmployee = (emp: Employee) => {
    if (userSession?.role !== 'ADMIN') {
      setAccessDeniedAction('Delete Employee Record');
      return;
    }
    setEmployees(prev => prev.filter(e => e.id !== emp.id));
    showFlash(`Employee ${emp.fullName} (${emp.employeeCode}) was deleted from the system.`, 'success');
  };

  // Department CRUD
  const handleAddDepartment = (deptData: Omit<Department, 'id'>) => {
    const nextId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
    const newDept: Department = {
      ...deptData,
      id: nextId
    };
    setDepartments(prev => [...prev, newDept]);
    showFlash(`Department '${deptData.name}' registered successfully!`, 'success');
  };

  const handleDeleteDepartment = (id: number) => {
    const dept = departments.find(d => d.id === id);
    setDepartments(prev => prev.filter(d => d.id !== id));
    showFlash(`Department '${dept?.name}' was deleted successfully.`, 'success');
  };

  // If not logged in, display Spring Security Login screen
  if (!userSession) {
    return <LoginView onLoginSuccess={handleLoginSuccess} logoutMessage={logoutMessage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userSession={userSession}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Flash Alert Banner */}
        {flashMessage && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center justify-between text-sm shadow-xs transition-all ${
            flashMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            <div className="flex items-center gap-2.5">
              {flashMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span className="font-semibold">{flashMessage.text}</span>
            </div>
            <button
              onClick={() => setFlashMessage(null)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* View Routing */}
        {activeTab === 'project' ? (
          <ProjectStudio />
        ) : (
          <>
            {currentView === 'dashboard' && (
              <DashboardView
                employees={employees}
                departments={departments}
                userSession={userSession}
                onNavigate={setCurrentView}
                onViewEmployee={setViewingEmployee}
              />
            )}

            {currentView === 'employees' && (
              <EmployeeListView
                employees={employees}
                departments={departments}
                userSession={userSession}
                onNavigate={setCurrentView}
                onViewEmployee={setViewingEmployee}
                onEditEmployee={handleEditEmployee}
                onDeleteEmployee={handleDeleteEmployee}
                onTriggerAccessDenied={(action) => setAccessDeniedAction(action)}
              />
            )}

            {currentView === 'add-employee' && (
              <EmployeeFormView
                departments={departments}
                existingEmployees={employees}
                onSave={handleSaveEmployee}
                onCancel={() => setCurrentView('employees')}
              />
            )}

            {currentView === 'edit-employee' && (
              <EmployeeFormView
                initialEmployee={editingEmployee}
                departments={departments}
                existingEmployees={employees}
                onSave={handleSaveEmployee}
                onCancel={() => {
                  setEditingEmployee(null);
                  setCurrentView('employees');
                }}
              />
            )}

            {currentView === 'departments' && (
              <DepartmentView
                departments={departments}
                employees={employees}
                userSession={userSession}
                onAddDepartment={handleAddDepartment}
                onDeleteDepartment={handleDeleteDepartment}
                onTriggerAccessDenied={(action) => setAccessDeniedAction(action)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-700 text-white font-bold flex items-center justify-center text-xs">CT</span>
            <span className="font-semibold text-slate-200">Codec Technologies Employee Management System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Spring Boot 3.2.4</span>
            <span>&bull;</span>
            <span>Spring Data JPA</span>
            <span>&bull;</span>
            <span>MySQL 8.0</span>
            <span>&bull;</span>
            <span>Spring Security 6</span>
          </div>
          <div>
            &copy; 2026 Academic Internship Submission. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Employee Dossier Modal */}
      <EmployeeModal
        employee={viewingEmployee}
        departments={departments}
        userSession={userSession}
        onClose={() => setViewingEmployee(null)}
        onEdit={handleEditEmployee}
      />

      {/* Spring Security 403 Access Denied Modal */}
      <AccessDeniedModal
        actionName={accessDeniedAction}
        onClose={() => setAccessDeniedAction(null)}
        onSwitchToAdmin={() => handleSwitchRole('ADMIN')}
      />
    </div>
  );
}
