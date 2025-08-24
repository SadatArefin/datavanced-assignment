using Microsoft.AspNetCore.Mvc;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientsService _patientsService;

    public PatientsController(IPatientsService patientsService)
    {
        _patientsService = patientsService;
    }

    [HttpGet]
    public async Task<List<Patient>> GetAll()
    {
        return await _patientsService.GetAllAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Patient>> Get(int id)
    {
        var patient = await _patientsService.GetByIdAsync(id);
        return patient == null ? NotFound() : patient;
    }

    [HttpPost]
    public async Task<ActionResult<Patient>> Create(Patient patient)
    {
        var created = await _patientsService.CreateAsync(patient);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Patient patient)
    {
        var success = await _patientsService.UpdateAsync(id, patient);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _patientsService.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}
