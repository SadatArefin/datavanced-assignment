using Microsoft.EntityFrameworkCore;
using MedApi.Entities;

namespace MedApi.Data;

public class AppDb : DbContext
{
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }

    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<PrescriptionDetail> PrescriptionDetails => Set<PrescriptionDetail>();
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Doctor> Doctors => Set<Doctor>();
    public DbSet<Medicine> Medicines => Set<Medicine>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Appointment>()
            .HasMany(a => a.Details)
            .WithOne()
            .HasForeignKey(d => d.AppointmentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Patient>()
            .Property(p => p.Name)
            .HasMaxLength(120)
            .IsRequired();

        builder.Entity<Doctor>()
            .Property(p => p.Name)
            .HasMaxLength(120)
            .IsRequired();

        builder.Entity<Medicine>()
            .Property(p => p.Name)
            .HasMaxLength(120)
            .IsRequired();
    }
}
