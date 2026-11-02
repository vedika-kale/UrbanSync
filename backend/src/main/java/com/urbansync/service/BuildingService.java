
package com.urbansync.service;

import com.urbansync.entity.Building;
import com.urbansync.repository.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    // Add a new building
    public Building addBuilding(Building building) {
        return buildingRepository.save(building);
    }

    // Get all buildings
    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    // Get building by ID
    public Optional<Building> getBuildingById(Long id) {
        return buildingRepository.findById(id);
    }

    // Delete building
    public void deleteBuilding(Long id) {
        buildingRepository.deleteById(id);
    }
}
