using MedApi.Entities;

namespace MedApi.Interfaces;

public interface IPatientsService
{
    Task<List<Patient>> GetAllAsync();
    Task<Patient?> GetByIdAsync(int id);
    Task<Patient> CreateAsync(Patient patient);
    Task<bool> UpdateAsync(int id, Patient patient);
    Task<bool> DeleteAsync(int id);
}
