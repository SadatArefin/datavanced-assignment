namespace MedApi.Entities;

public class Appointment
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public DateOnly AppointmentDate { get; set; }
    public VisitType VisitType { get; set; }
    public string? Notes { get; set; }
    public string? Diagnosis { get; set; }
    public Patient Patient { get; set; } = null!;
    public Doctor Doctor { get; set; } = null!;
    public ICollection<PrescriptionDetail> Details { get; set; } = new List<PrescriptionDetail>();
}
