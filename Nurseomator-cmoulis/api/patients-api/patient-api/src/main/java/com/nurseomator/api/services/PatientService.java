package com.nurseomator.api.services;

import java.util.Optional;

import com.nurseomator.api.dto.PatientDTO;

public interface PatientService {

    /**
     * This method will try to retrieve a patient from id passed.
     * 
     * @param patientId id of the patient we need to retrieve
     * @return returns an optional, empty if no patient is found, containing
     *         a full patient if patient is found.
     */
    Optional<PatientDTO> getPatient(Long patientId);

    /**
     * This method posts a new patient.
     * 
     * @param newPatient the patient we need to add to DB.
     * @return true if object was inserted, false otherwise.
     */
    PatientDTO postPatient(PatientDTO newPatient);

}
