# Medical Appointment API

A REST API for managing medical appointments, prescriptions, and patient data.

## Features

- **Patient Management**: CRUD operations for patients
- **Doctor Management**: CRUD operations for doctors
- **Medicine Management**: CRUD operations for medicines
- **Appointment Management**: Complete appointment lifecycle with prescriptions
- **PDF Generation**: Generate prescription PDFs using QuestPDF
- **Pagination & Search**: Server-side pagination and search functionality
- **Date Handling**: Proper DateOnly JSON serialization
- **In-Memory Database**: Option to use in-memory database for testing

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

   The API will start at `https://localhost:7029`

4. **Test the API**:
   - Run the PowerShell test script: `.\test-api.ps1`
   - Use the `MedApi.http` file in VS Code
   - Open browser to `https://localhost:7029/api/patients`

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
