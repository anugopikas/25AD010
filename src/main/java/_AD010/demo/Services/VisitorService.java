package _AD010.demo.Services;

import _AD010.demo.Models.Visitor;
import _AD010.demo.Repository.VisitorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorService {

    VisitorRepository visitorRepository;

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    public Visitor createVisitor(Visitor visitor) {
        return visitorRepository.save(visitor);
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    public Visitor getVisitorById(Long id) {
        return visitorRepository.findById(id).orElse(null);
    }

    public Visitor updateVisitor(Long id, Visitor visitor) {

        Visitor existingVisitor =
                visitorRepository.findById(id).orElse(null);

        if (existingVisitor != null) {

            existingVisitor.setName(visitor.getName());
            existingVisitor.setPhone(visitor.getPhone());
            existingVisitor.setVisitDate(visitor.getVisitDate());
            existingVisitor.setFromTime(visitor.getFromTime());
            existingVisitor.setToTime(visitor.getToTime());
            existingVisitor.setFlatId(visitor.getFlatId());

            return visitorRepository.save(existingVisitor);
        }

        return null;
    }

    public String deleteVisitor(Long id) {

        if (visitorRepository.existsById(id)) {
            visitorRepository.deleteById(id);
            return "Visitor deleted successfully";
        }

        return "Visitor not found";
    }
}