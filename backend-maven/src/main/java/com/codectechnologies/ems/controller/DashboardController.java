package com.codectechnologies.ems.controller;

import com.codectechnologies.ems.service.DepartmentService;
import com.codectechnologies.ems.service.EmployeeService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    private final EmployeeService employeeService;
    private final DepartmentService departmentService;

    public DashboardController(EmployeeService employeeService, DepartmentService departmentService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
    }

    @GetMapping({"/", "/dashboard"})
    public String dashboard(Model model, Authentication authentication) {
        model.addAttribute("totalEmployees", employeeService.getTotalEmployeeCount());
        model.addAttribute("totalDepartments", departmentService.getTotalDepartmentCount());
        model.addAttribute("departmentCounts", employeeService.getDepartmentEmployeeCounts());
        model.addAttribute("recentEmployees", employeeService.getRecentEmployees());
        model.addAttribute("currentUsername", authentication != null ? authentication.getName() : "Guest");
        
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        model.addAttribute("isAdmin", isAdmin);

        return "dashboard";
    }
}
