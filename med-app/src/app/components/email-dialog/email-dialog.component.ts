import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from '../../services/appointment.service';

@Component({
    standalone: true,
    selector: 'app-email-dialog',
    template: `
    <h2 mat-dialog-title>Email Prescription</h2>
    <mat-dialog-content>
      <form [formGroup]="emailForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email Address</mat-label>
          <input matInput type="email" formControlName="email" placeholder="Enter email address" required>
          @if (emailForm.get('email')?.hasError('required')) {
            <mat-error>Email is required</mat-error>
          }
          @if (emailForm.get('email')?.hasError('email')) {
            <mat-error>Please enter a valid email address</mat-error>
          }
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="!emailForm.valid || sending" (click)="onSend()">
        {{ sending ? 'Sending...' : 'Send Email' }}
      </button>
    </mat-dialog-actions>
  `,
    styles: [`
    .full-width {
      width: 100%;
      min-width: 300px;
    }
  `],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ]
})
export class EmailDialogComponent {
    private fb = inject(FormBuilder);
    private appointmentService = inject(AppointmentService);
    private snackBar = inject(MatSnackBar);
    private dialogRef = inject(MatDialogRef<EmailDialogComponent>);

    sending = false;

    emailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

    constructor(@Inject(MAT_DIALOG_DATA) public data: { appointmentId: number }) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSend(): void {
        if (this.emailForm.valid && !this.sending) {
            this.sending = true;
            const email = this.emailForm.value.email!;

            this.appointmentService.emailPdf(this.data.appointmentId, email).subscribe({
                next: () => {
                    this.snackBar.open('Email sent successfully!', 'Close', {
                        duration: 3000,
                        panelClass: ['success-snackbar']
                    });
                    this.dialogRef.close(true);
                },
                error: (error) => {
                    this.sending = false;
                    this.snackBar.open('Failed to send email. Please try again.', 'Close', {
                        duration: 5000,
                        panelClass: ['error-snackbar']
                    });
                    console.error('Error sending email:', error);
                }
            });
        }
    }
}
