package _AD010.demo.Controller;

import _AD010.demo.Models.SecurityGuard;
import _AD010.demo.Services.SecurityGuardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guard")
public class SecurityGuardController {

    SecurityGuardService securityGuardService;

    public SecurityGuardController(SecurityGuardService securityGuardService) {
        this.securityGuardService = securityGuardService;
    }

    @PostMapping("/create")
    public SecurityGuard createGuard(@RequestBody SecurityGuard securityGuard) {
        return securityGuardService.createGuard(securityGuard);
    }

    @GetMapping("/getall")
    public List<SecurityGuard> getAllGuards() {
        return securityGuardService.getAllGuards();
    }

    @GetMapping("/getbyid/{id}")
    public SecurityGuard getGuardById(@PathVariable Long id) {
        return securityGuardService.getGuardById(id);
    }

    @PutMapping("/update/{id}")
    public SecurityGuard updateGuard(
            @PathVariable Long id,
            @RequestBody SecurityGuard securityGuard) {

        return securityGuardService.updateGuard(id, securityGuard);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteGuard(@PathVariable Long id) {
        return securityGuardService.deleteGuard(id);
    }
}