# Medical Appointment API

A comprehensive REST API for managing medical appointments, prescriptions, and patient data. This backend supports the Angular MedApp frontend application with a complete medical practice management solution.

## Features

- **Patient Management**: Complete CRUD operations for patient records
- **Doctor Management**: Full doctor profile and schedule management
- **Medicine Management**: Comprehensive medicine catalog operations
- **Appointment Management**: Complex appointment lifecycle with prescriptions
- **Prescription System**: Multi-item prescription management per appointment
- **PDF Generation**: Generate professional prescription PDFs using QuestPDF
- **Email Integration**: Send prescription PDFs via email
- **Advanced Search**: Server-side search and filtering across entities
- **Pagination**: Efficient pagination for large datasets
- **Date Handling**: Proper DateOnly JSON serialization for appointment dates
- **Data Validation**: Comprehensive model validation and error handling
- **Database Options**: Support for both SQL Server and in-memory databases

## Quick Start

1. **Clone and Navigate**:

   ```bash
   cd MedApi
   ```

2. **Install Dependencies**:

   ```bash
   dotnet restore
   ```

3. **Run the Application**:

   ```bash
   dotnet run
   ```

   The API will start at `https://localhost:7203` (Note: Port updated for frontend compatibility)

4. **Test the API**:
   - Run the PowerShell test script: `.\test-api.ps1`
   - Use the `MedApi.http` file in VS Code with REST Client extension
   - Open browser to `https://localhost:7203/api/patients`
   - Access Swagger UI at `https://localhost:7203/swagger` (if enabled)

## Database Configuration

### Option 1: In-Memory Database (Default for Development)

The application is configured to use an in-memory database by default for easy testing and development. No setup required!

### Option 2: SQL Server

To use SQL Server instead:

1. Set `"UseInMemoryDatabase": false` in `appsettings.Development.json`
2. Update the connection string in `appsettings.Development.json`
3. Run migrations: `dotnet ef database update`

## API Endpoints

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/{id}` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

### Medicines

- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/{id}` - Get medicine by ID
- `POST /api/medicines` - Create new medicine
- `PUT /api/medicines/{id}` - Update medicine
- `DELETE /api/medicines/{id}` - Delete medicine

### Appointments

- `GET /api/appointments` - List appointments with pagination and filtering
  - Query parameters: `search`, `doctorId`, `visitType`, `page`, `pageSize`
- `GET /api/appointments/{id}` - Get appointment details with prescriptions
- `POST /api/appointments` - Create new appointment with prescriptions
- `PUT /api/appointments/{id}` - Update appointment and prescriptions
- `DELETE /api/appointments/{id}` - Delete appointment (cascades to prescriptions)
- `GET /api/appointments/{id}/pdf` - Generate and download prescription PDF
- `POST /api/appointments/{id}/email` - Send prescription PDF via email
  - Query parameter: `to` (email address)

### Lookup Endpoints (for Frontend Dropdowns)

- `GET /api/lookups/patients` - Get simplified patient list for dropdowns
- `GET /api/lookups/doctors` - Get simplified doctor list for dropdowns
- `GET /api/lookups/medicines` - Get simplified medicine list for dropdowns

## Sample API Usage

### Create a Patient

```json
POST /api/patients
{
  "name": "John Doe"
}
```

### Create a Doctor

```json
POST /api/doctors
{
  "name": "Dr. Sarah Wilson"
}
```

### Create a Medicine

```json
POST /api/medicines
{
  "name": "Paracetamol 500mg"
}
```

### Create an Appointment with Prescriptions

```json
POST /api/appointments
{
  "patientId": 1,
  "doctorId": 1,
  "appointmentDate": "2025-08-25",
  "visitType": 1,
  "notes": "Initial consultation for cold symptoms",
  "diagnosis": "Common cold with mild fever",
  "details": [
    {
      "medicineId": 1,
      "dosage": "500mg twice daily",
      "startDate": "2025-08-25",
      "endDate": "2025-08-30",
      "notes": "Take with food to avoid stomach upset"
    },
    {
      "medicineId": 2,
      "dosage": "200mg as needed",
      "startDate": "2025-08-25",
      "endDate": "2025-08-27",
      "notes": "For fever relief, maximum 3 times daily"
    }
  ]
}
```

### Query Appointments with Advanced Filtering

```
GET /api/appointments?search=John&doctorId=1&visitType=0&page=1&pageSize=10
```

### Generate Prescription PDF

```
GET /api/appointments/1/pdf
```

### Email Prescription

```
POST /api/appointments/1/email?to=patient@example.com
```

## Data Models

### Core Entities

#### Patient

```csharp
public class Patient
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

#### Doctor

```csharp
public class Doctor
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

#### Medicine

