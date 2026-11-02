
package com.urbansync.controller;

import com.urbansync.entity.Flat;
import com.urbansync.entity.Building;
import com.urbansync.service.FlatService;
import com.urbansync.repository.BuildingRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/flats")
@CrossOrigin(origins = "http://localhost:5173")
public class FlatController {

    private final FlatService flatService;
    private final BuildingRepository buildingRepository;

    public FlatController(FlatService flatService,
                          BuildingRepository buildingRepository) {
        this.flatService = flatService;
        this.buildingRepository = buildingRepository;
    }

    // Add a new flat
    @PostMapping
    public Flat addFlat(@RequestBody Flat flat) {

        Long buildingId = flat.getBuilding().getId();

        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found"));

        flat.setBuilding(building);

        return flatService.addFlat(flat);
    }

    // Get all flats
    @GetMapping
    public List<Flat> getAllFlats() {
        return flatService.getAllFlats();
    }

    // Get flat by ID
    @GetMapping("/{id}")
    public Optional<Flat> getFlatById(@PathVariable Long id) {
        return flatService.getFlatById(id);
    }

    // Delete flat
    @DeleteMapping("/{id}")
    public String deleteFlat(@PathVariable Long id) {
        flatService.deleteFlat(id);
        return "Flat deleted successfully!";
    }
}
