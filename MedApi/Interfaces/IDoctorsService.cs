using MedApi.Entities;

namespace MedApi.Interfaces;

public interface IDoctorsService
{
    Task<List<Doctor>> GetAllAsync();
    Task<Doctor?> GetByIdAsync(int id);
    Task<Doctor> CreateAsync(Doctor doctor);
    Task<bool> UpdateAsync(int id, Doctor doctor);
    Task<bool> DeleteAsync(int id);
}
