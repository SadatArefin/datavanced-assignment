import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Medicine } from '../models/medicine.models';

@Injectable({ providedIn: 'root' })
export class MedicineService {
    private http = inject(HttpClient);
    private base = 'https://localhost:7203/api';

    // Medicines CRUD
    getAllMedicines() {
        return this.http.get<Medicine[]>(`${this.base}/medicines`);
    }

    getMedicine(id: number) {
        return this.http.get<Medicine>(`${this.base}/medicines/${id}`);
    }

    createMedicine(medicine: Medicine) {
        return this.http.post<Medicine>(`${this.base}/medicines`, medicine);
    }

    updateMedicine(id: number, medicine: Medicine) {
        return this.http.put<Medicine>(`${this.base}/medicines/${id}`, medicine);
    }

    deleteMedicine(id: number) {
        return this.http.delete(`${this.base}/medicines/${id}`);
    }

    // Lookup method for dropdown lists
    getMedicinesLookup() {
        return this.http.get<any[]>(`${this.base}/lookups/medicines`);
    }
}
