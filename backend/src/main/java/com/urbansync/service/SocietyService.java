
package com.urbansync.service;

import com.urbansync.entity.Society;
import com.urbansync.repository.SocietyRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SocietyService {

    private final SocietyRepository societyRepository;

    public SocietyService(SocietyRepository societyRepository) {
        this.societyRepository = societyRepository;
    }

    // Add a new society
    public Society addSociety(Society society) {
        return societyRepository.save(society);
    }

    // Get all societies
    public List<Society> getAllSocieties() {
        return societyRepository.findAll();
    }

    // Get society by ID
    public Optional<Society> getSocietyById(Long id) {
        return societyRepository.findById(id);
    }

    // Delete society by ID
    public void deleteSociety(Long id) {
        societyRepository.deleteById(id);
    }
}
