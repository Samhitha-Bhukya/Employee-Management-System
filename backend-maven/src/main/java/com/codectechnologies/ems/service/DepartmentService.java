package com.codectechnologies.ems.service;

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
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
    }

    public Department saveDepartment(Department department) {
        if (department.getId() == null) {
            // New department duplicate check
            if (departmentRepository.existsByNameIgnoreCase(department.getName())) {
                throw new DuplicateResourceException("Department with name '" + department.getName() + "' already exists.");
            }
        } else {
            // Updating department duplicate check
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
    public long getTotalDepartmentCount() {
        return departmentRepository.count();
    }
}
