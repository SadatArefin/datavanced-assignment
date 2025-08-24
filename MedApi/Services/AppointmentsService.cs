using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Dto;
using MedApi.Entities;
using MedApi.Interfaces;
using QuestPDF.Fluent;

namespace MedApi.Services;

public class AppointmentsService : IAppointmentsService
{
    private readonly AppDb _db;

    public AppointmentsService(AppDb db)
    {
        _db = db;
    }

    public async Task<PagedResult<AppointmentListDto>> GetListAsync(string? search, int? doctorId, VisitType? visitType, int page, int pageSize)
    {
        var query = _db.Appointments
            .AsNoTracking()
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .Where(a => search == null ||
                        a.Patient.Name.Contains(search) ||
                        a.Doctor.Name.Contains(search));

        if (doctorId is not null)
            query = query.Where(a => a.DoctorId == doctorId);

        if (visitType is not null)
            query = query.Where(a => a.VisitType == visitType);

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(a => a.AppointmentDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new AppointmentListDto(
                a.Id,
                a.Patient.Name,
                a.Doctor.Name,
                a.AppointmentDate,
                a.VisitType,
                a.Diagnosis))
            .ToListAsync();

        return new PagedResult<AppointmentListDto> { Total = total, Items = items };
    }

    public async Task<AppointmentUpsertDto?> GetByIdAsync(int id)
    {
        var appointment = await _db.Appointments
            .Include(x => x.Details)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (appointment == null)
            return null;

        return new AppointmentUpsertDto
        {
            Id = appointment.Id,
            PatientId = appointment.PatientId,
            DoctorId = appointment.DoctorId,
            AppointmentDate = appointment.AppointmentDate,
            VisitType = appointment.VisitType,
            Notes = appointment.Notes,
            Diagnosis = appointment.Diagnosis,
            Details = appointment.Details.Select(d => new PrescriptionDetailDto
            {
                Id = d.Id,
                MedicineId = d.MedicineId,
                Dosage = d.Dosage,
                StartDate = d.StartDate,
                EndDate = d.EndDate,
                Notes = d.Notes
            }).ToList()
        };
    }

    public async Task<int> CreateAsync(AppointmentUpsertDto dto)
    {
        var appointment = new Appointment
        {
            PatientId = dto.PatientId,
            DoctorId = dto.DoctorId,
            AppointmentDate = dto.AppointmentDate,
            VisitType = dto.VisitType,
            Notes = dto.Notes,
            Diagnosis = dto.Diagnosis,
            Details = dto.Details.Select(d => new PrescriptionDetail
            {
                MedicineId = d.MedicineId,
                Dosage = d.Dosage,
                StartDate = d.StartDate,
                EndDate = d.EndDate,
                Notes = d.Notes
            }).ToList()
        };

        _db.Add(appointment);
        await _db.SaveChangesAsync();

        return appointment.Id;
    }

    public async Task<bool> UpdateAsync(int id, AppointmentUpsertDto dto)
    {
        var appointment = await _db.Appointments
            .Include(x => x.Details)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (appointment == null)
            return false;

        appointment.PatientId = dto.PatientId;
        appointment.DoctorId = dto.DoctorId;
        appointment.AppointmentDate = dto.AppointmentDate;
        appointment.VisitType = dto.VisitType;
        appointment.Notes = dto.Notes;
        appointment.Diagnosis = dto.Diagnosis;

        // Sync details (simple replace)
        _db.PrescriptionDetails.RemoveRange(appointment.Details);
        appointment.Details = dto.Details.Select(d => new PrescriptionDetail
        {
            MedicineId = d.MedicineId,
            Dosage = d.Dosage,
            StartDate = d.StartDate,
            EndDate = d.EndDate,
            Notes = d.Notes
        }).ToList();

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var appointment = await _db.Appointments.FindAsync(id);
        if (appointment == null)
            return false;

        _db.Remove(appointment);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<byte[]?> GeneratePdfAsync(int id)
    {
        var appointment = await _db.Appointments
            .Include(x => x.Patient)
            .Include(x => x.Doctor)
            .Include(x => x.Details)
            .ThenInclude(d => d.Medicine)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (appointment == null)
            return null;

        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(40);
                page.Header().Text("Prescription Report").FontSize(20).Bold();
                page.Content().Column(column =>
                {
                    column.Item().Text($"Patient: {appointment.Patient.Name}");
                    column.Item().Text($"Doctor: {appointment.Doctor.Name}");
                    column.Item().Text($"Date: {appointment.AppointmentDate:dd-MMM-yyyy}");
                    column.Item().Text($"Visit Type: {appointment.VisitType}");
                    column.Item().Text(" ");
                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Header(header =>
                        {
                            header.Cell().Text("Medicine").Bold();
                            header.Cell().Text("Dosage").Bold();
                            header.Cell().Text("Start Date").Bold();
                            header.Cell().Text("End Date").Bold();
                        });

                        foreach (var detail in appointment.Details)
                        {
                            table.Cell().Text(detail.Medicine.Name);
                            table.Cell().Text(detail.Dosage);
                            table.Cell().Text(detail.StartDate.ToString("dd-MMM-yyyy"));
                            table.Cell().Text(detail.EndDate.ToString("dd-MMM-yyyy"));
                        }
                    });
                });
            });
        });

        return document.GeneratePdf();
    }
}