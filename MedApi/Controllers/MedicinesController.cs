using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly AppDb _db;

    public MedicinesController(AppDb db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<List<Medicine>> GetAll()
    {
        return await _db.Medicines.OrderBy(m => m.Name).ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Medicine>> Get(int id)
    {
        var medicine = await _db.Medicines.FindAsync(id);
        return medicine == null ? NotFound() : medicine;
    }

    [HttpPost]
    public async Task<ActionResult<Medicine>> Create(Medicine medicine)
    {
        _db.Medicines.Add(medicine);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = medicine.Id }, medicine);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Medicine medicine)
    {
        var existing = await _db.Medicines.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = medicine.Name;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var medicine = await _db.Medicines.FindAsync(id);
        if (medicine == null) return NotFound();

        _db.Medicines.Remove(medicine);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
