package com.codectechnologies.ems.service;

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
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

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
        // Enforce uppercase clean ID
        if (employee.getEmployeeCode() != null) {
            employee.setEmployeeCode(employee.getEmployeeCode().trim().toUpperCase());
        }
        if (employee.getEmail() != null) {
            employee.setEmail(employee.getEmail().trim().toLowerCase());
        }

        // Validate duplicates
        if (employee.getId() == null) {
            // New Employee
            if (employeeRepository.existsByEmployeeCodeIgnoreCase(employee.getEmployeeCode())) {
                throw new DuplicateResourceException("Employee ID '" + employee.getEmployeeCode() + "' is already registered to another staff member.");
            }
            if (employeeRepository.existsByEmailIgnoreCase(employee.getEmail())) {
                throw new DuplicateResourceException("Email address '" + employee.getEmail() + "' is already registered in the system.");
            }
        } else {
            // Existing Employee Update
            if (employeeRepository.existsByEmployeeCodeIgnoreCaseAndIdNot(employee.getEmployeeCode(), employee.getId())) {
                throw new DuplicateResourceException("Employee ID '" + employee.getEmployeeCode() + "' is already registered to another staff member.");
            }
            if (employeeRepository.existsByEmailIgnoreCaseAndIdNot(employee.getEmail(), employee.getId())) {
                throw new DuplicateResourceException("Email address '" + employee.getEmail() + "' is already registered in the system.");
            }
        }

        // Validate department existence
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
    public long getTotalEmployeeCount() {
        return employeeRepository.count();
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getDepartmentEmployeeCounts() {
        List<Department> departments = departmentRepository.findAll();
        Map<String, Long> counts = new HashMap<>();
        for (Department dept : departments) {
            long count = employeeRepository.countByDepartmentId(dept.getId());
            counts.put(dept.getName(), count);
        }
        return counts;
    }

    @Transactional(readOnly = true)
    public List<Employee> getRecentEmployees() {
        return employeeRepository.findTop5ByOrderByIdDesc();
    }
}
