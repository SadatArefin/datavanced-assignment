import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.models';

@Component({
    selector: 'app-patients-list',
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
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
    private patientService = inject(PatientService);
    private snackBar = inject(MatSnackBar);

    patients: Patient[] = [];
    displayedColumns = ['id', 'name', 'actions'];

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        this.patientService.getAllPatients().subscribe({
            next: (patients) => {
                this.patients = patients;
            },
            error: (error) => {
                this.snackBar.open('Error loading patients', 'Close', { duration: 3000 });
                console.error(error);
            }
        });
    }

    deletePatient(id: number) {
        if (confirm('Are you sure you want to delete this patient?')) {
            this.patientService.deletePatient(id).subscribe({
                next: () => {
                    this.snackBar.open('Patient deleted successfully', 'Close', { duration: 3000 });
                    this.loadPatients();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting patient', 'Close', { duration: 3000 });
                    console.error(error);
                }
            });
        }
    }
}
