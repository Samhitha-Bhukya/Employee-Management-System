import { Department, Employee } from '../types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    description: 'Software architecture, full-stack development, QA, and cloud DevOps',
    location: 'Tower 1, Floor 4',
    headOfDepartment: 'Dr. Sarah Mitchell'
  },
  {
    id: 2,
    name: 'Human Resources',
    description: 'Talent acquisition, employee welfare, onboarding, and payroll compliance',
    location: 'Tower 2, Floor 1',
    headOfDepartment: 'David Vance'
  },
  {
    id: 3,
    name: 'Finance & Accounts',
    description: 'Corporate budgeting, audit, taxation, and financial planning',
    location: 'Tower 1, Floor 2',
    headOfDepartment: 'Elena Rostova'
  },
  {
    id: 4,
    name: 'Marketing & Growth',
    description: 'Digital campaigns, branding, community engagement, and analytics',
    location: 'Tower 3, Floor 3',
    headOfDepartment: 'Rajiv Patel'
  },
  {
    id: 5,
    name: 'Operations & IT Support',
    description: 'Internal IT infrastructure, security operations, and facility management',
    location: 'Tower 2, Floor 2',
    headOfDepartment: 'Karen Lin'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 1,
    employeeCode: 'EMP-1001',
    fullName: 'Alexander Hayes',
    email: 'alexander.hayes@codectechnologies.com',
    phoneNumber: '+1 (555) 234-5678',
    jobTitle: 'Senior Java Architect',
    dateOfJoining: '2022-03-15',
    salary: 115000,
    employmentStatus: 'ACTIVE',
    departmentId: 1
  },
  {
    id: 2,
    employeeCode: 'EMP-1002',
    fullName: 'Sophia Chen',
    email: 'sophia.chen@codectechnologies.com',
    phoneNumber: '+1 (555) 345-6789',
    jobTitle: 'Full Stack Java & React Engineer',
    dateOfJoining: '2023-01-10',
    salary: 88000,
    employmentStatus: 'ACTIVE',
    departmentId: 1
  },
  {
    id: 3,
    employeeCode: 'EMP-1003',
    fullName: 'Marcus Aurelius Vance',
    email: 'marcus.vance@codectechnologies.com',
    phoneNumber: '+1 (555) 456-7890',
    jobTitle: 'Senior HR Talent Specialist',
    dateOfJoining: '2021-08-01',
    salary: 65000,
    employmentStatus: 'ACTIVE',
    departmentId: 2
  },
  {
    id: 4,
    employeeCode: 'EMP-1004',
    fullName: 'Isabella Morales',
    email: 'isabella.m@codectechnologies.com',
    phoneNumber: '+1 (555) 567-8901',
    jobTitle: 'Lead Financial Analyst',
    dateOfJoining: '2020-11-20',
    salary: 92000,
    employmentStatus: 'ACTIVE',
    departmentId: 3
  },
  {
    id: 5,
    employeeCode: 'EMP-1005',
    fullName: 'Tariq Al-Mansoor',
    email: 'tariq.mansoor@codectechnologies.com',
    phoneNumber: '+1 (555) 678-9012',
    jobTitle: 'Digital Marketing Lead',
    dateOfJoining: '2023-06-01',
    salary: 74000,
    employmentStatus: 'ACTIVE',
    departmentId: 4
  },
  {
    id: 6,
    employeeCode: 'EMP-1006',
    fullName: 'Emily Watson',
    email: 'emily.watson@codectechnologies.com',
    phoneNumber: '+1 (555) 789-0123',
    jobTitle: 'Junior Java Developer (Intern)',
    dateOfJoining: '2024-02-15',
    salary: 48000,
    employmentStatus: 'PROBATION',
    departmentId: 1
  },
  {
    id: 7,
    employeeCode: 'EMP-1007',
    fullName: 'Nathan Drake',
    email: 'nathan.drake@codectechnologies.com',
    phoneNumber: '+1 (555) 890-1234',
    jobTitle: 'DevOps & Systems Lead',
    dateOfJoining: '2021-05-18',
    salary: 102000,
    employmentStatus: 'ACTIVE',
    departmentId: 5
  },
  {
    id: 8,
    employeeCode: 'EMP-1008',
    fullName: 'Grace Hopper Taylor',
    email: 'grace.taylor@codectechnologies.com',
    phoneNumber: '+1 (555) 901-2345',
    jobTitle: 'Operations Coordinator',
    dateOfJoining: '2023-09-01',
    salary: 58000,
    employmentStatus: 'ACTIVE',
    departmentId: 5
  }
];
