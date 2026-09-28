package _AD010.demo.Services;

import _AD010.demo.Models.Visitor;
import _AD010.demo.Models.VisitorEntry;
import _AD010.demo.Repository.VisitorEntryRepository;
import _AD010.demo.Repository.VisitorRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class GateService {

    VisitorRepository visitorRepository;
    VisitorEntryRepository visitorEntryRepository;

    public GateService(
            VisitorRepository visitorRepository,
            VisitorEntryRepository visitorEntryRepository) {

        this.visitorRepository = visitorRepository;
        this.visitorEntryRepository = visitorEntryRepository;
    }

    public String verifyVisitor(String phone) {

        Visitor visitor = visitorRepository.findByPhone(phone);

        if (visitor == null) {
            return "Visitor not found - Entry Rejected";
        }

        LocalDate today = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        LocalDate visitDate =
                LocalDate.parse(visitor.getVisitDate());

        LocalTime fromTime =
                LocalTime.parse(visitor.getFromTime());

        LocalTime toTime =
                LocalTime.parse(visitor.getToTime());

        if (!today.equals(visitDate)) {
            return "Visit date does not match - Entry Rejected";
        }

        if (currentTime.isBefore(fromTime) ||
                currentTime.isAfter(toTime)) {

            return "Visit time is not allowed - Entry Rejected";
        }

        // Create entry record
        VisitorEntry visitorEntry = new VisitorEntry();

        visitorEntry.setPhone(phone);
        visitorEntry.setEntryTime(
                LocalDate.now() + " " + LocalTime.now()
        );
        visitorEntry.setStatus("IN");

        visitorEntryRepository.save(visitorEntry);

        return "Visitor verified - Entry Allowed";
    }
}