export enum VisitType {
    First = 1,
    FollowUp = 2
}

export interface PrescriptionDetailDto {
    id?: number;
    medicineId: number;
    dosage: string;
    startDate: string;
    endDate: string;
    notes?: string;
}

export interface AppointmentUpsertDto {
    id?: number;
    patientId: number;
    doctorId: number;
    appointmentDate: string;
    visitType: VisitType;
    notes?: string;
    diagnosis?: string;
    details: PrescriptionDetailDto[];
}

export interface AppointmentListDto {
    id: number;
    patient: string;
    doctor: string;
    date: string;
    visitType: VisitType;
    diagnosis?: string;
}

export interface PagedResult<T> {
    total: number;
    items: T[];
}
