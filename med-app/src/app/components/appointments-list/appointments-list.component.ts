import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AppointmentListDto, VisitType } from '../../models/appointment.models';

@Component({
    standalone: true,
    selector: 'app-appointments-list',
    template: `
    <div class="toolbar">
      <mat-form-field>
        <mat-label>Search patient/doctor</mat-label>
        <input matInput placeholder="Search patient/doctor" [(ngModel)]="search" (keyup.enter)="load()">
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="add()">Add Appointment</button>
    </div>

    <table mat-table [dataSource]="rows" class="mat-elevation-z8">
      <ng-container matColumnDef="patient">
        <th mat-header-cell *matHeaderCellDef>Patient</th>
        <td mat-cell *matCellDef="let r">{{r.patient}}</td>
      </ng-container>
      
      <ng-container matColumnDef="doctor">
        <th mat-header-cell *matHeaderCellDef>Doctor</th>
        <td mat-cell *matCellDef="let r">{{r.doctor}}</td>
      </ng-container>
      
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let r">{{r.date | date}}</td>
      </ng-container>
      
      <ng-container matColumnDef="visitType">
        <th mat-header-cell *matHeaderCellDef>Visit Type</th>
        <td mat-cell *matCellDef="let r">{{getVisitTypeText(r.visitType)}}</td>
      </ng-container>

      <ng-container matColumnDef="diagnosis">
        <th mat-header-cell *matHeaderCellDef>Diagnosis</th>
        <td mat-cell *matCellDef="let r">{{r.diagnosis || '-'}}</td>
      </ng-container>
      
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let r">
          <button mat-button (click)="edit(r.id)">Edit</button>
          <button mat-button color="warn" (click)="remove(r.id)">Delete</button>
          <button mat-button color="accent" (click)="pdf(r.id)">PDF</button>
        </td>
      </ng-container>
      
      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>

    <mat-paginator 
      [length]="total" 
      [pageSize]="pageSize" 
      [pageSizeOptions]="[5, 10, 25, 100]"
      (page)="onPage($event)"
      showFirstLastButtons>
    </mat-paginator>
  `,
    styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 16px;
    }
    
    table {
      width: 100%;
    }
    
    .mat-mdc-form-field {
      width: 300px;
    }
  `],
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatPaginatorModule
    ]
})
export class AppointmentsListComponent implements OnInit {
    private api = inject(DataService);
    private router = inject(Router);

    rows: AppointmentListDto[] = [];
    total = 0;
    page = 0;
    pageSize = 10;
    search = '';
    cols = ['patient', 'doctor', 'date', 'visitType', 'diagnosis', 'actions'];

    ngOnInit() {
        this.load();
    }

    load() {
        this.api.listAppointments({
            search: this.search,
            page: this.page + 1,
            pageSize: this.pageSize
        }).subscribe(r => {
            this.rows = r.items;
            this.total = r.total;
        });
    }

    onPage(e: PageEvent) {
        this.page = e.pageIndex;
        this.pageSize = e.pageSize;
        this.load();
    }

    add() {
        this.router.navigate(['/appointments/new']);
    }

    edit(id: number) {
        this.router.navigate(['/appointments/edit', id]);
    }

    remove(id: number) {
        if (confirm('Are you sure you want to delete this appointment?')) {
            this.api.deleteAppointment(id).subscribe(() => this.load());
        }
    }

    pdf(id: number) {
        this.api.downloadPdf(id).subscribe(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'prescription.pdf';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    getVisitTypeText(visitType: VisitType): string {
        return visitType === VisitType.First ? 'First Visit' : 'Follow-up';
    }
}
