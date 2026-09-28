package _AD010.demo.Services;

import _AD010.demo.Models.SecurityGuard;
import _AD010.demo.Repository.SecurityGuardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityGuardService {

    SecurityGuardRepository securityGuardRepository;

    public SecurityGuardService(SecurityGuardRepository securityGuardRepository) {
        this.securityGuardRepository = securityGuardRepository;
    }

    public SecurityGuard createGuard(SecurityGuard securityGuard) {
        return securityGuardRepository.save(securityGuard);
    }

    public List<SecurityGuard> getAllGuards() {
        return securityGuardRepository.findAll();
    }

    public SecurityGuard getGuardById(Long id) {
        return securityGuardRepository.findById(id).orElse(null);
    }

    public SecurityGuard updateGuard(Long id, SecurityGuard securityGuard) {

        SecurityGuard existingGuard =
                securityGuardRepository.findById(id).orElse(null);

        if (existingGuard != null) {

            existingGuard.setName(securityGuard.getName());
            existingGuard.setPhone(securityGuard.getPhone());
            existingGuard.setEmail(securityGuard.getEmail());
            existingGuard.setAddress(securityGuard.getAddress());
            existingGuard.setShift(securityGuard.getShift());

            return securityGuardRepository.save(existingGuard);
        }

        return null;
    }

    public String deleteGuard(Long id) {

        if (securityGuardRepository.existsById(id)) {
            securityGuardRepository.deleteById(id);
            return "Security Guard deleted successfully";
        }

        return "Security Guard not found";
    }
}