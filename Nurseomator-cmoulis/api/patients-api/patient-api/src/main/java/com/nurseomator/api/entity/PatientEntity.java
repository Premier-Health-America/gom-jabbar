package com.nurseomator.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="PATIENTS")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class PatientEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="PATIENT_NAME", length=50, nullable=false, unique=false)
    private String name;

    @Column(name="PATIENT_FIRSTNAME", length=50, nullable=false, unique=false)
    private String firstName;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="FILE_ID")
    private FileEntity file;
}
