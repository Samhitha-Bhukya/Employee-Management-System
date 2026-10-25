import React from 'react';
import { Department, Employee, UserSession } from '../types';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  Database, 
  UserPlus, 
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';

interface DashboardViewProps {
  employees: Employee[];
  departments: Department[];
  userSession: UserSession;
  onNavigate: (view: string) => void;
  onViewEmployee: (employee: Employee) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  employees,
  departments,
  userSession,
  onNavigate,
  onViewEmployee
}) => {
  const totalEmployees = employees.length;
  const totalDepartments = departments.length;

  // Department counts
  const departmentCounts = departments.map(dept => {
    const count = employees.filter(e => e.departmentId === dept.id).length;
    const percentage = totalEmployees > 0 ? Math.round((count / totalEmployees) * 100) : 0;
    return {
      id: dept.id,
      name: dept.name,
      location: dept.location,
      head: dept.headOfDepartment,
      count,
      percentage
    };
  });

  // Status counts
  const activeCount = employees.filter(e => e.employmentStatus === 'ACTIVE').length;
  const probationCount = employees.filter(e => e.employmentStatus === 'PROBATION').length;
  const inactiveCount = employees.filter(e => e.employmentStatus === 'INACTIVE').length;
  const onLeaveCount = employees.filter(e => e.employmentStatus === 'ON_LEAVE').length;

  // Average Salary
  const totalSalary = employees.reduce((sum, emp) => sum + (Number(emp.salary) || 0), 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  // Recent 5 employees
  const recentEmployees = [...employees].slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Executive Dashboard</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Real-time organizational headcount metrics, departmental distribution, and personnel overview.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {userSession.role === 'ADMIN' && (
            <button
              onClick={() => onNavigate('add-employee')}
              className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-4 py-2 rounded-md shadow-sm transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Employee</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('employees')}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm px-4 py-2 rounded-md shadow-sm transition-colors"
          >
            <span>View All Staff</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Employees</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{totalEmployees}</div>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> {activeCount} Active Status
            </span>
          </div>
        </div>

        {/* Total Departments */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Departments</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{totalDepartments}</div>
            <span className="text-xs text-slate-500 mt-0.5 block">Active divisions</span>
          </div>
        </div>

        {/* Average Compensation */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg. Annual Salary</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5 font-mono">
              ${avgSalary.toLocaleString()}
            </div>
            <span className="text-xs text-slate-500 mt-0.5 block">Full-time compensation</span>
          </div>
        </div>

        {/* Security Role & Persistence */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
            userSession.role === 'ADMIN' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Role</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-extrabold uppercase ${
                userSession.role === 'ADMIN' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                ROLE_{userSession.role}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              {userSession.role === 'ADMIN' ? 'Full Read/Write/Delete' : 'Protected Read-Only'}
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Section: Department Headcount Breakdown + Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" />
              <h2 className="text-base font-semibold text-slate-900">Headcount by Department</h2>
            </div>
            <button
              onClick={() => onNavigate('departments')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-5 flex-1 space-y-4">
            {departmentCounts.map(dept => (
              <div key={dept.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-semibold text-slate-800">{dept.name}</div>
                  <div className="text-xs font-mono font-medium text-slate-500">
                    <span className="text-slate-900 font-bold">{dept.count}</span> staff ({dept.percentage}%)
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Lead: {dept.head || 'Unassigned'}</span>
                  <span>{dept.location || 'Main Office'}</span>
                </div>
              </div>
            ))}

            {departmentCounts.length === 0 && (
              <div className="text-center py-6 text-sm text-slate-500">
                No departments currently configured.
              </div>
            )}
          </div>

          {/* Status Breakdown Footer */}
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 grid grid-cols-4 gap-2 text-center text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Active</span>
              <span className="font-bold text-emerald-700 font-mono text-sm">{activeCount}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Probation</span>
              <span className="font-bold text-amber-700 font-mono text-sm">{probationCount}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">On Leave</span>
              <span className="font-bold text-indigo-700 font-mono text-sm">{onLeaveCount}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Inactive</span>
              <span className="font-bold text-slate-700 font-mono text-sm">{inactiveCount}</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Staff Registrations (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700" />
              <h2 className="text-base font-semibold text-slate-900">Recent Employee Registrations</h2>
            </div>
            <button
              onClick={() => onNavigate('employees')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>View All ({totalEmployees})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Emp ID</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEmployees.map(emp => {
                  const dept = departments.find(d => d.id === emp.departmentId);
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {emp.employeeCode}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{emp.fullName}</div>
                        <div className="text-xs text-slate-500">{emp.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                          {dept?.name || 'General'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 text-xs font-medium">
                        {emp.jobTitle}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                          emp.employmentStatus === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : emp.employmentStatus === 'PROBATION'
                            ? 'bg-amber-100 text-amber-800'
                            : emp.employmentStatus === 'ON_LEAVE'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {emp.employmentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onViewEmployee(emp)}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {recentEmployees.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-sm text-slate-500">
                      No employees registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Synced with MySQL JPA entities</span>
            </span>
            <span>Showing top 5 newest staff records</span>
          </div>
        </div>
      </div>
    </div>
  );
};
