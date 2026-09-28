package _AD010.demo.Repository;

import _AD010.demo.Models.SecurityGuard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecurityGuardRepository
        extends JpaRepository<SecurityGuard, Long> {
}