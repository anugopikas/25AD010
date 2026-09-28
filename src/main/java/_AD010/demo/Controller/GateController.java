package _AD010.demo.Controller;

import _AD010.demo.Services.GateService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gate")
public class GateController {

    GateService gateService;

    public GateController(GateService gateService) {
        this.gateService = gateService;
    }

    @PostMapping("/verify")
    public String verifyVisitor(@RequestParam String phone) {

        return gateService.verifyVisitor(phone);
    }
}