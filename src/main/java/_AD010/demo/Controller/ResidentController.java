package _AD010.demo.Controller;

import _AD010.demo.Models.Resident;
import _AD010.demo.Services.ResidentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resident")
public class ResidentController {

    ResidentService residentService;

    public ResidentController(ResidentService residentService) {
        this.residentService = residentService;
    }

    @PostMapping("/create")
    public Resident createResident(@RequestBody Resident resident) {
        return residentService.createResident(resident);
    }

    @GetMapping("/getall")
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    @GetMapping("/getbyid/{id}")
    public Resident getResidentById(@PathVariable Long id) {
        return residentService.getResidentById(id);
    }

    @PutMapping("/update/{id}")
    public Resident updateResident(
            @PathVariable Long id,
            @RequestBody Resident resident) {

        return residentService.updateResident(id, resident);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteResident(@PathVariable Long id) {
        return residentService.deleteResident(id);
    }
}