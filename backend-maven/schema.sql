-- ==============================================================================
-- Codec Technologies - Employee Management System (EMS) MySQL Database Schema
-- Database: ems_db
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS ems_db;
USE ems_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    location VARCHAR(100),
    head_of_department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    date_of_joining DATE NOT NULL,
    salary DECIMAL(12, 2) NOT NULL,
    employment_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    department_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_department FOREIGN KEY (department_id) 
        REFERENCES departments(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Initial Seed Data
INSERT INTO departments (name, description, location, head_of_department) VALUES
('Engineering', 'Software architecture, full-stack development, and QA', 'Building A, Floor 3', 'Dr. Sarah Mitchell'),
('Human Resources', 'Talent acquisition, employee welfare, and onboarding', 'Building B, Floor 1', 'David Vance'),
('Finance', 'Payroll, accounting, budgeting, and tax compliance', 'Building A, Floor 2', 'Elena Rostova'),
('Marketing', 'Brand growth, digital campaigns, and community management', 'Building C, Floor 4', 'Rajiv Patel'),
('Operations', 'Logistics, IT support, facilities, and vendor management', 'Building B, Floor 2', 'Karen Lin')
ON DUPLICATE KEY UPDATE name=name;

-- Sample Employees
INSERT INTO employees (employee_code, full_name, email, phone_number, job_title, date_of_joining, salary, employment_status, department_id) VALUES
('EMP-1001', 'Alexander Hayes', 'alexander.hayes@codectechnologies.com', '+1 (555) 234-5678', 'Senior Java Architect', '2022-03-15', 115000.00, 'ACTIVE', 1),
('EMP-1002', 'Sophia Chen', 'sophia.chen@codectechnologies.com', '+1 (555) 345-6789', 'Full Stack Developer', '2023-01-10', 88000.00, 'ACTIVE', 1),
('EMP-1003', 'Marcus Aurelius Vance', 'marcus.vance@codectechnologies.com', '+1 (555) 456-7890', 'HR Talent Specialist', '2021-08-01', 65000.00, 'ACTIVE', 2),
('EMP-1004', 'Isabella Morales', 'isabella.m@codectechnologies.com', '+1 (555) 567-8901', 'Lead Financial Analyst', '2020-11-20', 92000.00, 'ACTIVE', 3),
('EMP-1005', 'Tariq Al-Mansoor', 'tariq.mansoor@codectechnologies.com', '+1 (555) 678-9012', 'Digital Marketing Manager', '2023-06-01', 74000.00, 'ACTIVE', 4),
('EMP-1006', 'Emily Watson', 'emily.watson@codectechnologies.com', '+1 (555) 789-0123', 'Junior Java Developer (Intern)', '2024-02-15', 48000.00, 'PROBATION', 1),
('EMP-1007', 'Nathan Drake', 'nathan.drake@codectechnologies.com', '+1 (555) 890-1234', 'DevOps & Systems Lead', '2021-05-18', 102000.00, 'ACTIVE', 1),
('EMP-1008', 'Grace Hopper Taylor', 'grace.taylor@codectechnologies.com', '+1 (555) 901-2345', 'Operations Coordinator', '2023-09-01', 58000.00, 'ACTIVE', 5)
ON DUPLICATE KEY UPDATE employee_code=employee_code;
