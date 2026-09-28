package _AD010.demo.Repository;

import _AD010.demo.Models.VisitorEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorEntryRepository extends JpaRepository<VisitorEntry, Long> {

    VisitorEntry findTopByPhoneAndStatusOrderByIdDesc(String phone, String status);

}