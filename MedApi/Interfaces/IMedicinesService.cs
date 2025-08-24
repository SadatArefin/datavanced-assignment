using MedApi.Entities;

namespace MedApi.Interfaces;

public interface IMedicinesService
{
    Task<List<Medicine>> GetAllAsync();
    Task<Medicine?> GetByIdAsync(int id);
    Task<Medicine> CreateAsync(Medicine medicine);
    Task<bool> UpdateAsync(int id, Medicine medicine);
    Task<bool> DeleteAsync(int id);
}
