using Microsoft.AspNetCore.Mvc;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly IMedicinesService _medicinesService;

    public MedicinesController(IMedicinesService medicinesService)
    {
        _medicinesService = medicinesService;
    }

    [HttpGet]
    public async Task<List<Medicine>> GetAll()
    {
        return await _medicinesService.GetAllAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Medicine>> Get(int id)
    {
        var medicine = await _medicinesService.GetByIdAsync(id);
        return medicine == null ? NotFound() : medicine;
    }

    [HttpPost]
    public async Task<ActionResult<Medicine>> Create(Medicine medicine)
    {
        var created = await _medicinesService.CreateAsync(medicine);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Medicine medicine)
    {
        var success = await _medicinesService.UpdateAsync(id, medicine);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _medicinesService.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}
