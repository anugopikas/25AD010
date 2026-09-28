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

    private final VisitorRepository visitorRepository;
    private final VisitorEntryRepository visitorEntryRepository;

    public GateService(
            VisitorRepository visitorRepository,
            VisitorEntryRepository visitorEntryRepository) {

        this.visitorRepository = visitorRepository;
        this.visitorEntryRepository = visitorEntryRepository;
    }

    public String verifyVisitor(String phone) {

        System.out.println(
                "Gate verification phone = " + phone
        );

        Visitor visitor =
                visitorRepository
                        .findTopByPhoneOrderByIdDesc(phone);

        if (visitor == null) {

            System.out.println(
                    "Visitor not found"
            );

            return "Visitor not found - Entry Rejected";
        }


        System.out.println(
                "Visitor found: " + visitor.getName()
        );


        LocalDate today =
                LocalDate.now();

        LocalTime currentTime =
                LocalTime.now();


        LocalDate visitDate =
                LocalDate.parse(
                        visitor.getVisitDate()
                );

        LocalTime fromTime =
                LocalTime.parse(
                        visitor.getFromTime()
                );

        LocalTime toTime =
                LocalTime.parse(
                        visitor.getToTime()
                );


        System.out.println(
                "Today      = " + today
        );

        System.out.println(
                "Visit Date = " + visitDate
        );

        System.out.println(
                "Current    = " + currentTime
        );

        System.out.println(
                "From       = " + fromTime
        );

        System.out.println(
                "To         = " + toTime
        );


        if (!today.equals(visitDate)) {

            return "Visit date does not match - Entry Rejected";
        }


        if (currentTime.isBefore(fromTime)
                || currentTime.isAfter(toTime)) {

            return "Visit time is not allowed - Entry Rejected";
        }


        VisitorEntry visitorEntry =
                new VisitorEntry();

        visitorEntry.setPhone(phone);

        visitorEntry.setEntryTime(
                LocalDate.now()
                        + " "
                        + LocalTime.now()
        );

        visitorEntry.setStatus("IN");


        visitorEntryRepository.save(
                visitorEntry
        );


        return "Visitor verified - Entry Allowed";
    }
}