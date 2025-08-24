import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/medicine.models';

@Component({
    selector: 'app-medicines-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSnackBarModule
    ],
    templateUrl: './medicines-list.component.html',
    styleUrls: ['./medicines-list.component.css']
})
export class MedicinesListComponent implements OnInit {
    private medicineService = inject(MedicineService);
    private snackBar = inject(MatSnackBar);

    medicines: Medicine[] = [];
    displayedColumns = ['id', 'name', 'actions'];

    ngOnInit() {
        this.loadMedicines();
    }

    loadMedicines() {
        this.medicineService.getAllMedicines().subscribe({
            next: (medicines) => {
                this.medicines = medicines;
            },
            error: (error) => {
                this.snackBar.open('Error loading medicines', 'Close', { duration: 3000 });
                console.error(error);
            }
        });
    }

    deleteMedicine(id: number) {
        if (confirm('Are you sure you want to delete this medicine?')) {
            this.medicineService.deleteMedicine(id).subscribe({
                next: () => {
                    this.snackBar.open('Medicine deleted successfully', 'Close', { duration: 3000 });
                    this.loadMedicines();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting medicine', 'Close', { duration: 3000 });
                    console.error(error);
                }
            });
        }
    }
}
