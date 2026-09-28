package _AD010.demo.Services;

import _AD010.demo.Models.Resident;
import _AD010.demo.Repository.ResidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResidentService {

    ResidentRepository residentRepository;

    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    public Resident createResident(Resident resident) {
        return residentRepository.save(resident);
    }

    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    public Resident getResidentById(Long id) {
        return residentRepository.findById(id).orElse(null);
    }

    public Resident updateResident(Long id, Resident resident) {

        Resident existingResident =
                residentRepository.findById(id).orElse(null);

        if (existingResident != null) {

            existingResident.setName(resident.getName());
            existingResident.setPhone(resident.getPhone());
            existingResident.setEmail(resident.getEmail());
            existingResident.setAddress(resident.getAddress());
            existingResident.setFlatId(resident.getFlatId());

            return residentRepository.save(existingResident);
        }

        return null;
    }

    public String deleteResident(Long id) {

        if (residentRepository.existsById(id)) {
            residentRepository.deleteById(id);
            return "Resident deleted successfully";
        }

        return "Resident not found";
    }
}