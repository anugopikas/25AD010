package _AD010.demo.Repository;

import _AD010.demo.Models.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    Visitor findTopByPhoneOrderByIdDesc(String phone);

}