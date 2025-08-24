using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly AppDb _db;

    public DoctorsController(AppDb db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<List<Doctor>> GetAll()
    {
        return await _db.Doctors.OrderBy(d => d.Name).ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Doctor>> Get(int id)
    {
        var doctor = await _db.Doctors.FindAsync(id);
        return doctor == null ? NotFound() : doctor;
    }

    [HttpPost]
    public async Task<ActionResult<Doctor>> Create(Doctor doctor)
    {
        _db.Doctors.Add(doctor);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = doctor.Id }, doctor);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Doctor doctor)
    {
        var existing = await _db.Doctors.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = doctor.Name;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var doctor = await _db.Doctors.FindAsync(id);
        if (doctor == null) return NotFound();

        _db.Doctors.Remove(doctor);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
