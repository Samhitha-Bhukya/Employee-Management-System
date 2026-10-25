# Employee Management System (EMS)
### Java Internship Project &bull; Codec Technologies

An enterprise-grade **Employee Management System** built with **Java 17**, **Spring Boot 3.x**, **Spring Data JPA**, **Hibernate**, **MySQL**, **Spring Security**, and **Thymeleaf**. Engineered for academic evaluation and enterprise personnel administration.

---

## 1. Project Overview & Features

The **Codec Technologies Employee Management System** provides a centralized, secure web application for corporate human resources, organizational departments, and administrative personnel management.

### Key Capabilities
- **Executive Dashboard**: Headcount analytics, department-wise personnel distribution with progress visualization, real-time metrics, and quick action shortcuts.
- **Employee Lifecycle Management**:
  - Register new employees with comprehensive validation (Employee ID pattern, corporate email format, duplicate collision checking, positive salary restrictions, date of joining).
  - Search by employee code, name, or job title.
  - Multi-criteria filter by Department and Employment Status (`ACTIVE`, `PROBATION`, `INACTIVE`, `ON_LEAVE`).
  - Update employee information with strict unique constraint validation.
  - Delete employee records with defensive confirmation dialogs and transaction rollback safety.
  - Individual Employee Dossier profile view.
- **Department Administration**:
  - Register organizational divisions with duplicate name protection.
  - Track assigned staff headcount per department.
  - Referential integrity guard: Prevents deleting departments with active staff assignments.
- **Role-Based Access Control (RBAC)**:
  - Backed by **Spring Security 6** with BCrypt password hashing.
  - **`ROLE_ADMIN`**: Unrestricted CRUD permissions across Employees and Departments.
  - **`ROLE_USER`**: Secure read-only access (dashboard, directory search & filter, profiles). Server-side `@PreAuthorize` protects endpoints against unauthorized tamper.

---

## 2. Technology Stack

| Component | Technology | Version |
|---|---|---|
| **Language** | Java LTS | 17+ |
| **Framework** | Spring Boot | 3.2.4 |
| **Web MVC** | Spring MVC | 6.x |
| **Security** | Spring Security (RBAC + BCrypt) | 6.x |
| **ORM / Data Access** | Spring Data JPA & Hibernate | 6.x |
| **Database** | MySQL Server | 8.0+ |
| **Template Engine** | Thymeleaf + Spring Security Extras | 3.1+ |
| **Validation** | Jakarta Bean Validation (Hibernate Validator) | 3.0+ |
| **Build Tool** | Apache Maven | 3.8+ |
| **UI Design** | HTML5, CSS3 (Enterprise Blue-and-White) | Custom |

---

## 3. Project Directory Structure

```text
employee-management-system/
├── pom.xml                                    # Maven dependencies & build plugins
├── schema.sql                                 # MySQL database creation & seed script
├── README.md                                  # Complete academic & deployment guide
├── .gitignore                                 # Git ignore patterns
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── codectechnologies/
    │   │           └── ems/
    │   │               ├── EmployeeManagementApplication.java  # Main Boot class
    │   │               ├── config/
    │   │               │   ├── SecurityConfig.java            # Spring Security 6 RBAC
    │   │               │   └── DataInitializer.java          # Sample data auto-seed
    │   │               ├── controller/
    │   │               │   ├── AuthController.java            # Login & 403 handling
    │   │               │   ├── DashboardController.java       # Analytics overview
    │   │               │   ├── DepartmentController.java      # Department CRUD
    │   │               │   └── EmployeeController.java        # Employee CRUD & search
    │   │               ├── entity/
    │   │               │   ├── Department.java                # Department JPA Entity
    │   │               │   └── Employee.java                  # Employee JPA Entity
    │   │               ├── exception/
    │   │               │   ├── DuplicateResourceException.java
    │   │               │   ├── ResourceNotFoundException.java
    │   │               │   └── GlobalExceptionHandler.java
    │   │               ├── repository/
    │   │               │   ├── DepartmentRepository.java      # JPA Repository
    │   │               │   └── EmployeeRepository.java        # JPA Repository with JPQL
    │   │               └── service/
    │   │                   ├── DepartmentService.java         # Transactional service
    │   │                   └── EmployeeService.java           # Transactional service
    │   └── resources/
    │       ├── application.properties                 # MySQL connection & JPA config
    │       ├── static/
    │       │   └── css/
    │       │       └── style.css                      # Corporate Blue & White theme
    │       └── templates/
    │           ├── fragments/
    │           │   └── navbar.html                    # Reusable role-aware header
    │           ├── add-employee.html                  # Employee registration form
    │           ├── edit-employee.html                 # Employee update form
    │           ├── dashboard.html                     # Executive KPI dashboard
    │           ├── departments.html                   # Department management
    │           ├── employee-details.html              # Individual staff dossier
    │           ├── employees.html                     # Directory table & search
    │           ├── login.html                         # Security sign-in view
    │           └── error.html                         # 403 / 404 / 500 error display
    └── test/
        └── java/
            └── com/
                └── codectechnologies/
                    └── ems/
                        └── EmployeeManagementApplicationTests.java
```

---

## 4. Prerequisites

1. **Java Development Kit (JDK 17 or higher)**
   - Verify by running: `java -version`
2. **Apache Maven (3.8 or higher)**
   - Verify by running: `mvn -version`
3. **MySQL Community Server 8.0+**
   - MySQL service running on port `3306`.
4. **Visual Studio Code** or IntelliJ IDEA
   - Recommended VS Code Extensions:
     - Extension Pack for Java (Microsoft)
     - Spring Boot Extension Pack (VMware)

