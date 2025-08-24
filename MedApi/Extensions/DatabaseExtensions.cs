using Microsoft.EntityFrameworkCore;
using MedApi.Data;
using MedApi.Entities;

namespace MedApi.Extensions;

public static class DatabaseExtensions
{
    public static async Task SeedDataAsync(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDb>();

        await context.Database.EnsureCreatedAsync();

        // Seed data only if tables are empty
        if (!await context.Patients.AnyAsync())
        {
            // Add sample patients
            var patients = new[]
            {
                new Patient { Name = "John Doe" },
                new Patient { Name = "Jane Smith" },
                new Patient { Name = "Bob Johnson" }
            };
            context.Patients.AddRange(patients);

            // Add sample doctors
            var doctors = new[]
            {
                new Doctor { Name = "Dr. Sarah Wilson" },
                new Doctor { Name = "Dr. Michael Brown" },
                new Doctor { Name = "Dr. Emily Davis" }
            };
            context.Doctors.AddRange(doctors);

            // Add sample medicines
            var medicines = new[]
            {
                new Medicine { Name = "Paracetamol" },
                new Medicine { Name = "Ibuprofen" },
                new Medicine { Name = "Aspirin" },
                new Medicine { Name = "Amoxicillin" }
            };
            context.Medicines.AddRange(medicines);

            await context.SaveChangesAsync();
        }
    }
}
