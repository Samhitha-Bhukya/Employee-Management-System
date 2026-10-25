import { ProjectFile } from '../types';

export const MAVEN_PROJECT_FILES: ProjectFile[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    type: 'xml',
    category: 'Configuration',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.4</version>
        <relativePath/>
    </parent>

    <groupId>com.codectechnologies</groupId>
    <artifactId>employee-management-system</artifactId>
    <version>1.0.0</version>
    <name>employee-management-system</name>
    <description>Enterprise Employee Management System for Codec Technologies Java Internship</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starter Web (Spring MVC) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Thymeleaf Template Engine -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <!-- Thymeleaf Spring Security Extras -->
        <dependency>
            <groupId>org.thymeleaf.extras</groupId>
            <artifactId>thymeleaf-extras-springsecurity6</artifactId>
        </dependency>

        <!-- Spring Data JPA & Hibernate -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- Jakarta Bean Validation (Hibernate Validator) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Spring Boot DevTools -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- Spring Security Test -->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/application.properties',
    name: 'application.properties',
    type: 'properties',
    category: 'Configuration',
    content: `# ==============================================================================
# Codec Technologies - Employee Management System Configuration
# ==============================================================================

# Server Configuration
server.port=8080
server.servlet.context-path=/

# Application Name
spring.application.name=employee-management-system

# MySQL Database Configuration
# NOTE: Update with your local MySQL credentials
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA & Hibernate Properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.open-in-view=true

# Thymeleaf Template Configuration
spring.thymeleaf.cache=false
spring.thymeleaf.mode=HTML
spring.thymeleaf.encoding=UTF-8

# Logging
logging.level.org.springframework.security=INFO
logging.level.com.codectechnologies.ems=DEBUG`
  },
  {
    path: 'schema.sql',
    name: 'schema.sql',
    type: 'sql',
    category: 'Database',
    content: `-- ==============================================================================
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/EmployeeManagementApplication.java',
    name: 'EmployeeManagementApplication.java',
    type: 'java',
    category: 'Configuration',
    content: `package com.codectechnologies.ems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Class for Codec Technologies Employee Management System.
 * Developed for Java Internship Academic Submission.
 */
@SpringBootApplication
public class EmployeeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("Codec Technologies EMS running at: http://localhost:8080");
        System.out.println("Admin Credentials: admin / admin123 (ROLE_ADMIN)");
        System.out.println("User Credentials:  user  / user123  (ROLE_USER)");
        System.out.println("==================================================================");
    }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/entity/Department.java',
    name: 'Department.java',
    type: 'java',
    category: 'Entity',
    content: `package com.codectechnologies.ems.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Department name is required")
    @Size(min = 2, max = 100, message = "Department name must be between 2 and 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    @Column(length = 255)
    private String description;

    @Size(max = 100, message = "Location cannot exceed 100 characters")
    @Column(length = 100)
    private String location;

    @Size(max = 100, message = "Head of Department cannot exceed 100 characters")
    @Column(name = "head_of_department", length = 100)
    private String headOfDepartment;

    @OneToMany(mappedBy = "department", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<Employee> employees = new ArrayList<>();

    public Department() {}

    public Department(String name, String description, String location, String headOfDepartment) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.headOfDepartment = headOfDepartment;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name != null ? name.trim() : null; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getHeadOfDepartment() { return headOfDepartment; }
    public void setHeadOfDepartment(String headOfDepartment) { this.headOfDepartment = headOfDepartment; }
    public List<Employee> getEmployees() { return employees; }
    public void setEmployees(List<Employee> employees) { this.employees = employees; }
    public int getEmployeeCount() { return employees != null ? employees.size() : 0; }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/entity/Employee.java',
    name: 'Employee.java',
    type: 'java',
    category: 'Entity',
    content: `package com.codectechnologies.ems.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Employee ID is required (e.g. EMP-1001)")
    @Pattern(regexp = "^[A-Za-z0-9_-]{3,20}$", message = "Employee ID must be 3-20 characters alphanumeric")
    @Column(name = "employee_code", nullable = false, unique = true, length = 20)
    private String employeeCode;

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid corporate email address")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9\\\\s()\\\\-\\\\.]+$", message = "Please enter a valid phone number")
    @Size(min = 7, max = 20, message = "Phone number must be between 7 and 20 characters")
    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @NotBlank(message = "Job title is required")
    @Size(min = 2, max = 100, message = "Job title must be between 2 and 100 characters")
    @Column(name = "job_title", nullable = false, length = 100)
    private String jobTitle;

    @NotNull(message = "Date of joining is required")
    @PastOrPresent(message = "Date of joining cannot be in the future")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_of_joining", nullable = false)
    private LocalDate dateOfJoining;

    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0.01", inclusive = true, message = "Salary must be a positive number greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Salary can have up to 10 integer digits and 2 decimals")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal salary;

    @NotBlank(message = "Employment status is required")
    @Column(name = "employment_status", nullable = false, length = 20)
    private String employmentStatus = "ACTIVE";

    @NotNull(message = "Department selection is mandatory")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    public Employee() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmployeeCode() { return employeeCode; }
    public void setEmployeeCode(String employeeCode) { this.employeeCode = employeeCode != null ? employeeCode.trim().toUpperCase() : null; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName != null ? fullName.trim() : null; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email != null ? email.trim().toLowerCase() : null; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }
    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }
    public String getEmploymentStatus() { return employmentStatus; }
    public void setEmploymentStatus(String employmentStatus) { this.employmentStatus = employmentStatus; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/repository/EmployeeRepository.java',
    name: 'EmployeeRepository.java',
    type: 'java',
    category: 'Repository',
    content: `package com.codectechnologies.ems.repository;

import com.codectechnologies.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCodeIgnoreCase(String employeeCode);
    Optional<Employee> findByEmailIgnoreCase(String email);

    boolean existsByEmployeeCodeIgnoreCase(String employeeCode);
    boolean existsByEmployeeCodeIgnoreCaseAndIdNot(String employeeCode, Long id);

    boolean existsByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    long countByDepartmentId(Long departmentId);

    @Query("SELECT e FROM Employee e WHERE " +
           "(:keyword IS NULL OR :keyword = '' OR " +
           " LOWER(e.employeeCode) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(e.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(e.jobTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:departmentId IS NULL OR e.department.id = :departmentId) AND " +
           "(:status IS NULL OR :status = '' OR e.employmentStatus = :status) " +
           "ORDER BY e.id DESC")
    List<Employee> searchAndFilter(
            @Param("keyword") String keyword,
            @Param("departmentId") Long departmentId,
            @Param("status") String status
    );

    List<Employee> findTop5ByOrderByIdDesc();
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/repository/DepartmentRepository.java',
    name: 'DepartmentRepository.java',
    type: 'java',
    category: 'Repository',
    content: `package com.codectechnologies.ems.repository;

import com.codectechnologies.ems.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/service/EmployeeService.java',
    name: 'EmployeeService.java',
    type: 'java',
    category: 'Service',
    content: `package com.codectechnologies.ems.service;

import com.codectechnologies.ems.entity.Department;
import com.codectechnologies.ems.entity.Employee;
import com.codectechnologies.ems.exception.DuplicateResourceException;
import com.codectechnologies.ems.exception.ResourceNotFoundException;
import com.codectechnologies.ems.repository.DepartmentRepository;
import com.codectechnologies.ems.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() { return employeeRepository.findAll(); }

    @Transactional(readOnly = true)
    public List<Employee> searchAndFilter(String keyword, Long departmentId, String status) {
        return employeeRepository.searchAndFilter(keyword, departmentId, status);
    }

    @Transactional(readOnly = true)
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
    }

    public Employee saveEmployee(Employee employee) {
        if (employee.getEmployeeCode() != null) employee.setEmployeeCode(employee.getEmployeeCode().trim().toUpperCase());
        if (employee.getEmail() != null) employee.setEmail(employee.getEmail().trim().toLowerCase());

        if (employee.getId() == null) {
            if (employeeRepository.existsByEmployeeCodeIgnoreCase(employee.getEmployeeCode())) {
                throw new DuplicateResourceException("Employee ID '" + employee.getEmployeeCode() + "' is already registered.");
            }
            if (employeeRepository.existsByEmailIgnoreCase(employee.getEmail())) {
                throw new DuplicateResourceException("Email address '" + employee.getEmail() + "' is already registered.");
            }
        } else {
            if (employeeRepository.existsByEmployeeCodeIgnoreCaseAndIdNot(employee.getEmployeeCode(), employee.getId())) {
                throw new DuplicateResourceException("Employee ID '" + employee.getEmployeeCode() + "' is already registered.");
            }
            if (employeeRepository.existsByEmailIgnoreCaseAndIdNot(employee.getEmail(), employee.getId())) {
                throw new DuplicateResourceException("Email address '" + employee.getEmail() + "' is already registered.");
            }
        }

        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(employee.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Invalid Department ID: " + employee.getDepartment().getId()));
            employee.setDepartment(dept);
        }

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }

    @Transactional(readOnly = true)
    public long getTotalEmployeeCount() { return employeeRepository.count(); }

    @Transactional(readOnly = true)
    public Map<String, Long> getDepartmentEmployeeCounts() {
        List<Department> departments = departmentRepository.findAll();
        Map<String, Long> counts = new HashMap<>();
        for (Department dept : departments) {
            counts.put(dept.getName(), employeeRepository.countByDepartmentId(dept.getId()));
        }
        return counts;
    }

    @Transactional(readOnly = true)
    public List<Employee> getRecentEmployees() { return employeeRepository.findTop5ByOrderByIdDesc(); }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/service/DepartmentService.java',
    name: 'DepartmentService.java',
    type: 'java',
    category: 'Service',
    content: `package com.codectechnologies.ems.service;

import com.codectechnologies.ems.entity.Department;
import com.codectechnologies.ems.exception.DuplicateResourceException;
import com.codectechnologies.ems.exception.ResourceNotFoundException;
import com.codectechnologies.ems.repository.DepartmentRepository;
import com.codectechnologies.ems.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DepartmentService(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public List<Department> getAllDepartments() { return departmentRepository.findAll(); }

    @Transactional(readOnly = true)
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
    }

    public Department saveDepartment(Department department) {
        if (department.getId() == null) {
            if (departmentRepository.existsByNameIgnoreCase(department.getName())) {
                throw new DuplicateResourceException("Department with name '" + department.getName() + "' already exists.");
            }
        } else {
            if (departmentRepository.existsByNameIgnoreCaseAndIdNot(department.getName(), department.getId())) {
                throw new DuplicateResourceException("Department with name '" + department.getName() + "' already exists.");
            }
        }
        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id);
        long assignedEmployees = employeeRepository.countByDepartmentId(id);
        if (assignedEmployees > 0) {
            throw new IllegalStateException("Cannot delete department '" + department.getName() + 
                    "' because it currently has " + assignedEmployees + " active employee(s) assigned. Reassign them first.");
        }
        departmentRepository.delete(department);
    }

    @Transactional(readOnly = true)
    public long getTotalDepartmentCount() { return departmentRepository.count(); }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/config/SecurityConfig.java',
    name: 'SecurityConfig.java',
    type: 'java',
    category: 'Security & Config',
    content: `package com.codectechnologies.ems.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin123"))
                .roles("ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password(passwordEncoder.encode("user123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AccessDeniedHandlerImpl accessDeniedHandler = new AccessDeniedHandlerImpl();
        accessDeniedHandler.setErrorPage("/access-denied");

        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/css/**", "/js/**", "/images/**", "/favicon.ico").permitAll()
                .requestMatchers("/login", "/access-denied").permitAll()
                .requestMatchers("/employees/new", "/employees/save").hasRole("ADMIN")
                .requestMatchers("/employees/edit/**", "/employees/update/**").hasRole("ADMIN")
                .requestMatchers("/employees/delete/**").hasRole("ADMIN")
                .requestMatchers("/departments/new", "/departments/save", "/departments/delete/**").hasRole("ADMIN")
                .requestMatchers("/departments/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers("/", "/dashboard", "/employees", "/employees/view/**").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            .exceptionHandling(ex -> ex.accessDeniedHandler(accessDeniedHandler));

        return http.build();
    }
}`
  },
  {
    path: 'src/main/java/com/codectechnologies/ems/controller/EmployeeController.java',
    name: 'EmployeeController.java',
    type: 'java',
    category: 'Controller',
    content: `package com.codectechnologies.ems.controller;

import com.codectechnologies.ems.entity.Employee;
import com.codectechnologies.ems.exception.DuplicateResourceException;
import com.codectechnologies.ems.service.DepartmentService;
import com.codectechnologies.ems.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final DepartmentService departmentService;

    public EmployeeController(EmployeeService employeeService, DepartmentService departmentService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
    }

    @GetMapping
    public String listEmployees(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "departmentId", required = false) Long departmentId,
            @RequestParam(value = "status", required = false) String status,
            Model model) {
        model.addAttribute("employees", employeeService.searchAndFilter(keyword, departmentId, status));
        model.addAttribute("departments", departmentService.getAllDepartments());
        model.addAttribute("selectedKeyword", keyword);
        model.addAttribute("selectedDepartmentId", departmentId);
        model.addAttribute("selectedStatus", status);
        return "employees";
    }

    @GetMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public String showAddEmployeeForm(Model model) {
        if (!model.containsAttribute("employee")) {
            model.addAttribute("employee", new Employee());
        }
        model.addAttribute("departments", departmentService.getAllDepartments());
        return "add-employee";
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('ADMIN')")
    public String saveEmployee(
            @Valid @ModelAttribute("employee") Employee employee,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("departments", departmentService.getAllDepartments());
            return "add-employee";
        }

        try {
            employeeService.saveEmployee(employee);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Employee " + employee.getFullName() + " registered successfully!");
            return "redirect:/employees";
        } catch (DuplicateResourceException e) {
            if (e.getMessage().contains("Employee ID")) {
                bindingResult.rejectValue("employeeCode", "duplicate", e.getMessage());
            } else {
                bindingResult.rejectValue("email", "duplicate", e.getMessage());
            }
            model.addAttribute("departments", departmentService.getAllDepartments());
            return "add-employee";
        }
    }

    @GetMapping("/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String showEditForm(@PathVariable("id") Long id, Model model) {
        model.addAttribute("employee", employeeService.getEmployeeById(id));
        model.addAttribute("departments", departmentService.getAllDepartments());
        return "edit-employee";
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateEmployee(
            @PathVariable("id") Long id,
            @Valid @ModelAttribute("employee") Employee employee,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {

        employee.setId(id);
        if (bindingResult.hasErrors()) {
            model.addAttribute("departments", departmentService.getAllDepartments());
            return "edit-employee";
        }

        try {
            employeeService.saveEmployee(employee);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Employee record updated successfully!");
            return "redirect:/employees";
        } catch (DuplicateResourceException e) {
            if (e.getMessage().contains("Employee ID")) {
                bindingResult.rejectValue("employeeCode", "duplicate", e.getMessage());
            } else {
                bindingResult.rejectValue("email", "duplicate", e.getMessage());
            }
            model.addAttribute("departments", departmentService.getAllDepartments());
            return "edit-employee";
        }
    }

    @GetMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteEmployee(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            employeeService.deleteEmployee(id);
            redirectAttributes.addFlashAttribute("successMessage", "Employee record deleted successfully.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        }
        return "redirect:/employees";
    }

    @GetMapping("/view/{id}")
    public String viewEmployeeDetails(@PathVariable("id") Long id, Model model) {
        model.addAttribute("employee", employeeService.getEmployeeById(id));
        return "employee-details";
    }
}`
  },
  {
    path: 'src/main/resources/templates/dashboard.html',
    name: 'dashboard.html',
    type: 'html',
    category: 'Thymeleaf Templates',
    content: `<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Codec Technologies EMS</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body>
    <div th:replace="~{fragments/navbar :: navbar}"></div>
    <main class="main-container">
        <!-- KPI Overview Cards & Headcount by Department -->
    </main>
</body>
</html>`
  },
  {
    path: 'README.md',
    name: 'README.md',
    type: 'md',
    category: 'Documentation',
    content: `# Codec Technologies - Employee Management System
Enterprise Spring Boot 3 + MySQL + Thymeleaf + Spring Security application developed for academic evaluation.`
  }
];
