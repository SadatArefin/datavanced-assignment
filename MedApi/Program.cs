using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Converters;
using MedApi.Extensions;
using MedApi.Interfaces;
using MedApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Check if we should use in-memory database (useful for testing)
var useInMemoryDb = builder.Configuration.GetValue<bool>("UseInMemoryDatabase");

if (useInMemoryDb)
{
    builder.Services.AddDbContext<AppDb>(options =>
        options.UseInMemoryDatabase("MedAppDb"));
}
else
{
    builder.Services.AddDbContext<AppDb>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("db")));
}

// Register business services
builder.Services.AddScoped<IPatientsService, PatientsService>();
builder.Services.AddScoped<IDoctorsService, DoctorsService>();
builder.Services.AddScoped<IMedicinesService, MedicinesService>();
builder.Services.AddScoped<IAppointmentsService, AppointmentsService>();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Seed sample data in development
    await app.Services.SeedDataAsync();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();


