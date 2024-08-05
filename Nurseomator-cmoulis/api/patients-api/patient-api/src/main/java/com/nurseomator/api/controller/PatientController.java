package com.nurseomator.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nurseomator.api.dto.FileDTO;
import com.nurseomator.api.dto.PatientDTO;
import com.nurseomator.api.services.PatientService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("v1")
public class PatientController {

    @Autowired
    private PatientService patientService;

    /**
     * This fetches a patient from its ID.
     * @param patientId ID of patient.
     * @return returns a Patient object or an exception under ResponseEntity format.
     */
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable(required = true) Long patientId) {
        if (patientService.getPatient(patientId).isPresent()) {
            PatientDTO patient = patientService.getPatient(patientId).get();
            return new ResponseEntity<PatientDTO>(patient, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Patient not found");
        }
    }

    /**
     * This gets the file of a specific client, from the client ID.
     * 
     * @param patientId ID of patient.
     * @return returns a File object or an exeption under ResponseEntity format.
     */
    @GetMapping("/patient/{patientId}/file")
    public ResponseEntity<FileDTO> getPatientFile(@PathVariable(required = true) String patientId) {
        // TODO
        return null;
    }

    /**
     * This creates a new patient.
     * @param patientId ID of patient.
     * @return returns http status for creation successful.
     */
    @PostMapping("patient")
    public ResponseEntity<Void> postPatient(@RequestBody(required = true) PatientDTO newPatient) {
        patientService.postPatient(newPatient);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
