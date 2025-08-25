# Medical Appointment Management System

A comprehensive medical practice management solution with a modern web interface and robust API backend. This system provides complete patient, doctor, appointment, and prescription management capabilities for medical practices.

Video Demo: [Datavanced Medical System Demo](https://youtu.be/iizGiqkTegs)
## Features

### 🏠 Dashboard & Navigation

- **Modern UI**: Beautiful gradient-based design with responsive layout
- **Intuitive Navigation**: Clean navigation with easy access to all modules
- **Mobile-First Design**: Works seamlessly across all devices

### 👥 Patient Management

- **Patient Records**: Complete patient profile management
- **Patient List**: Modern interface with search and filtering capabilities
- **CRUD Operations**: Create, read, update, and delete patient records
- **Patient Lookup**: Quick patient selection for appointments

### 🏥 Doctor Management

- **Doctor Profiles**: Comprehensive doctor information management
- **Schedule Management**: Doctor availability and appointment scheduling
- **Professional Interface**: Medical-themed design for doctor modules
- **Doctor Lookup**: Easy doctor selection for appointments

### 💊 Medicine Management

- **Medicine Catalog**: Complete inventory management system
- **Medicine Database**: Comprehensive medicine information storage
- **Search & Filter**: Real-time search capabilities across medicine catalog
- **Medicine Selection**: Integration with prescription management

### 📅 Appointment Management

- **Advanced Scheduling**: Comprehensive appointment booking system
- **Multi-Filter Support**: Filter by doctor, visit type, date, and search terms
- **Appointment Types**: Support for First Visit and Follow-up appointments
- **Master-Detail Interface**: Detailed appointment views with prescription management
- **Advanced Search**: Server-side search and filtering across all entities
- **Pagination**: Efficient handling of large appointment datasets

### 💊 Prescription Management

- **Multi-Item Prescriptions**: Add multiple medicines per appointment
- **Dynamic Prescription Forms**: Add/remove prescription items on the fly
- **Medicine Integration**: Seamless medicine selection from catalog
- **Dosage & Duration**: Comprehensive dosage instructions and treatment duration
- **Prescription Notes**: Additional notes for each prescription item
- **Prescription Validation**: Form validation with user-friendly error messages

### 📄 Document Management

- **PDF Generation**: Generate professional prescription PDFs
- **PDF Download**: Download prescription documents instantly
- **Professional Layout**: Well-formatted prescription documents
- **Document Integration**: Seamless PDF generation from appointment data

### 📧 Communication Features

- **Email Integration**: Send prescription PDFs directly via email
- **Email Notifications**: Automated email functionality for prescriptions
- **Communication Tools**: Built-in email capabilities for patient communication

### 🔍 Search & Filtering

- **Global Search**: Search across patients, doctors, and appointments
- **Advanced Filtering**: Multiple filter criteria for refined results
- **Real-Time Search**: Immediate search results as you type
- **Pagination Support**: Efficient browsing of large datasets

### 📊 Data Management

- **Comprehensive CRUD**: Full create, read, update, delete operations
- **Data Validation**: Robust validation and error handling
- **Database Options**: Support for both SQL Server and in-memory databases
- **Data Integrity**: Proper referential integrity and cascade operations

### 🎨 User Experience

- **Modern Design**: Contemporary interface with gradient themes
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Intuitive Forms**: User-friendly forms with real-time validation
- **Loading States**: Visual feedback during operations
- **Empty States**: Helpful messages when no data is available
- **Action Feedback**: Clear confirmation for all user actions

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- .NET 9 SDK
- SQL Server (optional - can use in-memory database)

### Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd datavanced
   ```

2. **Backend Setup**

   ```bash
   cd MedApi
   dotnet restore
   dotnet run
   ```

   The API will start at `https://localhost:7203`

3. **Frontend Setup** (in a new terminal)

   ```bash
   cd med-app
   npm install
   ng serve
   ```

   The application will start at `http://localhost:4200`

4. **Access the Application**
   - Open your browser to `http://localhost:4200`
   - The application will automatically connect to the API backend

### Quick Testing

**Test the API** (optional):

```bash
cd MedApi
.\test-api.ps1
```

**Build for Production**:

```bash
cd med-app
ng build --configuration production
```

## Database Configuration

### Default Setup (In-Memory Database)

The application uses an in-memory database by default - no additional setup required! Perfect for development and testing.

### SQL Server Setup (Optional)

To use SQL Server:

1. Update `appsettings.Development.json` in the MedApi folder
2. Set `"UseInMemoryDatabase": false`
3. Configure your SQL Server connection string
4. Run: `dotnet ef database update`

## API Endpoints Overview

### Core Operations

- **Patients**: `/api/patients` - Complete patient management
- **Doctors**: `/api/doctors` - Doctor profile management
- **Medicines**: `/api/medicines` - Medicine catalog operations
- **Appointments**: `/api/appointments` - Appointment scheduling and management

### Advanced Features

- **PDF Generation**: `/api/appointments/{id}/pdf` - Generate prescription PDFs
- **Email Integration**: `/api/appointments/{id}/email` - Send prescriptions via email
- **Lookup Services**: `/api/lookups/*` - Dropdown data for forms
- **Search & Filtering**: Query parameters for advanced searching

### Sample API Usage

**Create an Appointment with Prescriptions**:

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
      "notes": "Take with food"
    }
  ]
}
```

**Search Appointments**:

```
GET /api/appointments?search=John&doctorId=1&visitType=0&page=1&pageSize=10
```

## Key Features in Detail

### Appointment Workflow

1. **Create Appointment**: Select patient and doctor, set date and visit type
2. **Add Prescriptions**: Dynamically add multiple medicine prescriptions
3. **Generate Documents**: Create professional PDF prescriptions
4. **Email Communication**: Send prescriptions directly to patients
5. **Follow-up Management**: Track follow-up appointments and treatments

### Prescription System

- **Multi-Medicine Support**: Add multiple medicines per appointment
- **Flexible Dosage**: Custom dosage instructions for each medicine
- **Treatment Duration**: Define start and end dates for treatments
- **Additional Notes**: Add specific instructions for each prescription
- **Professional PDFs**: Generate formatted prescription documents

### Search Capabilities

- **Patient Search**: Find patients by name or details
- **Doctor Filtering**: Filter appointments by specific doctors
- **Visit Type Filtering**: Separate first visits from follow-ups
- **Date Range Filtering**: Search appointments by date ranges
- **Global Search**: Search across multiple entities simultaneously

### Data Management

- **Automatic Seeding**: Sample data provided for immediate testing
- **Data Validation**: Comprehensive validation across all forms
- **Error Handling**: User-friendly error messages and validation
- **Data Integrity**: Proper relationships and cascade operations
- **Backup Options**: Support for both persistent and in-memory storage

## Sample Data

The system comes pre-loaded with sample data for immediate testing:

### Patients

- John Doe, Jane Smith, Bob Johnson

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

- Pre-configured appointments with multiple prescriptions
- Various visit types and treatment scenarios
- Complete with diagnosis and prescription notes

## Testing & Validation

### Automated Testing

- **API Testing**: PowerShell script for endpoint validation
- **Frontend Testing**: Unit tests for components and services
- **Integration Testing**: End-to-end workflow testing

### Manual Testing

- **Interactive API Testing**: Use provided HTTP files for manual API testing
- **UI Testing**: Comprehensive user interface testing
- **Workflow Testing**: Test complete appointment and prescription workflows

## Production Deployment

### Backend Deployment

1. Configure production database settings
2. Set up proper HTTPS certificates
3. Configure email settings for prescription sending
4. Set up monitoring and logging
5. Deploy to production server

### Frontend Deployment

1. Build production version: `ng build --configuration production`
2. Deploy static files to web server
3. Configure production API endpoints
4. Set up proper domain and SSL

### Security Considerations

- Configure proper CORS settings for production
- Set up authentication and authorization as needed
- Secure database connections
- Implement proper error handling for production

## Advanced Features

### PDF Generation

- Professional prescription layout
- Includes appointment details and patient information
- Complete prescription item listings
- Downloadable binary PDF responses

### Email Integration

- Send prescription PDFs directly via email
- Configurable email settings
- Asynchronous email processing
- Error handling for email failures

### Performance Features

- Server-side pagination for large datasets
- Efficient database queries with proper indexing
- Optimized frontend loading with lazy loading
- Response caching for improved performance

## Support & Documentation

### Development Resources

- Comprehensive API documentation available
- Interactive testing tools provided
- Sample data and use cases included
- Development setup guides for both frontend and backend

### Production Support

- Database migration scripts
- Configuration templates
- Deployment guides
- Performance optimization recommendations

## Technology Stack

### Frontend Technologies

- Modern web framework with component-based architecture
- Material Design UI components
- Reactive forms with advanced validation
- Responsive design with mobile support

### Backend Technologies

- Modern .NET framework with high performance
- Entity Framework for database operations
- Professional PDF generation capabilities
- Email integration with SMTP support

### Database Support

- SQL Server for production deployments
- In-memory database for development and testing
- Proper migration and seeding support
- Optimized queries and indexing

This Medical Appointment Management System provides a complete solution for medical practices, combining modern user experience with robust backend capabilities for efficient patient care management.
