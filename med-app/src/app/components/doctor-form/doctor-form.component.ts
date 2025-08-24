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
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.models';

@Component({
    selector: 'app-doctor-form',
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
    templateUrl: './doctor-form.component.html',
    styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private doctorService = inject(DoctorService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private snackBar = inject(MatSnackBar);

    doctorForm: FormGroup;
    isEdit = false;
    doctorId?: number;

    constructor() {
        this.doctorForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.doctorId = parseInt(id);
            this.loadDoctor();
        }
    }

    loadDoctor() {
        if (this.doctorId) {
            this.doctorService.getDoctor(this.doctorId).subscribe({
                next: (doctor) => {
                    this.doctorForm.patchValue(doctor);
                },
                error: (error) => {
                    this.snackBar.open('Error loading doctor', 'Close', { duration: 3000 });
                    console.error(error);
                }
            });
        }
    }

    onSubmit() {
        if (this.doctorForm.valid) {
            const doctor: Doctor = this.doctorForm.value;

            if (this.isEdit && this.doctorId) {
                this.doctorService.updateDoctor(this.doctorId, doctor).subscribe({
                    next: () => {
                        this.snackBar.open('Doctor updated successfully', 'Close', { duration: 3000 });
                        this.goBack();
                    },
                    error: (error) => {
                        this.snackBar.open('Error updating doctor', 'Close', { duration: 3000 });
                        console.error(error);
                    }
                });
            } else {
                this.doctorService.createDoctor(doctor).subscribe({
                    next: () => {
                        this.snackBar.open('Doctor created successfully', 'Close', { duration: 3000 });
                        this.goBack();
                    },
                    error: (error) => {
                        this.snackBar.open('Error creating doctor', 'Close', { duration: 3000 });
                        console.error(error);
                    }
                });
            }
        }
    }

    goBack() {
        this.router.navigate(['/doctors']);
    }
}
