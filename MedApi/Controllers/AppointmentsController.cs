using Microsoft.AspNetCore.Mvc;
using MedApi.Dto;
using MedApi.Entities;
using MedApi.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;

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

    [HttpPost("{id:int}/email")]
    public async Task<IActionResult> Email(int id, [FromQuery] string to)
    {
        // Reuse Pdf(id) logic to get bytes
        var pdfBytes = await _appointmentsService.GeneratePdfAsync(id);
        if (pdfBytes == null)
            return NotFound();

        var msg = new MimeMessage();
        msg.From.Add(MailboxAddress.Parse("noreply@yourdomain.com"));
        msg.To.Add(MailboxAddress.Parse(to));
        msg.Subject = "Prescription Report";

        var builder = new BodyBuilder { TextBody = "Attached prescription." };
        builder.Attachments.Add("prescription.pdf", pdfBytes, new ContentType("application", "pdf"));
        msg.Body = builder.ToMessageBody();

        using var smtp = new SmtpClient();
        try
        {
            await smtp.ConnectAsync("smtp.server", 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync("user", "pass");
            await smtp.SendAsync(msg);
            await smtp.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            // In a real application, you would want to log this exception
            return BadRequest($"Failed to send email: {ex.Message}");
        }

        return Ok();
    }
}
