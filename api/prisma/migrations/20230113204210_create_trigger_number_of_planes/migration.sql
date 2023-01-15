BEGIN TRY

BEGIN TRAN;

-- Create Trigger to update number of planes in Company table when a plane is added or removed from the Plane table
-- Only applies to the Company that owns the Plane that was added or removed
EXEC('CREATE OR ALTER TRIGGER UpdateNumberOfPlanesInserted ON [dbo].[Plane]
AFTER INSERT
AS
BEGIN
  UPDATE [dbo].[Company]
  SET number_of_planes = (
    SELECT COUNT(*)
    FROM [dbo].[Plane] AS p
    INNER JOIN INSERTED AS i
    ON p.company_cnpj = i.company_cnpj
  )
END')

EXEC ('CREATE OR ALTER TRIGGER UpdateNumberOfPlanesDeleted ON [dbo].[Plane]
AFTER DELETE
AS
BEGIN
  UPDATE [dbo].[Company]
  SET number_of_planes = (
    SELECT COUNT(*)
    FROM [dbo].[Plane] AS p
    INNER JOIN DELETED AS d
    ON p.company_cnpj = d.company_cnpj
  )
END')

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
  ROLLBACK TRAN;
END;
THROW

END CATCH