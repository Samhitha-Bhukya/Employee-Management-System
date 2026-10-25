import React from 'react';
import { Department, Employee, UserSession } from '../types';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Hash, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  Edit3 
} from 'lucide-react';

interface EmployeeModalProps {
  employee: Employee | null;
  departments: Department[];
  userSession: UserSession;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  employee,
  departments,
  userSession,
  onClose,
  onEdit
}) => {
  if (!employee) return null;

  const department = departments.find(d => d.id === employee.departmentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg">
              {employee.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">{employee.fullName}</h2>
              <span className="text-xs text-blue-300 font-mono">{employee.employeeCode} &bull; Codec Technologies</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Top Status & Department strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Status:</span>
              <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${
                employee.employmentStatus === 'ACTIVE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : employee.employmentStatus === 'PROBATION'
                  ? 'bg-amber-100 text-amber-800'
                  : employee.employmentStatus === 'ON_LEAVE'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {employee.employmentStatus}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Department:</span>
              <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-0.5 rounded">
                {department?.name || 'General'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Position */}
            <div className="border border-slate-100 p-3 rounded-md bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                <span>Job Designation</span>
              </span>
              <div className="text-sm font-semibold text-slate-900">{employee.jobTitle}</div>
            </div>

            {/* Compensation */}
            <div className="border border-slate-100 p-3 rounded-md bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-700" />
                <span>Annual Base Salary</span>
              </span>
              <div className="text-sm font-bold font-mono text-blue-900">
                ${Number(employee.salary).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
              </div>
            </div>

            {/* Email */}
            <div className="border border-slate-100 p-3 rounded-md bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-700" />
                <span>Corporate Email</span>
              </span>
              <a href={`mailto:${employee.email}`} className="text-sm text-blue-700 hover:underline">
                {employee.email}
              </a>
            </div>

            {/* Phone */}
            <div className="border border-slate-100 p-3 rounded-md bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>Contact Phone</span>
              </span>
              <div className="text-sm font-mono text-slate-900">{employee.phoneNumber}</div>
            </div>

            {/* Joining Date */}
            <div className="border border-slate-100 p-3 rounded-md bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                <span>Date of Joining</span>
              </span>
              <div className="text-sm text-slate-900">{employee.dateOfJoining}</div>
            </div>

            {/* Office Location */}
            <div className="border border-slate-100 p-3 rounded-md bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span>Assigned Office / Floor</span>
              </span>
              <div className="text-sm text-slate-900">{department?.location || 'Main Office'}</div>
            </div>
          </div>

          {/* Department Head metadata */}
          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-md flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-700" />
              <span>Department Head: <strong>{department?.headOfDepartment || 'N/A'}</strong></span>
            </span>
            <span className="font-mono text-slate-500">ID: #{employee.id}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
          >
            Close Dossier
          </button>

          {userSession.role === 'ADMIN' && (
            <button
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Record</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
