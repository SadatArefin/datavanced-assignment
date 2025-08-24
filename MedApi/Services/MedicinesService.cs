using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Services;

public class MedicinesService : IMedicinesService
{
    private readonly AppDb _db;

    public MedicinesService(AppDb db)
    {
        _db = db;
    }

    public async Task<List<Medicine>> GetAllAsync()
    {
        return await _db.Medicines.OrderBy(m => m.Name).ToListAsync();
    }

    public async Task<Medicine?> GetByIdAsync(int id)
    {
        return await _db.Medicines.FindAsync(id);
    }

    public async Task<Medicine> CreateAsync(Medicine medicine)
    {
        _db.Medicines.Add(medicine);
        await _db.SaveChangesAsync();
        return medicine;
    }

    public async Task<bool> UpdateAsync(int id, Medicine medicine)
    {
        var existing = await _db.Medicines.FindAsync(id);
        if (existing == null) return false;

        existing.Name = medicine.Name;
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var medicine = await _db.Medicines.FindAsync(id);
        if (medicine == null) return false;

        _db.Medicines.Remove(medicine);
        await _db.SaveChangesAsync();
        return true;
    }
}