using Microsoft.AspNetCore.Mvc;
using MedApi.Dto;
using MedApi.Entities;
using MedApi.Interfaces;

namespace MedApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentsService _appointmentsService;

    public AppointmentsController(IAppointmentsService appointmentsService)
    {
        _appointmentsService = appointmentsService;
    }

    [HttpGet]
    public async Task<PagedResult<AppointmentListDto>> List(
        string? search,
        [FromQuery] int? doctorId,
        [FromQuery] VisitType? visitType,
        int page = 1,
        int pageSize = 20)
    {
        return await _appointmentsService.GetListAsync(search, doctorId, visitType, page, pageSize);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppointmentUpsertDto>> Get(int id)
    {
        var appointment = await _appointmentsService.GetByIdAsync(id);
        return appointment == null ? NotFound() : appointment;
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(AppointmentUpsertDto dto)
    {
        var appointmentId = await _appointmentsService.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = appointmentId }, appointmentId);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, AppointmentUpsertDto dto)
    {
        var success = await _appointmentsService.UpdateAsync(id, dto);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _appointmentsService.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }

    [HttpGet("{id:int}/pdf")]
    public async Task<IActionResult> Pdf(int id)
    {
        var pdfBytes = await _appointmentsService.GeneratePdfAsync(id);
        return pdfBytes == null ? NotFound() : File(pdfBytes, "application/pdf", "prescription.pdf");
    }
}