```csharp
public class Medicine
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

#### Appointment

```csharp
public class Appointment
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public DateOnly AppointmentDate { get; set; }
    public VisitType VisitType { get; set; }
    public string? Notes { get; set; }
    public string? Diagnosis { get; set; }

    // Navigation properties
    public Patient Patient { get; set; }
    public Doctor Doctor { get; set; }
    public List<PrescriptionDetail> Details { get; set; }
}
```

#### PrescriptionDetail

```csharp
public class PrescriptionDetail
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
    public int MedicineId { get; set; }
    public string Dosage { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Notes { get; set; }

    // Navigation properties
    public Appointment Appointment { get; set; }
    public Medicine Medicine { get; set; }
}
```

### Enums

#### VisitType

```csharp
public enum VisitType
{
    First = 0,
    FollowUp = 1
}
```

## Database Schema

### Entity Relationships

- `Appointment` → `Patient` (Many-to-One)
- `Appointment` → `Doctor` (Many-to-One)
- `Appointment` → `PrescriptionDetail` (One-to-Many, Cascade Delete)
- `PrescriptionDetail` → `Medicine` (Many-to-One)

### Key Features

- **Cascade Deletes**: Deleting an appointment automatically removes all associated prescriptions
- **Foreign Key Constraints**: Proper referential integrity
- **DateOnly Support**: Efficient date storage for appointment dates
- **Index Optimization**: Indexed foreign keys for performance

## Technologies Used

- **.NET 9**: Latest .NET framework with performance improvements
- **Entity Framework Core**: Advanced ORM with LINQ support
- **SQL Server / In-Memory Database**: Flexible database backend options
- **AutoMapper**: Efficient object mapping between entities and DTOs
- **QuestPDF**: Professional PDF generation library
- **ASP.NET Core**: High-performance web API framework
- **CORS Support**: Configured for Angular frontend integration

## Sample Data

The application automatically seeds comprehensive sample data in development mode:

### Patients

- John Doe
- Jane Smith
- Bob Johnson

### Doctors

- Dr. Sarah Wilson (General Practice)
- Dr. Michael Brown (Internal Medicine)
- Dr. Emily Davis (Pediatrics)

### Medicines

- Paracetamol 500mg (Pain relief)
- Ibuprofen 200mg (Anti-inflammatory)
- Aspirin 75mg (Blood thinner)
- Amoxicillin 250mg (Antibiotic)

### Sample Appointments

- Includes appointments with multiple prescription items
- Various visit types and date ranges
- Complete with diagnosis and notes

## Testing

### Automated Testing

Run the included PowerShell test script to verify all endpoints:

```powershell
.\test-api.ps1
```

### Manual Testing

Use the `MedApi.http` file in VS Code with the REST Client extension for interactive testing.

### Frontend Integration Testing

The API is configured with CORS to work seamlessly with the Angular frontend running on `http://localhost:4200`.

## Advanced Features

### PDF Generation

- Professional prescription layout using QuestPDF
- Includes appointment details, patient information, and prescription items
- Downloadable as binary PDF response

### Email Integration

- Send prescription PDFs directly via email
- Configurable email settings in appsettings
- Async email processing for better performance

### Pagination & Search

- Server-side pagination for efficient data handling
- Full-text search across patient and doctor names
- Filtering by doctor ID and visit type
- Configurable page sizes

### Error Handling

- Comprehensive exception handling
- Proper HTTP status codes
- Detailed error messages for development
- Sanitized error responses for production

## Optional: Stored Procedures

A stored procedure (`sp_Appointments_List`) is provided in the `StoredProcedures` folder for advanced appointment listing with pagination. You can run this manually in SQL Server and integrate it with EF Core if needed for performance optimization.

## Project Structure

```
MedApi/
├── Controllers/
│   ├── AppointmentsController.cs   # Appointment management endpoints
│   ├── DoctorsController.cs        # Doctor CRUD operations
│   ├── PatientsController.cs       # Patient CRUD operations
│   ├── MedicinesController.cs      # Medicine CRUD operations
│   └── LookupsController.cs        # Dropdown data endpoints
├── Data/
│   └── AppDb.cs                    # DbContext and configuration
├── Dto/
│   ├── AppointmentListDto.cs       # List view DTOs
│   ├── AppointmentUpsertDto.cs     # Create/update DTOs
│   ├── PrescriptionDetailDto.cs    # Prescription DTOs
│   └── PagedResult.cs              # Pagination wrapper
├── Entities/
│   ├── Patient.cs                  # Patient entity
│   ├── Doctor.cs                   # Doctor entity
│   ├── Medicine.cs                 # Medicine entity
│   ├── Appointment.cs              # Appointment entity
│   ├── PrescriptionDetail.cs       # Prescription detail entity
│   └── VisitType.cs               # Visit type enum
├── Extensions/
│   └── DatabaseExtensions.cs      # Database configuration extensions
├── Converters/
│   └── DateOnlyJsonConverter.cs   # JSON date serialization
├── Migrations/                     # EF Core migrations
├── StoredProcedures/              # Optional SQL procedures
├── Services/                       # Business logic services
├── MedApi.http                    # HTTP test requests
├── test-api.ps1                   # PowerShell test script
└── Program.cs                     # Application entry point
```

## Configuration

### Development Settings (`appsettings.Development.json`)

```json
{
	"UseInMemoryDatabase": true,
	"ConnectionStrings": {
		"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MedApiDb;Trusted_Connection=true"
	},
	"Logging": {
		"LogLevel": {
			"Default": "Information",
			"Microsoft.AspNetCore": "Warning"
		}
	}
}
```

