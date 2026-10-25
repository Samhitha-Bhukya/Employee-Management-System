package com.codectechnologies.ems;

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
}
