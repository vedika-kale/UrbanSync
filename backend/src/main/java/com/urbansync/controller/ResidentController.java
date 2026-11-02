
package com.urbansync.controller;

import com.urbansync.entity.Resident;
import com.urbansync.entity.Flat;
import com.urbansync.service.ResidentService;
import com.urbansync.repository.FlatRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/residents")
@CrossOrigin(origins = "http://localhost:5173")
public class ResidentController {

    private final ResidentService residentService;
    private final FlatRepository flatRepository;

    public ResidentController(ResidentService residentService,
                              FlatRepository flatRepository) {
        this.residentService = residentService;
        this.flatRepository = flatRepository;
    }

    // Add a new resident
    @PostMapping
    public Resident addResident(@RequestBody Resident resident) {

        Long flatId = resident.getFlat().getId();

        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new RuntimeException("Flat not found"));

        resident.setFlat(flat);

        return residentService.addResident(resident);
    }

    // Get all residents
    @GetMapping
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    // Get resident by ID
    @GetMapping("/{id}")
    public Optional<Resident> getResidentById(@PathVariable Long id) {
        return residentService.getResidentById(id);
    }

    // Delete resident
    @DeleteMapping("/{id}")
    public String deleteResident(@PathVariable Long id) {
        residentService.deleteResident(id);
        return "Resident deleted successfully!";
    }
}
