package com.codectechnologies.ems.config;

import com.codectechnologies.ems.entity.Department;
import com.codectechnologies.ems.entity.Employee;
import com.codectechnologies.ems.repository.DepartmentRepository;
import com.codectechnologies.ems.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

/**
 * Automatically seeds the database with initial departments and employees if empty.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DataInitializer(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) {
        if (departmentRepository.count() == 0) {
            Department eng = new Department("Engineering", "Software Architecture, Full-Stack Development, QA", "Tower 1, Floor 4", "Dr. Sarah Mitchell");
            Department hr = new Department("Human Resources", "Talent Acquisition, Welfare, Culture", "Tower 2, Floor 1", "David Vance");
            Department fin = new Department("Finance & Accounts", "Payroll, Budgeting, Audit, Tax", "Tower 1, Floor 2", "Elena Rostova");
            Department mkt = new Department("Marketing", "Digital Campaigns, Branding, Growth", "Tower 3, Floor 3", "Rajiv Patel");
            Department ops = new Department("Operations & IT", "Infrastructure, IT Support, Logistics", "Tower 2, Floor 2", "Karen Lin");

            List<Department> savedDepts = departmentRepository.saveAll(Arrays.asList(eng, hr, fin, mkt, ops));

            if (employeeRepository.count() == 0) {
                Employee e1 = new Employee("EMP-1001", "Alexander Hayes", "alexander.hayes@codectechnologies.com",
                        "+1 (555) 234-5678", "Senior Java Architect", LocalDate.of(2022, 3, 15),
                        new BigDecimal("115000.00"), "ACTIVE", savedDepts.get(0));

                Employee e2 = new Employee("EMP-1002", "Sophia Chen", "sophia.chen@codectechnologies.com",
                        "+1 (555) 345-6789", "Full Stack Developer", LocalDate.of(2023, 1, 10),
                        new BigDecimal("88000.00"), "ACTIVE", savedDepts.get(0));

                Employee e3 = new Employee("EMP-1003", "Marcus Aurelius Vance", "marcus.vance@codectechnologies.com",
                        "+1 (555) 456-7890", "HR Specialist", LocalDate.of(2021, 8, 1),
                        new BigDecimal("65000.00"), "ACTIVE", savedDepts.get(1));

                Employee e4 = new Employee("EMP-1004", "Isabella Morales", "isabella.m@codectechnologies.com",
                        "+1 (555) 567-8901", "Lead Financial Analyst", LocalDate.of(2020, 11, 20),
                        new BigDecimal("92000.00"), "ACTIVE", savedDepts.get(2));

                Employee e5 = new Employee("EMP-1005", "Tariq Al-Mansoor", "tariq.mansoor@codectechnologies.com",
                        "+1 (555) 678-9012", "Digital Marketing Lead", LocalDate.of(2023, 6, 1),
                        new BigDecimal("74000.00"), "ACTIVE", savedDepts.get(3));

                Employee e6 = new Employee("EMP-1006", "Emily Watson", "emily.watson@codectechnologies.com",
                        "+1 (555) 789-0123", "Junior Java Developer (Intern)", LocalDate.of(2024, 2, 15),
                        new BigDecimal("48000.00"), "PROBATION", savedDepts.get(0));

                employeeRepository.saveAll(Arrays.asList(e1, e2, e3, e4, e5, e6));
            }
        }
    }
}
