using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly AppDb _db;

    public PatientsController(AppDb db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<List<Patient>> GetAll()
    {
        return await _db.Patients.OrderBy(p => p.Name).ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Patient>> Get(int id)
    {
        var patient = await _db.Patients.FindAsync(id);
        return patient == null ? NotFound() : patient;
    }

    [HttpPost]
    public async Task<ActionResult<Patient>> Create(Patient patient)
    {
        _db.Patients.Add(patient);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = patient.Id }, patient);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Patient patient)
    {
        var existing = await _db.Patients.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = patient.Name;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var patient = await _db.Patients.FindAsync(id);
        if (patient == null) return NotFound();

        _db.Patients.Remove(patient);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
