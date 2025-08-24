import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    // Doctor routes
    {
        path: 'doctors',
        loadComponent: () => import('./components/doctors-list/doctors-list.component').then(m => m.DoctorsListComponent)
    },
    {
        path: 'doctors/new',
        loadComponent: () => import('./components/doctor-form/doctor-form.component').then(m => m.DoctorFormComponent)
    },
    {
        path: 'doctors/edit/:id',
        loadComponent: () => import('./components/doctor-form/doctor-form.component').then(m => m.DoctorFormComponent)
    },
    // Patient routes
    {
        path: 'patients',
        loadComponent: () => import('./components/patients-list/patients-list.component').then(m => m.PatientsListComponent)
    },
    {
        path: 'patients/new',
        loadComponent: () => import('./components/patient-form/patient-form.component').then(m => m.PatientFormComponent)
    },
    {
        path: 'patients/edit/:id',
        loadComponent: () => import('./components/patient-form/patient-form.component').then(m => m.PatientFormComponent)
    },
    // Medicine routes
    {
        path: 'medicines',
        loadComponent: () => import('./components/medicines-list/medicines-list.component').then(m => m.MedicinesListComponent)
    },
    {
        path: 'medicines/new',
        loadComponent: () => import('./components/medicine-form/medicine-form.component').then(m => m.MedicineFormComponent)
    },
    {
        path: 'medicines/edit/:id',
        loadComponent: () => import('./components/medicine-form/medicine-form.component').then(m => m.MedicineFormComponent)
    },
    // Appointment routes
    {
        path: 'appointments',
        loadComponent: () => import('./components/appointments-list/appointments-list.component').then(m => m.AppointmentsListComponent)
    },
    {
        path: 'appointments/new',
        loadComponent: () => import('./components/appointment-form/appointment-form.component').then(m => m.AppointmentFormComponent)
    },
    {
        path: 'appointments/edit/:id',
        loadComponent: () => import('./components/appointment-form/appointment-form.component').then(m => m.AppointmentFormComponent)
    },
    { path: '**', redirectTo: '/home' }
];
