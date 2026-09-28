package _AD010.demo.Services;

import _AD010.demo.Models.VisitorEntry;
import _AD010.demo.Repository.VisitorEntryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorEntryService {

    VisitorEntryRepository visitorEntryRepository;

    public VisitorEntryService(VisitorEntryRepository visitorEntryRepository) {
        this.visitorEntryRepository = visitorEntryRepository;
    }

    public VisitorEntry createEntry(VisitorEntry visitorEntry) {
        return visitorEntryRepository.save(visitorEntry);
    }

    public List<VisitorEntry> getAllEntries() {
        return visitorEntryRepository.findAll();
    }

    public VisitorEntry getEntryById(Long id) {
        return visitorEntryRepository.findById(id).orElse(null);
    }

    public String deleteEntry(Long id) {

        if (visitorEntryRepository.existsById(id)) {
            visitorEntryRepository.deleteById(id);
            return "Entry deleted successfully";
        }

        return "Entry not found";
    }

    public String exitVisitor(String phone) {

        VisitorEntry visitorEntry =
                visitorEntryRepository
                        .findTopByPhoneAndStatusOrderByIdDesc(phone, "IN");

        if (visitorEntry == null) {
            return "Visitor is not currently inside";
        }

        visitorEntry.setExitTime(
                java.time.LocalDate.now() + " " +
                        java.time.LocalTime.now()
        );

        visitorEntry.setStatus("OUT");

        visitorEntryRepository.save(visitorEntry);

        return "Visitor exit recorded successfully";
    }
}