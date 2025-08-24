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
    templateUrl: './appointments-list.component.html',
    styleUrls: ['./appointments-list.component.css'],
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
