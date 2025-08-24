# Medical Appointment Management System (MedApp)

A comprehensive Angular application for managing medical appointments, prescriptions, and patient data. This frontend application works with a .NET Core Web API backend to provide a complete medical practice management solution.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0 and uses Angular Material for the UI components with a modern, responsive design.

## Features

### 🏠 Dashboard & Navigation

- **Modern UI**: Beautiful gradient-based design with Material Design components
- **Responsive Layout**: Mobile-first design that works on all devices
- **Intuitive Navigation**: Clean navigation bar with easy access to all modules

### 👥 Patient Management

- **Patient List**: Modern card-based layout with search and filtering
- **Patient Forms**: Comprehensive create/edit forms with validation
- **Blue Theme**: Professional blue gradient design for patient modules
- **Avatar Integration**: Patient avatars and enhanced visual presentation

### 🏥 Doctor Management

- **Doctor List**: Enhanced table view with professional styling
- **Doctor Forms**: Complete CRUD operations with form validation
- **Green Theme**: Medical green gradient design for doctor modules
- **Action Buttons**: Floating action buttons with hover effects

### 💊 Medicine Management

- **Medicine Inventory**: Orange-themed modern interface for medicine catalog
- **Medicine Forms**: Dynamic forms for adding/editing medicines
- **Search & Filter**: Real-time search capabilities
- **Empty States**: Helpful empty state messages with call-to-action buttons

### 📅 Appointment Management

- **Advanced List View**: Purple-themed paginated table with comprehensive filtering
- **Multi-Filter Support**: Filter by doctor, visit type, and search terms
- **Create/Edit Forms**: Sophisticated forms with prescription management
- **Master-Detail Interface**: Appointment details with nested prescription handling
- **PDF Generation**: Download prescription PDFs for appointments
- **Email Integration**: Send prescription PDFs via email
- **Visit Types**: Support for First Visit and Follow-up appointments

### 💊 Prescription Management

- **Dynamic Form Arrays**: Add/remove prescription items dynamically
- **Medicine Selection**: Dropdown selection from available medicines
- **Dosage & Duration**: Specify dosage instructions and treatment duration
- **Prescription Cards**: Modern card-based prescription item display
- **Prescription Notes**: Additional notes for each prescription item
- **Validation**: Comprehensive form validation with user-friendly error messages

### � Modern UI Features

- **Gradient Backgrounds**: Beautiful gradient themes for each module
- **Card Layouts**: Modern card-based interfaces throughout the application
- **Enhanced Tables**: Tables with avatars, badges, and action buttons
- **Hover Effects**: Smooth animations and hover effects
- **Material Icons**: Comprehensive icon usage for better UX
- **Empty States**: Helpful messages when no data is available
- **Loading States**: User feedback during API operations

## Technology Stack

- **Framework**: Angular 20 with Standalone Components
- **UI Library**: Angular Material
- **HTTP Client**: Angular HttpClient for API communication
- **Routing**: Angular Router with lazy loading
- **Forms**: Reactive Forms with FormArrays and advanced validation
- **TypeScript**: Strongly typed models and services
- **Service Architecture**: Separated services for better maintainability
- **CSS**: Modern CSS with gradients, flexbox, and responsive design

## Project Structure

```
src/app/
├── components/
│   ├── home/                       # Dashboard home component
│   ├── appointments-list/          # Appointment listing with filters
│   ├── appointment-form/           # Comprehensive appointment forms
│   ├── doctors-list/               # Doctor management list
│   ├── doctor-form/                # Doctor create/edit forms
│   ├── patients-list/              # Patient management list
│   ├── patient-form/               # Patient create/edit forms
│   ├── medicines-list/             # Medicine inventory list
│   ├── medicine-form/              # Medicine create/edit forms
│   └── email-dialog/               # Email prescription dialog
├── services/
│   ├── appointment.service.ts      # Appointment-specific operations
│   ├── doctor.service.ts           # Doctor CRUD operations
│   ├── patient.service.ts          # Patient CRUD operations
│   ├── medicine.service.ts         # Medicine CRUD operations
│   └── data.service.ts             # General lookup operations
├── models/
│   ├── appointment.models.ts       # Appointment interfaces and enums
│   ├── doctor.models.ts            # Doctor type definitions
│   ├── patient.models.ts           # Patient type definitions
│   ├── medicine.models.ts          # Medicine type definitions
│   └── index.ts                    # Model exports
├── app.routes.ts                   # Application routing configuration
├── app.config.ts                   # Application configuration
└── app.component.*                 # Root component with navigation
```

## Service Architecture

The application follows a clean service architecture with separated concerns:

### 🏥 DoctorService

- Complete CRUD operations for doctors
- Lookup methods for dropdown populations
- Type-safe operations with proper error handling

### 👥 PatientService

- Patient management operations
- Patient lookup functionality
- Integrated with appointment forms

### 💊 MedicineService

- Medicine catalog management
- Medicine selection for prescriptions
- Inventory-style operations

### 📅 AppointmentService

- Complex appointment operations with prescriptions
- PDF generation and email functionality
- Advanced filtering and pagination support

### 🔧 DataService

