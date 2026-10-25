import React, { useState } from 'react';
import { Department, Employee, UserSession } from '../types';
import { 
  Building2, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Users, 
  MapPin, 
  UserCheck, 
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface DepartmentViewProps {
  departments: Department[];
  employees: Employee[];
  userSession: UserSession;
  onAddDepartment: (department: Omit<Department, 'id'>) => void;
  onDeleteDepartment: (id: number) => void;
  onTriggerAccessDenied: (actionName: string) => void;
}

export const DepartmentView: React.FC<DepartmentViewProps> = ({
  departments,
  employees,
  userSession,
  onAddDepartment,
  onDeleteDepartment,
  onTriggerAccessDenied
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [headOfDepartment, setHeadOfDepartment] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (userSession.role !== 'ADMIN') {
      onTriggerAccessDenied('Add Department');
      return;
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError('Department name is required.');
      return;
    }

    // Duplicate check
    const duplicate = departments.some(
      d => d.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) {
      setFormError(`Department '${trimmedName}' already exists in Codec Technologies database.`);
      return;
    }

    onAddDepartment({
      name: trimmedName,
      description: description.trim(),
      location: location.trim(),
      headOfDepartment: headOfDepartment.trim()
    });

    setName('');
    setDescription('');
    setLocation('');
    setHeadOfDepartment('');
  };

  const handleDelete = (dept: Department) => {
    setDeleteError(null);

    if (userSession.role !== 'ADMIN') {
      onTriggerAccessDenied('Delete Department');
      return;
    }

    // Foreign Key check: ensure no employees are assigned
    const assignedCount = employees.filter(e => e.departmentId === dept.id).length;
    if (assignedCount > 0) {
      setDeleteError(
        `Cannot delete department '${dept.name}' because ${assignedCount} employee(s) are currently assigned to it. Please reassign them in Employee Directory before deleting.`
      );
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete '${dept.name}'?`)) {
      onDeleteDepartment(dept.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Department Administration</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Maintain organizational divisions, departmental leadership, office locations, and personnel associations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md font-medium">
            Total Divisions: <strong className="text-slate-900">{departments.length}</strong>
          </span>
        </div>
      </div>

      {/* Delete / Referential integrity alert */}
      {deleteError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-bold">Referential Integrity Constraint:</strong> {deleteError}
          </div>
          <button 
            onClick={() => setDeleteError(null)}
            className="text-red-500 hover:text-red-700 font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2-Column Layout: Add Form (or Read-only card) & Department List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Add Department (ADMIN only) */}
        <div className="lg:col-span-5">
          {userSession.role === 'ADMIN' ? (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 className="w-4 h-4 text-blue-700" />
                <h2 className="text-base font-bold text-slate-900">Add New Department</h2>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Artificial Intelligence R&D"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                  {formError && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Head of Department / Director
                  </label>
                  <input
                    type="text"
                    value={headOfDepartment}
                    onChange={(e) => setHeadOfDepartment(e.target.value)}
                    placeholder="e.g. Dr. Robert Vance"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Office Location / Floor
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Tower 3, Floor 5"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description / Scope
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary of department responsibilities and key goals..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Department</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-700">
                <Lock className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Access Policy</h3>
              </div>
              <p className="text-sm text-slate-600">
                You are currently logged in with the <strong>USER</strong> role. Creating, updating, or deleting organizational departments requires <strong>ADMIN</strong> authority.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 space-y-1">
                <div className="font-bold">Notice:</div>
                <div>You can freely browse all existing departments, view associated headcount, and inspect departmental leadership.</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Department List */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Current Corporate Departments</h2>
            <span className="text-xs text-slate-500">{departments.length} registered</span>
          </div>

          <div className="divide-y divide-slate-100">
            {departments.map(dept => {
              const assignedEmployees = employees.filter(e => e.departmentId === dept.id);
              const count = assignedEmployees.length;

              return (
                <div key={dept.id} className="p-5 hover:bg-slate-50/50 transition-colors space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                          <Users className="w-3 h-3" />
                          {count} {count === 1 ? 'employee' : 'employees'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{dept.description || 'No description provided.'}</p>
                    </div>

                    {userSession.role === 'ADMIN' && (
                      <button
                        onClick={() => handleDelete(dept)}
                        title="Delete Department"
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Head: <strong className="text-slate-800">{dept.headOfDepartment || 'Unassigned'}</strong></span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Location: <strong className="text-slate-800">{dept.location || 'Headquarters'}</strong></span>
                    </span>
                  </div>
                </div>
              );
            })}

            {departments.length === 0 && (
              <div className="text-center py-10 text-sm text-slate-500">
                No departments found. Use the form on the left to add one.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
