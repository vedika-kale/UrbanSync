
package com.urbansync.controller;

import com.urbansync.entity.Building;
import com.urbansync.entity.Society;
import com.urbansync.service.BuildingService;
import com.urbansync.repository.SocietyRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buildings")
@CrossOrigin(origins = "http://localhost:5173")
public class BuildingController {

    private final BuildingService buildingService;
    private final SocietyRepository societyRepository;

    public BuildingController(BuildingService buildingService,
                              SocietyRepository societyRepository) {
        this.buildingService = buildingService;
        this.societyRepository = societyRepository;
    }

    // Add a new building
    @PostMapping
    public Building addBuilding(@RequestBody Building building) {
        Long societyId = building.getSociety().getId();

        Society society = societyRepository.findById(societyId)
                .orElseThrow(() -> new RuntimeException("Society not found"));

        building.setSociety(society);

        return buildingService.addBuilding(building);
    }

    // Get all buildings
    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    // Get building by ID
    @GetMapping("/{id}")
    public Optional<Building> getBuildingById(@PathVariable Long id) {
        return buildingService.getBuildingById(id);
    }

    // Delete building
    @DeleteMapping("/{id}")
    public String deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuilding(id);
        return "Building deleted successfully!";
    }
}
