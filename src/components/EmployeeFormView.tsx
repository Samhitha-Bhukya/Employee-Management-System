import React, { useState, useEffect } from 'react';
import { Department, Employee, EmploymentStatus } from '../types';
import { 
  UserPlus, 
  ArrowLeft, 
  Save, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Hash,
  User
} from 'lucide-react';

interface EmployeeFormViewProps {
  initialEmployee?: Employee | null;
  departments: Department[];
  existingEmployees: Employee[];
  onSave: (employeeData: Omit<Employee, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}

export const EmployeeFormView: React.FC<EmployeeFormViewProps> = ({
  initialEmployee,
  departments,
  existingEmployees,
  onSave,
  onCancel
}) => {
  const isEditing = Boolean(initialEmployee && initialEmployee.id);

  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    departmentId: departments[0]?.id || 1,
    jobTitle: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    salary: '75000',
    employmentStatus: 'ACTIVE' as EmploymentStatus
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialEmployee) {
      setFormData({
        employeeCode: initialEmployee.employeeCode,
        fullName: initialEmployee.fullName,
        email: initialEmployee.email,
        phoneNumber: initialEmployee.phoneNumber,
        departmentId: initialEmployee.departmentId,
        jobTitle: initialEmployee.jobTitle,
        dateOfJoining: initialEmployee.dateOfJoining,
        salary: String(initialEmployee.salary),
        employmentStatus: initialEmployee.employmentStatus
      });
    }
  }, [initialEmployee]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // 1. Employee Code validation
    if (!formData.employeeCode.trim()) {
      newErrors.employeeCode = 'Employee Code is mandatory (e.g. EMP-1010).';
    } else {
      const codeRegex = /^[A-Za-z0-9_-]{3,20}$/;
      if (!codeRegex.test(formData.employeeCode.trim())) {
        newErrors.employeeCode = 'Employee Code must be 3-20 alphanumeric characters (hyphens allowed).';
      } else {
        // Duplicate check
        const isDuplicate = existingEmployees.some(emp => 
          emp.employeeCode.toLowerCase() === formData.employeeCode.trim().toLowerCase() &&
          (!isEditing || emp.id !== initialEmployee?.id)
        );
        if (isDuplicate) {
          newErrors.employeeCode = `Employee ID '${formData.employeeCode.toUpperCase()}' is already registered in MySQL.`;
        }
      }
    }

    // 2. Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full legal name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must contain at least 2 characters.';
    }

    // 3. Email validation & duplicate check
    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid corporate email address (e.g. user@codectechnologies.com).';
      } else {
        const isDuplicateEmail = existingEmployees.some(emp => 
          emp.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          (!isEditing || emp.id !== initialEmployee?.id)
        );
        if (isDuplicateEmail) {
          newErrors.email = `Email '${formData.email.toLowerCase()}' is already assigned to another employee.`;
        }
      }
    }

    // 4. Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Contact phone number is required.';
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Phone number must be at least 7 digits.';
    }

    // 5. Job Title
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title / designation is required.';
    }

    // 6. Department
    if (!formData.departmentId) {
      newErrors.departmentId = 'Department selection is mandatory.';
    }

    // 7. Date of Joining
    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = 'Date of joining is required.';
    }

    // 8. Salary validation (must be positive)
    const numSalary = Number(formData.salary);
    if (isNaN(numSalary) || numSalary <= 0) {
      newErrors.salary = 'Annual salary must be a positive number greater than 0.';
    } else if (numSalary > 10000000) {
      newErrors.salary = 'Salary exceeds standard enterprise range ($10,000,000).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        id: initialEmployee?.id,
        employeeCode: formData.employeeCode.trim().toUpperCase(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        jobTitle: formData.jobTitle.trim(),
        departmentId: Number(formData.departmentId),
        dateOfJoining: formData.dateOfJoining,
        salary: Number(formData.salary),
        employmentStatus: formData.employmentStatus
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Directory</span>
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? `Update Record: ${initialEmployee?.fullName}` : 'Register New Employee'}
          </h1>
          <p className="text-sm text-slate-600">
            {isEditing
              ? `Editing employee record for ${initialEmployee?.employeeCode} in Codec Technologies MySQL database.`
              : 'Add a new personnel record to Codec Technologies with Hibernate & Bean Validation.'}
          </p>
        </div>

        <button
          onClick={onCancel}
          className="px-3.5 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Identification */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 pb-2 mb-4 border-b border-blue-100 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-700" />
              <span>1. Corporate Identification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Employee Code */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Employee Code / ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    placeholder="e.g. EMP-1010"
                    className={`w-full px-3.5 py-2 text-sm font-mono bg-white border rounded-md focus:outline-none focus:ring-2 uppercase ${
                      errors.employeeCode
                        ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                        : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.employeeCode && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.employeeCode}</span>
                  </p>
                )}
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Must be unique across Codec Technologies.
                </span>
              </div>

              {/* Full Legal Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alexander Hamilton"
                    className={`w-full px-3.5 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                        : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 pb-2 mb-4 border-b border-blue-100 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              <span>2. Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Corporate Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@codectechnologies.com"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-3.5 py-2 text-sm font-mono bg-white border rounded-md focus:outline-none focus:ring-2 ${
                    errors.phoneNumber
                      ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Job Role & Department */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 pb-2 mb-4 border-b border-blue-100 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-700" />
              <span>3. Department &amp; Position</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Department */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Assigned Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.location || 'HQ'})
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="text-xs text-red-600 font-medium mt-1">{errors.departmentId}</p>
                )}
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Job Title / Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="e.g. Senior Java Engineer"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 ${
                    errors.jobTitle
                      ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
                  }`}
                />
                {errors.jobTitle && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.jobTitle}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Compensation & Status */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 pb-2 mb-4 border-b border-blue-100 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-700" />
              <span>4. Compensation &amp; Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Salary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Annual Salary ($ USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    step="100"
                    min="1"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="75000"
                    className={`w-full pl-8 pr-3.5 py-2 text-sm font-mono bg-white border rounded-md focus:outline-none focus:ring-2 ${
                      errors.salary
                        ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                        : 'border-slate-300 focus:ring-blue-600 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.salary && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.salary}</span>
                  </p>
                )}
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Date of Joining <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfJoining}
                  onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
                {errors.dateOfJoining && (
                  <p className="text-xs text-red-600 font-medium mt-1">{errors.dateOfJoining}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as EmploymentStatus })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PROBATION">PROBATION</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ON_LEAVE">ON_LEAVE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Register Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
