import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../models/patient.models';

@Injectable({ providedIn: 'root' })
export class PatientService {
    private http = inject(HttpClient);
    private base = 'https://localhost:7203/api';

    // Patients CRUD
    getAllPatients() {
        return this.http.get<Patient[]>(`${this.base}/patients`);
    }

    getPatient(id: number) {
        return this.http.get<Patient>(`${this.base}/patients/${id}`);
    }

    createPatient(patient: Patient) {
        return this.http.post<Patient>(`${this.base}/patients`, patient);
    }

    updatePatient(id: number, patient: Patient) {
        return this.http.put<Patient>(`${this.base}/patients/${id}`, patient);
    }

    deletePatient(id: number) {
        return this.http.delete(`${this.base}/patients/${id}`);
    }

    // Lookup method for dropdown lists
    getPatientsLookup() {
        return this.http.get<any[]>(`${this.base}/lookups/patients`);
    }
}
