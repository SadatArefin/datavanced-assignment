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
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/medicine.models';

@Component({
    selector: 'app-medicine-form',
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
    templateUrl: './medicine-form.component.html',
    styleUrls: ['./medicine-form.component.css']
})
export class MedicineFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private medicineService = inject(MedicineService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private snackBar = inject(MatSnackBar);

    medicineForm: FormGroup;
    isEdit = false;
    medicineId?: number;

    constructor() {
        this.medicineForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.medicineId = parseInt(id);
            this.loadMedicine();
        }
    }

    loadMedicine() {
        if (this.medicineId) {
            this.medicineService.getMedicine(this.medicineId).subscribe({
                next: (medicine) => {
                    this.medicineForm.patchValue(medicine);
                },
                error: (error) => {
                    this.snackBar.open('Error loading medicine', 'Close', { duration: 3000 });
                    console.error(error);
                }
            });
        }
    }

    onSubmit() {
        if (this.medicineForm.valid) {
            const medicine: Medicine = this.medicineForm.value;

            if (this.isEdit && this.medicineId) {
                this.medicineService.updateMedicine(this.medicineId, medicine).subscribe({
                    next: () => {
                        this.snackBar.open('Medicine updated successfully', 'Close', { duration: 3000 });
                        this.goBack();
                    },
                    error: (error) => {
                        this.snackBar.open('Error updating medicine', 'Close', { duration: 3000 });
                        console.error(error);
                    }
                });
            } else {
                this.medicineService.createMedicine(medicine).subscribe({
                    next: () => {
                        this.snackBar.open('Medicine created successfully', 'Close', { duration: 3000 });
                        this.goBack();
                    },
                    error: (error) => {
                        this.snackBar.open('Error creating medicine', 'Close', { duration: 3000 });
                        console.error(error);
                    }
                });
            }
        }
    }

    goBack() {
        this.router.navigate(['/medicines']);
    }
}
