using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Services;

public class PatientsService : IPatientsService
{
    private readonly AppDb _db;

    public PatientsService(AppDb db)
    {
        _db = db;
    }

    public async Task<List<Patient>> GetAllAsync()
    {
        return await _db.Patients.OrderBy(p => p.Name).ToListAsync();
    }

    public async Task<Patient?> GetByIdAsync(int id)
    {
        return await _db.Patients.FindAsync(id);
    }

    public async Task<Patient> CreateAsync(Patient patient)
    {
        _db.Patients.Add(patient);
        await _db.SaveChangesAsync();
        return patient;
    }

    public async Task<bool> UpdateAsync(int id, Patient patient)
    {
        var existing = await _db.Patients.FindAsync(id);
        if (existing == null) return false;

        existing.Name = patient.Name;
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var patient = await _db.Patients.FindAsync(id);
        if (patient == null) return false;

        _db.Patients.Remove(patient);
        await _db.SaveChangesAsync();
        return true;
    }
}