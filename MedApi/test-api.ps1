# Test script for MedApi
# Run this after starting the API with: dotnet run

Write-Host "Testing MedApi endpoints..." -ForegroundColor Green

# Test patients endpoint
Write-Host "`nTesting GET /api/patients:" -ForegroundColor Yellow
try {
    $patients = Invoke-RestMethod -Uri "https://localhost:7029/api/patients" -Method GET -SkipCertificateCheck
    Write-Host "✓ Patients retrieved successfully:" -ForegroundColor Green
    $patients | ConvertTo-Json -Depth 2
} catch {
    Write-Host "✗ Error getting patients: $($_.Exception.Message)" -ForegroundColor Red
}

# Test doctors endpoint  
Write-Host "`nTesting GET /api/doctors:" -ForegroundColor Yellow
try {
    $doctors = Invoke-RestMethod -Uri "https://localhost:7029/api/doctors" -Method GET -SkipCertificateCheck
    Write-Host "✓ Doctors retrieved successfully:" -ForegroundColor Green
    $doctors | ConvertTo-Json -Depth 2
} catch {
    Write-Host "✗ Error getting doctors: $($_.Exception.Message)" -ForegroundColor Red
}

# Test medicines endpoint
Write-Host "`nTesting GET /api/medicines:" -ForegroundColor Yellow
try {
    $medicines = Invoke-RestMethod -Uri "https://localhost:7029/api/medicines" -Method GET -SkipCertificateCheck
    Write-Host "✓ Medicines retrieved successfully:" -ForegroundColor Green
    $medicines | ConvertTo-Json -Depth 2
} catch {
    Write-Host "✗ Error getting medicines: $($_.Exception.Message)" -ForegroundColor Red
}

# Test appointments endpoint
Write-Host "`nTesting GET /api/appointments:" -ForegroundColor Yellow
try {
    $appointments = Invoke-RestMethod -Uri "https://localhost:7029/api/appointments" -Method GET -SkipCertificateCheck
    Write-Host "✓ Appointments retrieved successfully:" -ForegroundColor Green
    $appointments | ConvertTo-Json -Depth 3
} catch {
    Write-Host "✗ Error getting appointments: $($_.Exception.Message)" -ForegroundColor Red
}

# Test creating a new appointment
Write-Host "`nTesting POST /api/appointments:" -ForegroundColor Yellow
try {
    $newAppointment = @{
        patientId = 1
        doctorId = 1
        appointmentDate = "2025-08-25"
        visitType = 1
        notes = "Test appointment from PowerShell"
        diagnosis = "Test diagnosis"
        details = @(
            @{
                medicineId = 1
                dosage = "500mg twice daily"
                startDate = "2025-08-25"
                endDate = "2025-08-30"
                notes = "Take with food"
            }
        )
    }
    
    $result = Invoke-RestMethod -Uri "https://localhost:7029/api/appointments" -Method POST -Body ($newAppointment | ConvertTo-Json -Depth 3) -ContentType "application/json" -SkipCertificateCheck
    Write-Host "✓ Appointment created successfully. ID: $result" -ForegroundColor Green
    
    # Test getting the created appointment
    Write-Host "`nTesting GET /api/appointments/$result:" -ForegroundColor Yellow
    $createdAppointment = Invoke-RestMethod -Uri "https://localhost:7029/api/appointments/$result" -Method GET -SkipCertificateCheck
    Write-Host "✓ Created appointment retrieved successfully:" -ForegroundColor Green
    $createdAppointment | ConvertTo-Json -Depth 3
    
} catch {
    Write-Host "✗ Error creating appointment: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAll tests completed!" -ForegroundColor Green
