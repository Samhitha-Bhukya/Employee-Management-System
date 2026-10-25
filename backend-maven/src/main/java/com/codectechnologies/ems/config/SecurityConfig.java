package com.codectechnologies.ems.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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

/**
 * Spring Security Configuration enforcing Role-Based Access Control (RBAC).
 * ADMIN: Full CRUD on Employees & Departments.
 * USER: Read-only access (Dashboard, View Employees, Search & Filter).
 */
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
        // Hashed passwords using BCrypt ($2a$10$...)
        // Never stored in plain text
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
                // Static resources & public endpoints
                .requestMatchers("/css/**", "/js/**", "/images/**", "/webjars/**", "/favicon.ico").permitAll()
                .requestMatchers("/login", "/access-denied").permitAll()

                // ADMIN-ONLY Endpoints:
                // Adding, Editing, Deleting Employees
                .requestMatchers("/employees/new", "/employees/save").hasRole("ADMIN")
                .requestMatchers("/employees/edit/**", "/employees/update/**").hasRole("ADMIN")
                .requestMatchers("/employees/delete/**").hasRole("ADMIN")

                // Department Management (Add, Save, Delete)
                .requestMatchers("/departments/new", "/departments/save", "/departments/delete/**").hasRole("ADMIN")
                .requestMatchers("/departments/**").hasAnyRole("ADMIN", "USER")

                // Read endpoints accessible by both ADMIN and USER
                .requestMatchers("/", "/dashboard", "/employees", "/employees/view/**", "/employees/search").hasAnyRole("ADMIN", "USER")

                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
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
            .exceptionHandling(ex -> ex
                .accessDeniedHandler(accessDeniedHandler)
            );

        return http.build();
    }
}
