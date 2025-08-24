using Microsoft.AspNetCore.Mvc;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly IDoctorsService _doctorsService;

    public DoctorsController(IDoctorsService doctorsService)
    {
        _doctorsService = doctorsService;
    }

    [HttpGet]
    public async Task<List<Doctor>> GetAll()
    {
        return await _doctorsService.GetAllAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Doctor>> Get(int id)
    {
        var doctor = await _doctorsService.GetByIdAsync(id);
        return doctor == null ? NotFound() : doctor;
    }

    [HttpPost]
    public async Task<ActionResult<Doctor>> Create(Doctor doctor)
    {
        var created = await _doctorsService.CreateAsync(doctor);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Doctor doctor)
    {
        var success = await _doctorsService.UpdateAsync(id, doctor);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _doctorsService.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}
