import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { VisitType, AppointmentUpsertDto } from '../../models/appointment.models';

@Component({
    standalone: true,
    selector: 'app-appointment-form',
    template: `
    <div class="form-container">
      <h2>{{isEdit ? 'Edit' : 'Create'}} Appointment</h2>
      
      <form [formGroup]="f" (ngSubmit)="save()">
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Patient</mat-label>
            <mat-select formControlName="patientId" required>
              <mat-option *ngFor="let p of patients" [value]="p.id">{{p.name}}</mat-option>
            </mat-select>
            <mat-error *ngIf="f.get('patientId')?.hasError('required')">Patient is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Doctor</mat-label>
            <mat-select formControlName="doctorId" required>
              <mat-option *ngFor="let d of doctors" [value]="d.id">{{d.name}}</mat-option>
            </mat-select>
            <mat-error *ngIf="f.get('doctorId')?.hasError('required')">Doctor is required</mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Appointment Date</mat-label>
            <input matInput type="date" formControlName="appointmentDate" required>
            <mat-error *ngIf="f.get('appointmentDate')?.hasError('required')">Date is required</mat-error>
          </mat-form-field>

          <div class="visit-type-container">
            <label>Visit Type</label>
            <mat-button-toggle-group formControlName="visitType" name="visitType">
              <mat-button-toggle [value]="VisitType.First">First Visit</mat-button-toggle>
              <mat-button-toggle [value]="VisitType.FollowUp">Follow-up</mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Notes</mat-label>
            <textarea matInput placeholder="Additional notes" formControlName="notes" rows="3"></textarea>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Diagnosis</mat-label>
            <textarea matInput placeholder="Diagnosis details" formControlName="diagnosis" rows="3"></textarea>
          </mat-form-field>
        </div>

        <div class="prescriptions-section">
          <div class="section-header">
            <h3>Prescriptions</h3>
            <button mat-stroked-button type="button" color="primary" (click)="addRow()">
              <mat-icon>add</mat-icon>
              Add Prescription
            </button>
          </div>

          <div class="prescriptions-table" *ngIf="details.length > 0">
            <table mat-table [dataSource]="details.controls" class="prescriptions-table">
              <ng-container matColumnDef="medicine">
                <th mat-header-cell *matHeaderCellDef>Medicine</th>
                <td mat-cell *matCellDef="let control; let i = index">
                  <div [formGroup]="control">
                    <mat-form-field appearance="outline">
                      <mat-select formControlName="medicineId" required>
                        <mat-option *ngFor="let m of medicines" [value]="m.id">{{m.name}}</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="dosage">
                <th mat-header-cell *matHeaderCellDef>Dosage</th>
                <td mat-cell *matCellDef="let control; let i = index">
                  <div [formGroup]="control">
                    <mat-form-field appearance="outline">
                      <input matInput placeholder="e.g., 1 tablet twice daily" formControlName="dosage" required>
                    </mat-form-field>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="startDate">
                <th mat-header-cell *matHeaderCellDef>Start Date</th>
                <td mat-cell *matCellDef="let control; let i = index">
                  <div [formGroup]="control">
                    <mat-form-field appearance="outline">
                      <input matInput type="date" formControlName="startDate" required>
                    </mat-form-field>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="endDate">
                <th mat-header-cell *matHeaderCellDef>End Date</th>
                <td mat-cell *matCellDef="let control; let i = index">
                  <div [formGroup]="control">
                    <mat-form-field appearance="outline">
                      <input matInput type="date" formControlName="endDate" required>
                    </mat-form-field>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="notes">
                <th mat-header-cell *matHeaderCellDef>Notes</th>
                <td mat-cell *matCellDef="let control; let i = index">
                  <div [formGroup]="control">
                    <mat-form-field appearance="outline">
                      <input matInput placeholder="Additional notes" formControlName="notes">
                    </mat-form-field>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let control; let i = index">
                  <button mat-icon-button type="button" color="warn" (click)="removeRow(i)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="prescriptionCols"></tr>
              <tr mat-row *matRowDef="let row; columns: prescriptionCols;"></tr>
            </table>
          </div>
        </div>

        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="!f.valid">
            {{isEdit ? 'Update' : 'Create'}} Appointment
          </button>
          <button mat-button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
    styles: [`
    .form-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-row mat-form-field {
      flex: 1;
    }

    .full-width {
      width: 100%;
    }

    .visit-type-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .visit-type-container label {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .prescriptions-section {
      margin-top: 32px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .prescriptions-table {
      width: 100%;
      margin-bottom: 16px;
    }

    .prescriptions-table mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    h2, h3 {
      color: #333;
      margin-bottom: 16px;
    }
  `],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTableModule,
        MatIconModule
    ]
})
export class AppointmentFormComponent implements OnInit {
    VisitType = VisitType;

    private fb = inject(FormBuilder);
    private api = inject(DataService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

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
        this.api.patients().subscribe(x => this.patients = x);
        this.api.doctors().subscribe(x => this.doctors = x);
        this.api.medicines().subscribe(x => this.medicines = x);

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
        this.api.getAppointment(id).subscribe(appointment => {
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
                appointment.details.forEach(detail => {
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
                ? this.api.updateAppointment(this.appointmentId, dto)
                : this.api.createAppointment(dto);

            saveOperation.subscribe({
                next: () => {
                    this.router.navigate(['/appointments']);
                },
                error: (error) => {
                    console.error('Error saving appointment:', error);
                    // You might want to show a snackbar or other error message here
                }
            });
        }
    }

    cancel() {
        this.router.navigate(['/appointments']);
    }
}
