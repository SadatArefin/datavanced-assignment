using MedApi.Dto;
using MedApi.Entities;

namespace MedApi.Interfaces;

public interface IAppointmentsService
{
    Task<PagedResult<AppointmentListDto>> GetListAsync(string? search, int? doctorId, VisitType? visitType, int page, int pageSize);
    Task<AppointmentUpsertDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(AppointmentUpsertDto dto);
    Task<bool> UpdateAsync(int id, AppointmentUpsertDto dto);
    Task<bool> DeleteAsync(int id);
    Task<byte[]?> GeneratePdfAsync(int id);
}
