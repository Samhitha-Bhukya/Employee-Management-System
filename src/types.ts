export type Role = 'ADMIN' | 'USER';

export interface UserSession {
  username: string;
  role: Role;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  location: string;
  headOfDepartment: string;
}

export type EmploymentStatus = 'ACTIVE' | 'PROBATION' | 'INACTIVE' | 'ON_LEAVE';

export interface Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  dateOfJoining: string; // YYYY-MM-DD
  salary: number;
  employmentStatus: EmploymentStatus;
  departmentId: number;
  createdAt?: string;
}

export interface ProjectFile {
  path: string;
  name: string;
  type: 'java' | 'xml' | 'properties' | 'html' | 'css' | 'sql' | 'md' | 'gitignore';
  category: 'Configuration' | 'Entity' | 'Repository' | 'Service' | 'Controller' | 'Security & Config' | 'Thymeleaf Templates' | 'Styles' | 'Database' | 'Documentation';
  content: string;
}
