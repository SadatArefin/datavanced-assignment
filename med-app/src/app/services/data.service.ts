import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    private http = inject(HttpClient);
    private base = 'https://localhost:7203/api';

    // General lookup methods for dropdown lists
    patients() {
        return this.http.get<any[]>(`${this.base}/lookups/patients`);
    }

    doctors() {
        return this.http.get<any[]>(`${this.base}/lookups/doctors`);
    }

    medicines() {
        return this.http.get<any[]>(`${this.base}/lookups/medicines`);
    }
}
