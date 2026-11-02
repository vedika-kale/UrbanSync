
package com.urbansync.service;

import com.urbansync.entity.Flat;
import com.urbansync.repository.FlatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlatService {

    private final FlatRepository flatRepository;

    public FlatService(FlatRepository flatRepository) {
        this.flatRepository = flatRepository;
    }

    // Add a new flat
    public Flat addFlat(Flat flat) {
        return flatRepository.save(flat);
    }

    // Get all flats
    public List<Flat> getAllFlats() {
        return flatRepository.findAll();
    }

    // Get flat by ID
    public Optional<Flat> getFlatById(Long id) {
        return flatRepository.findById(id);
    }

    // Delete flat
    public void deleteFlat(Long id) {
        flatRepository.deleteById(id);
    }
}
