package _AD010.demo.Repository;

import _AD010.demo.Models.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
}