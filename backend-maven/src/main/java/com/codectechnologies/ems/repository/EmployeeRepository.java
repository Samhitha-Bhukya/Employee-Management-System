package com.codectechnologies.ems.repository;

import com.codectechnologies.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA Repository for Employee entity with advanced search, filtering, and constraint verification.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCodeIgnoreCase(String employeeCode);

    Optional<Employee> findByEmailIgnoreCase(String email);

    boolean existsByEmployeeCodeIgnoreCase(String employeeCode);

    boolean existsByEmployeeCodeIgnoreCaseAndIdNot(String employeeCode, Long id);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    long countByDepartmentId(Long departmentId);

    long countByEmploymentStatus(String employmentStatus);

    /**
     * Search and filter employees across keyword (ID or Name), department ID, and employment status.
     */
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
}
