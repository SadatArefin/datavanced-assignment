import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { DataService } from '../../services/data.service';
import { VisitType, AppointmentUpsertDto } from '../../models/appointment.models';

@Component({
    standalone: true,
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.css'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule
    ]
})
export class AppointmentFormComponent implements OnInit {
    VisitType = VisitType;

    private fb = inject(FormBuilder);
    private appointmentService = inject(AppointmentService);
    private dataService = inject(DataService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private snackBar = inject(MatSnackBar);

    patients: any[] = [];
    doctors: any[] = [];
    medicines: any[] = [];

    isEdit = false;
    appointmentId?: number;

    prescriptionCols = ['medicine', 'dosage', 'startDate', 'endDate', 'notes', 'actions'];

    f = this.fb.group({
        id: this.fb.control<number | undefined>(undefined),
        patientId: this.fb.control<number | null>(null, Validators.required),
        doctorId: this.fb.control<number | null>(null, Validators.required),
        appointmentDate: ['', Validators.required],
        visitType: [VisitType.First, Validators.required],
        notes: [''],
        diagnosis: [''],
        details: this.fb.array([])
    });

    get details() {
        return this.f.get('details') as FormArray;
    }

    get detailsControls() {
        return (this.f.get('details') as FormArray).controls as FormGroup[];
    }

    addRow() {
        const prescriptionGroup = this.fb.group({
            id: [undefined],
            medicineId: [null, Validators.required],
            dosage: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            notes: ['']
        });

        this.details.push(prescriptionGroup);
    }

    removeRow(index: number) {
        if (this.details.length > 0) {
            this.details.removeAt(index);
        }
    }

    ngOnInit() {
        // Load lookup data
        this.dataService.patients().subscribe(x => this.patients = x);
        this.dataService.doctors().subscribe(x => this.doctors = x);
        this.dataService.medicines().subscribe(x => this.medicines = x);

        // Check if editing
        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'new') {
            this.isEdit = true;
            this.appointmentId = +id;
            this.loadAppointment(this.appointmentId);
        } else {
            // Start with one prescription row for new appointments
            this.addRow();
        }
    }

    loadAppointment(id: number) {
        this.appointmentService.getAppointment(id).subscribe(appointment => {
            this.f.patchValue({
                id: appointment.id,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                appointmentDate: appointment.appointmentDate,
                visitType: appointment.visitType,
                notes: appointment.notes,
                diagnosis: appointment.diagnosis
            });

            // Clear existing prescription rows
            while (this.details.length) {
                this.details.removeAt(0);
            }

            // Add prescription rows
            if (appointment.details && appointment.details.length > 0) {
                appointment.details.forEach((detail: any) => {
                    const prescriptionGroup = this.fb.group({
                        id: [detail.id],
                        medicineId: [detail.medicineId, Validators.required],
                        dosage: [detail.dosage, Validators.required],
                        startDate: [detail.startDate, Validators.required],
                        endDate: [detail.endDate, Validators.required],
                        notes: [detail.notes || '']
                    });
                    this.details.push(prescriptionGroup);
                });
            } else {
                // Add one empty row if no prescriptions
                this.addRow();
            }
        });
    }

    save() {
        if (this.f.valid) {
            const formValue = this.f.value;
            const dto: AppointmentUpsertDto = {
                id: formValue.id || undefined,
                patientId: formValue.patientId!,
                doctorId: formValue.doctorId!,
                appointmentDate: formValue.appointmentDate!,
                visitType: formValue.visitType!,
                notes: formValue.notes || undefined,
                diagnosis: formValue.diagnosis || undefined,
                details: formValue.details as any[]
            };

            const saveOperation = this.isEdit && this.appointmentId
                ? this.appointmentService.updateAppointment(this.appointmentId, dto)
                : this.appointmentService.createAppointment(dto);

            saveOperation.subscribe({
                next: () => {
                    this.snackBar.open(
                        `Appointment ${this.isEdit ? 'updated' : 'created'} successfully!`,
                        'Close',
                        { duration: 3000 }
                    );
                    this.router.navigate(['/appointments']);
                },
                error: (error) => {
                    console.error('Error saving appointment:', error);
                    this.snackBar.open('Error saving appointment. Please try again.', 'Close', { duration: 3000 });
                }
            });
        } else {
            this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
            this.markFormGroupTouched(this.f);
        }
    }

    private markFormGroupTouched(formGroup: any) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
            if (control instanceof FormArray) {
                control.controls.forEach(nestedControl => {
                    this.markFormGroupTouched(nestedControl);
                });
            }
        });
    }

    cancel() {
        this.router.navigate(['/appointments']);
    }
}
