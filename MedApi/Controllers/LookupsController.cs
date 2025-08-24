using Microsoft.AspNetCore.Mvc;
using MedApi.Data;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LookupsController : ControllerBase
{
    private readonly AppDb _db;

    public LookupsController(AppDb db)
    {
        _db = db;
    }

    [HttpGet("patients")]
    public Task<object> Patients() => Task.FromResult<object>(_db.Patients.Select(x => new { x.Id, x.Name }));

    [HttpGet("doctors")]
    public Task<object> Doctors() => Task.FromResult<object>(_db.Doctors.Select(x => new { x.Id, x.Name }));

    [HttpGet("medicines")]
    public Task<object> Medicines() => Task.FromResult<object>(_db.Medicines.Select(x => new { x.Id, x.Name }));
}
