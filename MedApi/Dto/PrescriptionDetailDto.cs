namespace MedApi.Dto;

public class PrescriptionDetailDto
{
    public int? Id { get; set; }
    public int MedicineId { get; set; }
    public string Dosage { get; set; } = "";
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Notes { get; set; }
}
