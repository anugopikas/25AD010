package _AD010.demo.Controller;

import _AD010.demo.Models.VisitorEntry;
import _AD010.demo.Services.VisitorEntryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entry")
public class VisitorEntryController {

    VisitorEntryService visitorEntryService;

    public VisitorEntryController(VisitorEntryService visitorEntryService) {
        this.visitorEntryService = visitorEntryService;
    }

    @PostMapping("/create")
    public VisitorEntry createEntry(@RequestBody VisitorEntry visitorEntry) {
        return visitorEntryService.createEntry(visitorEntry);
    }

    @GetMapping("/getall")
    public List<VisitorEntry> getAllEntries() {
        return visitorEntryService.getAllEntries();
    }

    @GetMapping("/getbyid/{id}")
    public VisitorEntry getEntryById(@PathVariable Long id) {
        return visitorEntryService.getEntryById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEntry(@PathVariable Long id) {
        return visitorEntryService.deleteEntry(id);
    }

    @PostMapping("/exit")
    public String exitVisitor(@RequestParam String phone) {
        return visitorEntryService.exitVisitor(phone);
    }
}