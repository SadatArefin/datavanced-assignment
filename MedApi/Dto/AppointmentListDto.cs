using MedApi.Entities;

namespace MedApi.Dto;

public record AppointmentListDto(
    int Id,
    string Patient,
    string Doctor,
    DateOnly Date,
    VisitType VisitType,
    string? Diagnosis
);
