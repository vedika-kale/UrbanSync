
package com.urbansync.service;

import com.urbansync.entity.Resident;
import com.urbansync.repository.ResidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentService {

    private final ResidentRepository residentRepository;

    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    // Add a new resident
    public Resident addResident(Resident resident) {
        return residentRepository.save(resident);
    }

    // Get all residents
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    // Get resident by ID
    public Optional<Resident> getResidentById(Long id) {
        return residentRepository.findById(id);
    }

    // Delete resident
    public void deleteResident(Long id) {
        residentRepository.deleteById(id);
    }
}
