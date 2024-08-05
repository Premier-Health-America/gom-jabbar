package com.nurseomator.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nurseomator.api.entity.PatientEntity;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Long> {

}
