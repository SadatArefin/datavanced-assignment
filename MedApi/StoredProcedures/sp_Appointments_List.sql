-- Create the stored procedure for listing appointments with pagination
-- Run this script in SQL Server Management Studio or similar tool

CREATE OR ALTER PROCEDURE dbo.sp_Appointments_List
    @Search nvarchar(100) = NULL,
    @DoctorId int = NULL,
    @VisitType int = NULL,
    @Page int = 1,
    @PageSize int = 20
AS
BEGIN
    SET NOCOUNT ON;
    
    WITH Q AS (
        SELECT 
            a.Id,
            p.Name AS Patient,
            d.Name AS Doctor,
            a.AppointmentDate,
            a.VisitType,
            a.Diagnosis
        FROM Appointments a
        JOIN Patients p ON p.Id = a.PatientId
        JOIN Doctors d ON d.Id = a.DoctorId
        WHERE (@Search IS NULL OR p.Name LIKE '%' + @Search + '%' OR d.Name LIKE '%' + @Search + '%')
          AND (@DoctorId IS NULL OR a.DoctorId = @DoctorId)
          AND (@VisitType IS NULL OR a.VisitType = @VisitType)
    )
    SELECT * FROM Q 
    ORDER BY AppointmentDate DESC
    OFFSET (@Page - 1) * @PageSize ROWS 
    FETCH NEXT @PageSize ROWS ONLY;
    
    -- Return total count
    SELECT COUNT(*) AS Total FROM Q;
END