---

## 5. MySQL Database Setup

1. Open **MySQL Workbench** or MySQL CLI command line:
   ```bash
   mysql -u root -p
   ```

2. Execute the database initialization script:
   ```sql
   CREATE DATABASE IF NOT EXISTS ems_db;
   USE ems_db;
   ```
   *(Optional: You can also execute all statements in `schema.sql` to preload tables and sample data, or let Hibernate `ddl-auto=update` and `DataInitializer.java` create and populate them automatically).*

3. Review your credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ems_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
   *Update `spring.datasource.password` to match your local MySQL root password.*

---

## 6. How to Run in Visual Studio Code

### Method A: Using VS Code Integrated Terminal (Recommended)
1. Open the project folder in VS Code (`File > Open Folder...`).
2. Open the terminal (`Ctrl + ~` or `` Terminal > New Terminal ``).
3. Clean and build the Maven project:
   ```bash
   mvn clean compile
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
5. You will see:
   ```text
   Codec Technologies EMS running at: http://localhost:8080
   Admin Credentials: admin / admin123 (ROLE_ADMIN)
   User Credentials:  user  / user123  (ROLE_USER)
   ```
6. Open your browser and navigate to: **`http://localhost:8080`**

### Method B: Using VS Code Run / Debug
1. Ensure the **Extension Pack for Java** is installed.
2. Navigate to `src/main/java/com/codectechnologies/ems/EmployeeManagementApplication.java`.
3. Click the **Run** button directly above the `main` method.

---

## 7. Authentication Credentials

The system initializes two secure accounts with BCrypt-hashed passwords:

| Role | Username | Password | Permissions |
|---|---|---|---|
| **Administrator** | `admin` | `admin123` | Full Access: Add, Edit, Delete employees & departments |
| **Standard User** | `user` | `user123` | Read-Only: View dashboard, directory search & filter, view dossiers |

---

## 8. Comprehensive Testing Checklist

- [ ] **Administrator Login**: Navigate to `/login`, enter `admin` / `admin123`. Verify redirection to `/dashboard` with ADMIN badge.
- [ ] **Dashboard KPI Review**: Check that total headcount and department breakdown match database numbers.
- [ ] **Register Employee**: Click "+ Register New Employee" or navigate to `/employees/new`.
  - Try submitting empty fields &rarr; verify Bean Validation error messages appear.
  - Enter negative salary &rarr; verify validation reject.
  - Enter existing ID (e.g., `EMP-1001`) &rarr; verify duplicate ID warning.
  - Enter valid data &rarr; verify successful save, redirect, and green flash banner.
- [ ] **Search & Filter**:
  - In `/employees`, enter a search keyword (e.g. `Alexander` or `EMP-1002`).
  - Filter by Department (e.g. `Engineering`).
  - Search for a non-existent name &rarr; verify friendly "No Employees Found" state.
- [ ] **Update Employee**: Click "✏️ Edit" on any record, change the designation or salary, save &rarr; verify updated data in table.
- [ ] **Delete Employee**: Click "🗑️ Delete" on an employee &rarr; confirm popup &rarr; verify record deletion and success alert.
- [ ] **Role-Based Security Enforcement (USER Role)**:
  - Log out via the top right navigation.
  - Log in with `user` / `user123`.
  - Notice action buttons: "+ New Employee" and "Edit" / "Delete" are hidden.
  - Attempt direct URL manipulation (e.g., visit `http://localhost:8080/employees/new` or `http://localhost:8080/employees/delete/1`) &rarr; verify HTTP 403 Access Denied error page is displayed.
- [ ] **Department Management**:
  - As `admin`, add a new department (e.g., `Artificial Intelligence R&D`).
  - Attempt adding a department with the exact same name &rarr; verify duplicate rejection.
  - Attempt deleting a department that currently has assigned employees &rarr; verify foreign-key protection error message.
- [ ] **Persistence Verification**: Stop the Spring Boot application (`Ctrl + C`), restart it with `mvn spring-boot:run`, refresh the browser &rarr; verify all records remain intact in MySQL.

---

## 9. Capturing Screenshots for Internship Report

For your Codec Technologies submission report, capture the following high-resolution screenshots:
1. `01_login_page.png`: Login screen displaying username, password fields, and corporate logo.
2. `02_dashboard_admin.png`: Executive Dashboard with total employees, department breakdown, and quick action buttons.
3. `03_employee_directory.png`: Responsive table showing employee records with status badges and action links.
4. `04_search_filter_results.png`: Search bar with filtered query results and department dropdown active.
5. `05_add_employee_validation.png`: Registration form showing field validations (invalid email, positive salary, required fields).
6. `06_employee_dossier.png`: Detailed view showing individual employee compensation and assigned department.
7. `07_department_management.png`: Departments table displaying head of department, location, and headcount.
8. `08_user_role_view.png`: Employee directory logged in as regular `user` showing read-only permissions.
9. `09_access_denied_403.png`: Security block when unauthorized user attempts administrative endpoint.
10. `10_mysql_workbench.png`: MySQL Workbench showing tables in `ems_db`.

---

## 10. Publishing Project on GitHub

1. Initialize a Git repository inside the `employee-management-system` folder:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Codec Technologies Employee Management System with Spring Boot 3, MySQL, and RBAC"
   ```

2. Create a new repository on your GitHub account named `codec-employee-management-system`.

3. Push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/codec-employee-management-system.git
   git push -u origin main
   ```

4. Verify your repository is public and includes this `README.md`, `pom.xml`, and clean folder hierarchy.

---

&copy; 2026 Codec Technologies Internship Program. All Rights Reserved.
