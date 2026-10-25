package com.codectechnologies.ems.controller;

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

import java.util.List;

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

        List<Employee> employees = employeeService.searchAndFilter(keyword, departmentId, status);
        model.addAttribute("employees", employees);
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
        model.addAttribute("pageTitle", "Register New Employee");
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
            model.addAttribute("pageTitle", "Register New Employee");
            return "add-employee";
        }

        try {
            employeeService.saveEmployee(employee);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Employee " + employee.getFullName() + " (" + employee.getEmployeeCode() + ") registered successfully!");
            return "redirect:/employees";
        } catch (DuplicateResourceException e) {
            if (e.getMessage().contains("Employee ID")) {
                bindingResult.rejectValue("employeeCode", "duplicate", e.getMessage());
            } else if (e.getMessage().contains("Email address")) {
                bindingResult.rejectValue("email", "duplicate", e.getMessage());
            } else {
                model.addAttribute("errorMessage", e.getMessage());
            }
            model.addAttribute("departments", departmentService.getAllDepartments());
            model.addAttribute("pageTitle", "Register New Employee");
            return "add-employee";
        }
    }

    @GetMapping("/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String showEditForm(@PathVariable("id") Long id, Model model) {
        Employee employee = employeeService.getEmployeeById(id);
        model.addAttribute("employee", employee);
        model.addAttribute("departments", departmentService.getAllDepartments());
        model.addAttribute("pageTitle", "Update Employee Record");
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
            model.addAttribute("pageTitle", "Update Employee Record");
            return "edit-employee";
        }

        try {
            employeeService.saveEmployee(employee);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Employee record for " + employee.getFullName() + " was successfully updated!");
            return "redirect:/employees";
        } catch (DuplicateResourceException e) {
            if (e.getMessage().contains("Employee ID")) {
                bindingResult.rejectValue("employeeCode", "duplicate", e.getMessage());
            } else if (e.getMessage().contains("Email address")) {
                bindingResult.rejectValue("email", "duplicate", e.getMessage());
            } else {
                model.addAttribute("errorMessage", e.getMessage());
            }
            model.addAttribute("departments", departmentService.getAllDepartments());
            model.addAttribute("pageTitle", "Update Employee Record");
            return "edit-employee";
        }
    }

    @GetMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteEmployee(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        try {
            Employee emp = employeeService.getEmployeeById(id);
            employeeService.deleteEmployee(id);
            redirectAttributes.addFlashAttribute("successMessage", 
                    "Employee " + emp.getFullName() + " (" + emp.getEmployeeCode() + ") was removed successfully.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error deleting employee: " + e.getMessage());
        }
        return "redirect:/employees";
    }

    @GetMapping("/view/{id}")
    public String viewEmployeeDetails(@PathVariable("id") Long id, Model model) {
        Employee employee = employeeService.getEmployeeById(id);
        model.addAttribute("employee", employee);
        return "employee-details";
    }
}
