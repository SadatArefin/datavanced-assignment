import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { DataService } from '../../services/data.service';
import { AppointmentListDto, VisitType } from '../../models/appointment.models';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';

@Component({
    standalone: true,
    selector: 'app-appointments-list',
    templateUrl: './appointments-list.component.html',
    styleUrls: ['./appointments-list.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule
    ]
})
export class AppointmentsListComponent implements OnInit {
    private appointmentService = inject(AppointmentService);
    private dataService = inject(DataService);
    private router = inject(Router);
    private dialog = inject(MatDialog);

    rows: AppointmentListDto[] = [];
    total = 0;
    page = 0;
    pageSize = 10;
    search = '';
    selectedDoctorId: number | null = null;
    selectedVisitType: VisitType | null = null;
    cols = ['patient', 'doctor', 'date', 'visitType', 'diagnosis', 'actions'];

    // Lookup data for filters
    doctors: any[] = [];
    visitTypes = [
        { value: VisitType.First, label: 'First Visit' },
        { value: VisitType.FollowUp, label: 'Follow-up' }
    ];

    ngOnInit() {
        // Load doctors for filter dropdown
        this.dataService.doctors().subscribe(doctors => {
            this.doctors = doctors;
        });

        this.load();
    }

    load() {
        this.appointmentService.listAppointments({
            search: this.search,
            doctorId: this.selectedDoctorId || undefined,
            visitType: this.selectedVisitType || undefined,
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

    onSearch() {
        this.page = 0; // Reset to first page when searching
        this.load();
    }

    onFilterChange() {
        this.page = 0; // Reset to first page when filtering
        this.load();
    }

    clearFilters() {
        this.search = '';
        this.selectedDoctorId = null;
        this.selectedVisitType = null;
        this.page = 0;
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
            this.appointmentService.deleteAppointment(id).subscribe(() => this.load());
        }
    }

    pdf(id: number) {
        this.appointmentService.downloadPdf(id).subscribe(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'prescription.pdf';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    email(id: number) {
        const dialogRef = this.dialog.open(EmailDialogComponent, {
            width: '400px',
            data: { appointmentId: id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Email was sent successfully
                console.log('Email sent successfully');
            }
        });
    }

    getVisitTypeText(visitType: VisitType): string {
        return visitType === VisitType.First ? 'First Visit' : 'Follow-up';
    }
}