### CORS Configuration

Configured to allow requests from the Angular frontend:

- Origin: `http://localhost:4200`
- Methods: GET, POST, PUT, DELETE
- Headers: Content-Type, Authorization

## Production Deployment

For production deployment:

1. **Database Setup**:

   - Set `"UseInMemoryDatabase": false` in production settings
   - Configure proper SQL Server connection string
   - Run database migrations: `dotnet ef database update`

2. **Security Configuration**:

   - Configure proper HTTPS certificates
   - Update CORS settings for production domain
   - Set up proper authentication/authorization if needed

3. **Performance Optimization**:

   - Enable response compression
   - Configure proper logging and monitoring
   - Set up health checks
   - Consider implementing caching strategies

4. **Email Configuration**:
   - Configure SMTP settings for email functionality
   - Set up proper email templates
   - Implement proper error handling for email failures

## API Documentation

When running in development mode, you can access interactive API documentation at:

- Swagger UI: `https://localhost:7203/swagger`
- OpenAPI spec: `https://localhost:7203/swagger/v1/swagger.json`

## Database Configuration

### Option 1: In-Memory Database (Default for Development)

The application is configured to use an in-memory database by default for easy testing. No setup required!

### Option 2: SQL Server

To use SQL Server instead:

1. Set `"UseInMemoryDatabase": false` in `appsettings.Development.json`
2. Update the connection string in `appsettings.Development.json`
3. Run migrations: `dotnet ef database update`

## API Endpoints

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/{id}` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

### Medicines

- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/{id}` - Get medicine by ID
- `POST /api/medicines` - Create new medicine
- `PUT /api/medicines/{id}` - Update medicine
- `DELETE /api/medicines/{id}` - Delete medicine

### Appointments

- `GET /api/appointments` - List appointments with pagination and filtering
  - Query parameters: `search`, `doctorId`, `visitType`, `page`, `pageSize`
- `GET /api/appointments/{id}` - Get appointment details
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment
- `GET /api/appointments/{id}/pdf` - Generate PDF prescription

## Sample API Usage

### Create an Appointment

```json
POST /api/appointments
{
  "patientId": 1,
  "doctorId": 1,
  "appointmentDate": "2025-08-25",
  "visitType": 1,
  "notes": "Initial consultation",
  "diagnosis": "Common cold",
  "details": [
    {
      "medicineId": 1,
      "dosage": "500mg twice daily",
      "startDate": "2025-08-25",
      "endDate": "2025-08-30",
      "notes": "Take with food"
    }
  ]
}
```

### Query Appointments with Pagination

```
GET /api/appointments?search=John&doctorId=1&page=1&pageSize=10
```

## Database Schema

### Tables

- **Patients**: Patient information
- **Doctors**: Doctor information
- **Medicines**: Medicine catalog
- **Appointments**: Appointment details with foreign keys to Patient and Doctor
- **PrescriptionDetails**: Prescription line items linked to appointments and medicines

### Entity Relationships

- `Appointment` → `Patient` (Many-to-One)
- `Appointment` → `Doctor` (Many-to-One)
- `Appointment` → `PrescriptionDetail` (One-to-Many, Cascade Delete)
- `PrescriptionDetail` → `Medicine` (Many-to-One)

## Technologies Used

- **.NET 9**: Latest .NET framework
- **Entity Framework Core**: ORM for database operations
- **SQL Server / In-Memory Database**: Database backends
- **AutoMapper**: Object mapping
- **QuestPDF**: PDF generation
- **ASP.NET Core**: Web API framework

## Sample Data

The application automatically seeds sample data in development mode:

- 3 sample patients (John Doe, Jane Smith, Bob Johnson)
- 3 sample doctors (Dr. Sarah Wilson, Dr. Michael Brown, Dr. Emily Davis)
- 4 sample medicines (Paracetamol, Ibuprofen, Aspirin, Amoxicillin)

## Testing

Run the included PowerShell test script to verify all endpoints:

```powershell
.\test-api.ps1
```

Or use the `MedApi.http` file in VS Code with the REST Client extension.

## Optional: Stored Procedures

A stored procedure (`sp_Appointments_List`) is provided in the `StoredProcedures` folder for advanced appointment listing with pagination. You can run this manually in SQL Server and integrate it with EF Core if needed.

## Project Structure

```
MedApi/
├── Controllers/          # API controllers
├── Data/                # DbContext and database configuration
├── Dto/                 # Data transfer objects
├── Entities/            # Entity models
├── Extensions/          # Extension methods and utilities
├── Converters/          # JSON converters
├── StoredProcedures/    # SQL stored procedures
├── MedApi.http          # HTTP test requests
├── test-api.ps1         # PowerShell test script
└── Program.cs           # Application entry point
```

## Production Deployment

For production deployment:

1. Set `"UseInMemoryDatabase": false` in production settings
2. Configure proper SQL Server connection string
3. Run database migrations
4. Configure proper HTTPS certificates
5. Set up proper logging and monitoring
