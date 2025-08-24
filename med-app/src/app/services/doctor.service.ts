import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.models';

@Injectable({ providedIn: 'root' })
export class DoctorService {
    private http = inject(HttpClient);
    private base = 'https://localhost:7203/api';

    // Doctors CRUD
    getAllDoctors() {
        return this.http.get<Doctor[]>(`${this.base}/doctors`);
    }

    getDoctor(id: number) {
        return this.http.get<Doctor>(`${this.base}/doctors/${id}`);
    }

    createDoctor(doctor: Doctor) {
        return this.http.post<Doctor>(`${this.base}/doctors`, doctor);
    }

    updateDoctor(id: number, doctor: Doctor) {
        return this.http.put<Doctor>(`${this.base}/doctors/${id}`, doctor);
    }

    deleteDoctor(id: number) {
        return this.http.delete(`${this.base}/doctors/${id}`);
    }

    // Lookup method for dropdown lists
    getDoctorsLookup() {
        return this.http.get<any[]>(`${this.base}/lookups/doctors`);
    }
}
