package com.nurseomator.api.services.impl;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nurseomator.api.dto.PatientDTO;
import com.nurseomator.api.entity.PatientEntity;
import com.nurseomator.api.repository.PatientRepository;
import com.nurseomator.api.services.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static final Logger LOGGER = Logger.getLogger(PatientServiceImpl.class.getName());

    /**
     * {@inheritDoc}
     */
    public Optional<PatientDTO> getPatient(Long patientId) {
        LOGGER.log(Level.FINE, "[GetPatient - ID: {0}]", patientId);

        Optional<PatientEntity> patientEntity = patientRepository.findById(patientId);

        if (patientEntity.isPresent()) {
            
            return Optional.of(modelMapper.map(patientEntity.get(), PatientDTO.class));
        }

        return Optional.empty();
    }

    /**
     * {@inheritDoc}
     */
    public PatientDTO postPatient(PatientDTO newPatient) {
        try {
            patientRepository.save(modelMapper.map(newPatient, PatientEntity.class));
        } catch (IllegalArgumentException ex) {
            LOGGER.throwing(PatientServiceImpl.class.getName(), "postPatient", ex);
            throw ex;
        }

        return newPatient;
    }

}
