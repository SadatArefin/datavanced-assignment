import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.models';

@Component({
    selector: 'app-patient-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule
    ],
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private patientService = inject(PatientService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private snackBar = inject(MatSnackBar);

    patientForm: FormGroup;
    isEdit = false;
    patientId?: number;

    constructor() {
        this.patientForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.patientId = parseInt(id);
            this.loadPatient();
        }
    }

    loadPatient() {
        if (this.patientId) {
            this.patientService.getPatient(this.patientId).subscribe({
                next: (patient) => {
                    this.patientForm.patchValue(patient);
                },
                error: (error) => {
                    this.snackBar.open('Error loading patient', 'Close', { duration: 3000 });
                    console.error(error);
                }
            });
        }
    }

    onSubmit() {
        if (this.patientForm.valid) {
            const patient: Patient = this.patientForm.value;

            if (this.isEdit && this.patientId) {
                this.patientService.updatePatient(this.patientId, patient).subscribe({
                    next: () => {
                        this.snackBar.open('Patient updated successfully', 'Close', { duration: 3000 });
                        this.goBack();
                    },
                    error: (error) => {
                        this.snackBar.open('Error updating patient', 'Close', { duration: 3000 });
                        console.error(error);
                    }
                });
            } else {
                this.patientService.createPatient(patient).subscribe({
                    next: () => {
                        this.snackBar.open('Patient created successfully', 'Close', { duration: 3000 });
                        this.goBack();
                    },
                    error: (error) => {
                        this.snackBar.open('Error creating patient', 'Close', { duration: 3000 });
                        console.error(error);
                    }
                });
            }
        }
    }

    goBack() {
        this.router.navigate(['/patients']);
    }
}
