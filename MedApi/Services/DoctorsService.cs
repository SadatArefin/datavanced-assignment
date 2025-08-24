using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Services;

public class DoctorsService : IDoctorsService
{
    private readonly AppDb _db;

    public DoctorsService(AppDb db)
    {
        _db = db;
    }

    public async Task<List<Doctor>> GetAllAsync()
    {
        return await _db.Doctors.OrderBy(d => d.Name).ToListAsync();
    }

    public async Task<Doctor?> GetByIdAsync(int id)
    {
        return await _db.Doctors.FindAsync(id);
    }

    public async Task<Doctor> CreateAsync(Doctor doctor)
    {
        _db.Doctors.Add(doctor);
        await _db.SaveChangesAsync();
        return doctor;
    }

    public async Task<bool> UpdateAsync(int id, Doctor doctor)
    {
        var existing = await _db.Doctors.FindAsync(id);
        if (existing == null) return false;

        existing.Name = doctor.Name;
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var doctor = await _db.Doctors.FindAsync(id);
        if (doctor == null) return false;

        _db.Doctors.Remove(doctor);
        await _db.SaveChangesAsync();
        return true;
    }
}