# Medical Appointment Management System (MedApp)

A comprehensive Angular application for managing medical appointments, prescriptions, and patient data. This frontend application works with a .NET Core Web API backend to provide a complete medical practice management solution.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0 and uses Angular Material for the UI components.

## Features

### 📅 Appointment Management

- **List View**: Paginated table displaying all appointments with search functionality
- **Create/Edit Forms**: Comprehensive forms for appointment creation and editing
- **Master-Detail Interface**: Appointment details with nested prescription management
- **PDF Generation**: Download prescription PDFs for appointments
- **Visit Types**: Support for First Visit and Follow-up appointments

### 💊 Prescription Management

- **Dynamic Form Arrays**: Add/remove prescription items dynamically
- **Medicine Selection**: Dropdown selection from available medicines
- **Dosage & Duration**: Specify dosage instructions and treatment duration
- **Prescription Notes**: Additional notes for each prescription item

### 🏥 Data Management

- **Patient Lookup**: Select from existing patients
- **Doctor Assignment**: Assign doctors to appointments
- **Medicine Database**: Comprehensive medicine selection
- **Server-side Pagination**: Efficient data loading with pagination
- **Search & Filter**: Real-time search across patient and doctor names

## Technology Stack

- **Framework**: Angular 20 with Standalone Components
- **UI Library**: Angular Material
- **HTTP Client**: Angular HttpClient for API communication
- **Routing**: Angular Router with lazy loading
- **Forms**: Reactive Forms with FormArrays
- **TypeScript**: Strongly typed models and services

## Project Structure

```
src/app/
├── components/
│   ├── appointments-list/          # Appointment listing component
│   │   └── appointments-list.component.ts
│   └── appointment-form/           # Appointment form component
│       └── appointment-form.component.ts
├── models/
│   ├── appointment.models.ts       # TypeScript interfaces and enums
│   └── index.ts                   # Model exports
├── services/
│   └── data.service.ts            # API service for data operations
├── app.routes.ts                  # Application routing configuration
├── app.config.ts                  # Application configuration
└── app.component.*                # Root component
```

## API Integration

The application integrates with a .NET Core Web API backend running on `https://localhost:5001/api`. The API provides endpoints for:

- **Appointments**: CRUD operations and PDF generation
- **Lookups**: Patients, doctors, and medicines data
- **Search & Pagination**: Server-side filtering and pagination

### API Endpoints Used

```
GET    /api/appointments           # List appointments with pagination
GET    /api/appointments/{id}      # Get specific appointment
POST   /api/appointments           # Create new appointment
PUT    /api/appointments/{id}      # Update appointment
DELETE /api/appointments/{id}      # Delete appointment
GET    /api/appointments/{id}/pdf  # Download prescription PDF
GET    /api/lookups/patients       # Get all patients
GET    /api/lookups/doctors        # Get all doctors
GET    /api/lookups/medicines      # Get all medicines
```

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- .NET Core Web API backend running on port 5001

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd med-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Angular Material** (if not already installed)

   ```bash
   ng add @angular/material
   ```

4. **Start the development server**

   ```bash
   ng serve
   ```

5. **Open the application**
   Navigate to `http://localhost:4200/` in your browser

### Backend Setup

Ensure the .NET Core Web API backend is running on `https://localhost:5001`. The frontend expects the following endpoints to be available:

- Appointments CRUD operations
- Patient, Doctor, and Medicine lookup endpoints
- PDF generation functionality

## Development Server

To start a local development server, run:

```bash
ng serve
```

The application will automatically reload whenever you modify any of the source files.

## Key Components

### AppointmentsListComponent

- Displays paginated list of appointments
- Implements search functionality
- Provides action buttons for edit, delete, and PDF download
- Uses Angular Material table with server-side pagination

### AppointmentFormComponent

- Reactive form for creating/editing appointments
- Dynamic FormArray for prescription management
- Material UI components for enhanced user experience
- Form validation and error handling

### DataService

- Centralized service for all API communications
- HTTP client with proper error handling
- Type-safe method signatures using TypeScript interfaces

## Building

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build is optimized for performance and speed.

## Running Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner:

```bash
ng test
```

## Features in Detail

### Appointment Management

- Create new appointments with patient and doctor selection
- Edit existing appointments while preserving prescription data
- Delete appointments with confirmation
- View appointment details in a comprehensive table format

### Prescription Handling

- Add multiple prescription items per appointment
- Select medicines from a dropdown list
- Specify dosage instructions and treatment duration
- Add notes for each prescription item
- Remove prescription items with validation

### User Interface

- Modern Material Design interface
- Responsive layout for various screen sizes
- Intuitive navigation and user experience
- Form validation with user-friendly error messages

### Data Integration

- Real-time data synchronization with backend API
- Efficient pagination for large datasets
- Search functionality with immediate results
- PDF generation and download capabilities

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular Material Documentation](https://material.angular.io/)
- [Angular Reactive Forms Guide](https://angular.dev/guide/forms)
- [Angular Router Documentation](https://angular.dev/guide/routing)
