package _AD010.demo.Controller;

import _AD010.demo.Models.Visitor;
import _AD010.demo.Services.VisitorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitor")
public class VisitorController {

    VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @PostMapping("/create")
    public Visitor createVisitor(@RequestBody Visitor visitor) {
        return visitorService.createVisitor(visitor);
    }

    @GetMapping("/getall")
    public List<Visitor> getAllVisitors() {
        return visitorService.getAllVisitors();
    }

    @GetMapping("/getbyid/{id}")
    public Visitor getVisitorById(@PathVariable Long id) {
        return visitorService.getVisitorById(id);
    }

    @PutMapping("/update/{id}")
    public Visitor updateVisitor(
            @PathVariable Long id,
            @RequestBody Visitor visitor) {

        return visitorService.updateVisitor(id, visitor);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteVisitor(@PathVariable Long id) {
        return visitorService.deleteVisitor(id);
    }
}