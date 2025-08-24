import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppointmentListDto, AppointmentUpsertDto, PagedResult } from '../models/appointment.models';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private http = inject(HttpClient);
    private base = 'https://localhost:7203/api';

    listAppointments(q: {
        search?: string;
        doctorId?: number;
        visitType?: number;
        page: number;
        pageSize: number;
    }) {
        let p = new HttpParams()
            .set('page', q.page)
            .set('pageSize', q.pageSize);

        if (q.search) p = p.set('search', q.search);
        if (q.doctorId) p = p.set('doctorId', q.doctorId);
        if (q.visitType) p = p.set('visitType', q.visitType);

        return this.http.get<PagedResult<AppointmentListDto>>(`${this.base}/appointments`, { params: p });
    }

    getAppointment(id: number) {
        return this.http.get<AppointmentUpsertDto>(`${this.base}/appointments/${id}`);
    }

    createAppointment(dto: AppointmentUpsertDto) {
        return this.http.post<number>(`${this.base}/appointments`, dto);
    }

    updateAppointment(id: number, dto: AppointmentUpsertDto) {
        return this.http.put(`${this.base}/appointments/${id}`, dto);
    }

    deleteAppointment(id: number) {
        return this.http.delete(`${this.base}/appointments/${id}`);
    }

    downloadPdf(id: number) {
        return this.http.get(`${this.base}/appointments/${id}/pdf`, { responseType: 'blob' });
    }

    emailPdf(id: number, email: string) {
        return this.http.post(`${this.base}/appointments/${id}/email?to=${encodeURIComponent(email)}`, {});
    }
}
