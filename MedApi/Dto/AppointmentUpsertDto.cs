using MedApi.Entities;

namespace MedApi.Dto;

public class AppointmentUpsertDto
{
    public int? Id { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public DateOnly AppointmentDate { get; set; }
    public VisitType VisitType { get; set; }
    public string? Notes { get; set; }
    public string? Diagnosis { get; set; }
    public List<PrescriptionDetailDto> Details { get; set; } = new();
}