- General lookup operations
- Shared utility methods
- Cross-service data access

## API Integration

The application integrates with a .NET Core Web API backend running on `https://localhost:7203/api`. The API provides endpoints for:

- **Appointments**: CRUD operations, PDF generation, and email functionality
- **Doctors**: Complete doctor management
- **Patients**: Patient data management
- **Medicines**: Medicine catalog operations
- **Lookups**: Dropdown data for forms
- **Search & Pagination**: Server-side filtering and pagination

### API Endpoints Used

```
# Appointments
GET    /api/appointments              # List with pagination & filtering
GET    /api/appointments/{id}         # Get specific appointment
POST   /api/appointments              # Create new appointment
PUT    /api/appointments/{id}         # Update appointment
DELETE /api/appointments/{id}         # Delete appointment
GET    /api/appointments/{id}/pdf     # Download prescription PDF
POST   /api/appointments/{id}/email   # Send prescription email

# Doctors
GET    /api/doctors                   # Get all doctors
GET    /api/doctors/{id}              # Get specific doctor
POST   /api/doctors                   # Create new doctor
PUT    /api/doctors/{id}              # Update doctor
DELETE /api/doctors/{id}              # Delete doctor

# Patients
GET    /api/patients                  # Get all patients
GET    /api/patients/{id}             # Get specific patient
POST   /api/patients                  # Create new patient
PUT    /api/patients/{id}             # Update patient
DELETE /api/patients/{id}             # Delete patient

# Medicines
GET    /api/medicines                 # Get all medicines
GET    /api/medicines/{id}            # Get specific medicine
POST   /api/medicines                 # Create new medicine
PUT    /api/medicines/{id}            # Update medicine
DELETE /api/medicines/{id}            # Delete medicine

# Lookups
GET    /api/lookups/patients          # Patient dropdown data
GET    /api/lookups/doctors           # Doctor dropdown data
GET    /api/lookups/medicines         # Medicine dropdown data
```

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- .NET Core Web API backend running on port 7203

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

Ensure the .NET Core Web API backend is running on `https://localhost:7203`. Follow the backend README for setup instructions.

## Development Server

To start a local development server, run:

```bash
ng serve
```

The application will automatically reload whenever you modify any of the source files.

## Key Components

### HomeComponent

- Dashboard landing page with navigation cards
- Modern gradient design with call-to-action buttons
- Quick access to all major features

### AppointmentsListComponent

- Advanced filtering by doctor, visit type, and search terms
- Purple gradient theme with modern card layout
- Paginated table with PDF download and email functionality
- Action buttons with tooltips and hover effects

### AppointmentFormComponent

- Comprehensive reactive form with prescription management
- Dynamic FormArray for multiple prescription items
- Material UI components with validation
- Support for both create and edit operations

### Doctor Management Components

- Green-themed professional interface
- Enhanced table with avatars and action buttons
- Complete CRUD operations with form validation

### Patient Management Components

- Blue-themed trustworthy design
- Modern card layouts with patient information
- Responsive table design with empty states

### Medicine Management Components

- Orange-themed energetic pharmacy interface
- Inventory-style medicine catalog
- Search and filter capabilities

## Building

To build the project for production:

```bash
ng build
```

To build with production optimizations:

```bash
ng build --configuration production
```

Build artifacts are stored in the `dist/` directory.

## Running Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner:

```bash
ng test
```

## Features in Detail

### Modern UI Design

- **Gradient Themes**: Each module has its own color-coded gradient theme
- **Material Design**: Consistent Material Design principles throughout
- **Responsive Layout**: Mobile-first approach with breakpoint optimization
- **Card-Based Interface**: Modern card layouts for better content organization
- **Enhanced Tables**: Tables with avatars, badges, and interactive elements

### Advanced Appointment Management

- **Complex Forms**: Multi-section forms with prescription management
- **Real-time Validation**: Immediate feedback on form errors
- **PDF Integration**: Generate and download prescription documents
- **Email Functionality**: Send prescriptions directly via email
- **Visit Type Management**: Support for different appointment types

### Prescription Handling

- **Dynamic Arrays**: Add/remove prescription items on the fly
- **Medicine Integration**: Seamless medicine selection from catalog
- **Dosage Management**: Comprehensive dosage and duration tracking
- **Prescription Cards**: Visual prescription item representation

### Data Management

- **Separated Services**: Clean service architecture for maintainability
- **Type Safety**: Full TypeScript integration with proper typing
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: User feedback during asynchronous operations

### User Experience

- **Intuitive Navigation**: Clear and consistent navigation patterns
- **Empty States**: Helpful messages and actions when no data exists
- **Form Validation**: Real-time validation with user-friendly messages
- **Action Feedback**: Visual feedback for all user actions

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular Material Documentation](https://material.angular.io/)
- [Angular Reactive Forms Guide](https://angular.dev/guide/forms)
- [Angular Router Documentation](https://angular.dev/guide/routing)
- [Angular Standalone Components](https://angular.dev/guide/components/importing)

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- .NET Core Web API backend running on port 7203

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

Ensure the .NET Core Web API backend is running on `https://localhost:7203`. The frontend expects the following endpoints to be available:

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
