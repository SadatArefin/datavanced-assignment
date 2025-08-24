import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.models';

@Component({
    selector: 'app-doctors-list',
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
    templateUrl: './doctors-list.component.html',
    styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
    private doctorService = inject(DoctorService);
    private snackBar = inject(MatSnackBar);

    doctors: Doctor[] = [];
    displayedColumns = ['id', 'name', 'actions'];

    ngOnInit() {
        this.loadDoctors();
    }

    loadDoctors() {
        this.doctorService.getAllDoctors().subscribe({
            next: (doctors) => {
                this.doctors = doctors;
            },
            error: (error) => {
                this.snackBar.open('Error loading doctors', 'Close', { duration: 3000 });
                console.error(error);
            }
        });
    }

    deleteDoctor(id: number) {
        if (confirm('Are you sure you want to delete this doctor?')) {
            this.doctorService.deleteDoctor(id).subscribe({
                next: () => {
                    this.snackBar.open('Doctor deleted successfully', 'Close', { duration: 3000 });
                    this.loadDoctors();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting doctor', 'Close', { duration: 3000 });
                    console.error(error);
                }
            });
        }
    }
}
