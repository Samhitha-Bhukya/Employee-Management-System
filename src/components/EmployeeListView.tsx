import React, { useState, useMemo } from 'react';
import { Department, Employee, EmploymentStatus, UserSession } from '../types';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  UserPlus, 
  Eye, 
  Edit3, 
  Trash2, 
  ShieldAlert, 
  Mail, 
  Building2, 
  Calendar, 
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface EmployeeListViewProps {
  employees: Employee[];
  departments: Department[];
  userSession: UserSession;
  onNavigate: (view: string) => void;
  onViewEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
  onTriggerAccessDenied: (actionName: string) => void;
}

export const EmployeeListView: React.FC<EmployeeListViewProps> = ({
  employees,
  departments,
  userSession,
  onNavigate,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onTriggerAccessDenied
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [deleteCandidate, setDeleteCandidate] = useState<Employee | null>(null);

  // Search and filter memoized logic
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      // Keyword search
      const term = searchTerm.trim().toLowerCase();
      const matchesKeyword = !term || 
        emp.employeeCode.toLowerCase().includes(term) ||
        emp.fullName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.jobTitle.toLowerCase().includes(term);

      // Department filter
      const matchesDept = selectedDepartment === 'ALL' || 
        emp.departmentId === Number(selectedDepartment);

      // Status filter
      const matchesStatus = selectedStatus === 'ALL' || 
        emp.employmentStatus === selectedStatus;

      return matchesKeyword && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('ALL');
    setSelectedStatus('ALL');
  };

  const handleEditClick = (emp: Employee) => {
    if (userSession.role === 'ADMIN') {
      onEditEmployee(emp);
    } else {
      onTriggerAccessDenied('Update Employee Record');
    }
  };

  const handleDeleteClick = (emp: Employee) => {
    if (userSession.role === 'ADMIN') {
      setDeleteCandidate(emp);
    } else {
      onTriggerAccessDenied('Delete Employee Record');
    }
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      onDeleteEmployee(deleteCandidate);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Employee Directory</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Search, filter, and inspect enterprise personnel records across all Codec Technologies branches.
          </p>
        </div>

        <div>
          {userSession.role === 'ADMIN' ? (
            <button
              onClick={() => onNavigate('add-employee')}
              className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-4 py-2 rounded-md shadow-sm transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Employee</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Viewing in <strong>USER</strong> mode (Read-Only)</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Keyword Search */}
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Search Staff
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID (EMP-1001), Name, or Job Title..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900"
            >
              <option value="ALL">All Departments ({departments.length})</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="PROBATION">PROBATION</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="ON_LEAVE">ON_LEAVE</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="md:col-span-2 flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              title="Reset all search & filter parameters"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Count Summary */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900">{filteredEmployees.length}</strong> of{' '}
            <strong className="text-slate-900">{employees.length}</strong> total employees
          </span>
          {(searchTerm || selectedDepartment !== 'ALL' || selectedStatus !== 'ALL') && (
            <span className="text-blue-700 font-medium">Filtered Results Active</span>
          )}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Emp ID</th>
                <th className="px-4 py-3.5">Full Name</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Job Title</th>
                <th className="px-4 py-3.5">Corporate Email</th>
                <th className="px-4 py-3.5">Joining Date</th>
                <th className="px-4 py-3.5">Salary</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map(emp => {
                const dept = departments.find(d => d.id === emp.departmentId);
                return (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Employee ID */}
                    <td className="px-4 py-3.5 font-mono text-xs font-bold">
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                        {emp.employeeCode}
                      </span>
                    </td>

                    {/* Full Name & Phone */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">{emp.fullName}</div>
                      <div className="text-xs text-slate-500 font-mono">{emp.phoneNumber}</div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        {dept?.name || 'Unassigned'}
                      </span>
                    </td>

                    {/* Job Title */}
                    <td className="px-4 py-3.5 text-slate-800 font-medium">
                      {emp.jobTitle}
                    </td>

                    {/* Corporate Email */}
                    <td className="px-4 py-3.5">
                      <a
                        href={`mailto:${emp.email}`}
                        className="text-xs text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{emp.email}</span>
                      </a>
                    </td>

                    {/* Joining Date */}
                    <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{emp.dateOfJoining}</span>
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="px-4 py-3.5 font-mono text-xs font-bold text-slate-900">
                      ${Number(emp.salary).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
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

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* View Action (Accessible by both ADMIN and USER) */}
                        <button
                          onClick={() => onViewEmployee(emp)}
                          title="View Employee Dossier"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden lg:inline">View</span>
                        </button>

                        {/* Edit Action (ADMIN only; USER shows 403) */}
                        <button
                          onClick={() => handleEditClick(emp)}
                          title={userSession.role === 'ADMIN' ? 'Edit Details' : 'Admin privilege required to edit'}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
                            userSession.role === 'ADMIN'
                              ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                              : 'text-slate-400 bg-slate-50 border border-slate-200 hover:text-slate-600'
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden lg:inline">Edit</span>
                        </button>

                        {/* Delete Action (ADMIN only; USER shows 403) */}
                        <button
                          onClick={() => handleDeleteClick(emp)}
                          title={userSession.role === 'ADMIN' ? 'Delete Record' : 'Admin privilege required to delete'}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
                            userSession.role === 'ADMIN'
                              ? 'text-red-700 bg-red-50 hover:bg-red-100 border border-red-200'
                              : 'text-slate-400 bg-slate-50 border border-slate-200 hover:text-slate-600'
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden lg:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Helpful Empty State */}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">No matching employees found</h3>
                      <p className="text-sm text-slate-500">
                        We couldn't find any staff members matching "{searchTerm || 'selected filters'}". Try adjusting your search query or reset your filters.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Clear All Filters</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Employee Record?</h3>
                <p className="text-xs text-slate-500">Spring Data JPA cascade confirmation</p>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Are you sure you want to permanently delete record for{' '}
              <strong className="text-slate-900">{deleteCandidate.fullName}</strong> (
              <span className="font-mono font-semibold text-blue-700">{deleteCandidate.employeeCode}</span>)?
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-xs transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
