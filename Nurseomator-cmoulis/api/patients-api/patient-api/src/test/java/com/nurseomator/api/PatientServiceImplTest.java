package com.nurseomator.api;

import static org.mockito.Mockito.when;

import java.io.File;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import com.nurseomator.api.dto.FileDTO;
import com.nurseomator.api.dto.PatientDTO;
import com.nurseomator.api.entity.FileEntity;
import com.nurseomator.api.entity.PatientEntity;
import com.nurseomator.api.repository.PatientRepository;
import com.nurseomator.api.services.impl.PatientServiceImpl;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class PatientServiceImplTest {

    @Spy
    ModelMapper modelMapper = new ModelMapper();

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientServiceImpl employeeServiceImpl;

    @Test
    void getPatientNominalTest() {
        // Given
        FileDTO expectedFile = FileDTO.builder().id(1l).build();
        PatientDTO expectedPatient = PatientDTO.builder().id(0l) //
                .firstName("toto")//
                .name("titi")//
                .file(expectedFile)//
                .build();

        FileEntity fileEntity = FileEntity.builder().id(1l).build();

        PatientEntity patientEntity = PatientEntity.builder().id(0l) //
                .firstName("toto")//
                .name("titi")//
                .file(fileEntity)//
                .build();

        // When
        when(patientRepository.findById(Mockito.eq(0l))).thenReturn(Optional.of(patientEntity));
        Optional<PatientDTO> retrievedPatient = employeeServiceImpl.getPatient(0l);

        // Then
        assertThat(retrievedPatient.get()).isNotNull();
        assertThat(retrievedPatient.get().getName()).matches(expectedPatient.getName());
        assertThat(retrievedPatient.get().getFirstName()).matches(expectedPatient.getFirstName());
    }

    @Test
    void getPatientNoResult() {
        // Given


        // When
        when(patientRepository.findById(Mockito.eq(0l))).thenReturn(Optional.empty());
        Optional<PatientDTO> retrievedPatient = employeeServiceImpl.getPatient(0l);

        // Then
        assertThat(retrievedPatient).isEmpty();
    }

}
