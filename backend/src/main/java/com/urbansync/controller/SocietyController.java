
package com.urbansync.controller;

import com.urbansync.entity.Society;
import com.urbansync.service.SocietyService;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/societies")
@CrossOrigin(origins = "http://localhost:5173")
public class SocietyController {

    private final SocietyService societyService;

    public SocietyController(SocietyService societyService) {
        this.societyService = societyService;
    }

    // Add a new society
    @PostMapping
    public Society addSociety(@RequestBody Society society) {
        return societyService.addSociety(society);
    }

    // Get all societies
    @GetMapping
    public List<Society> getAllSocieties() {
        return societyService.getAllSocieties();
    }

    // Get society by ID
    @GetMapping("/{id}")
    public Optional<Society> getSocietyById(@PathVariable Long id) {
        return societyService.getSocietyById(id);
    }

    // Delete society by ID
    @DeleteMapping("/{id}")
    public String deleteSociety(@PathVariable Long id) {
        societyService.deleteSociety(id);
        return "Society deleted successfully!";
    }
}
