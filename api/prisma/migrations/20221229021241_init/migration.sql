BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [username] VARCHAR(255) NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [last_name] NVARCHAR(1000) NOT NULL,
    [rg] NVARCHAR(1000),
    [sex] NVARCHAR(1000) NOT NULL,
    [birth_date] DATETIME2,
    [address_cep] NVARCHAR(1000) NOT NULL,
    [address_number] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_cpf_key] UNIQUE NONCLUSTERED ([cpf]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Pilot] (
    [cpf] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [last_name] NVARCHAR(1000) NOT NULL,
    [rg] NVARCHAR(1000),
    [sex] NVARCHAR(1000) NOT NULL,
    [birth_date] DATETIME2,
    [address_cep] NVARCHAR(1000) NOT NULL,
    [address_number] NVARCHAR(1000) NOT NULL,
    [salary] DECIMAL(32,16) NOT NULL,
    [vaccination_number] INT NOT NULL,
    [passport_number] INT NOT NULL,
    [work_registration_number] INT NOT NULL,
    [pilot_license_number] INT NOT NULL,
    CONSTRAINT [Pilot_pkey] PRIMARY KEY CLUSTERED ([cpf]),
    CONSTRAINT [Pilot_vaccination_number_key] UNIQUE NONCLUSTERED ([vaccination_number]),
    CONSTRAINT [Pilot_passport_number_key] UNIQUE NONCLUSTERED ([passport_number]),
    CONSTRAINT [Pilot_work_registration_number_key] UNIQUE NONCLUSTERED ([work_registration_number]),
    CONSTRAINT [Pilot_pilot_license_number_key] UNIQUE NONCLUSTERED ([pilot_license_number])
);

-- CreateTable
CREATE TABLE [dbo].[Fly_Attendant] (
    [cpf] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [last_name] NVARCHAR(1000) NOT NULL,
    [rg] NVARCHAR(1000),
    [sex] NVARCHAR(1000) NOT NULL,
    [birth_date] DATETIME2,
    [address_cep] NVARCHAR(1000) NOT NULL,
    [address_number] NVARCHAR(1000) NOT NULL,
    [salary] DECIMAL(32,16) NOT NULL,
    [vaccination_number] INT NOT NULL,
    [passport_number] INT NOT NULL,
    [work_registration_number] INT NOT NULL,
    CONSTRAINT [Fly_Attendant_pkey] PRIMARY KEY CLUSTERED ([cpf]),
    CONSTRAINT [Fly_Attendant_vaccination_number_key] UNIQUE NONCLUSTERED ([vaccination_number]),
    CONSTRAINT [Fly_Attendant_passport_number_key] UNIQUE NONCLUSTERED ([passport_number]),
    CONSTRAINT [Fly_Attendant_work_registration_number_key] UNIQUE NONCLUSTERED ([work_registration_number])
);

-- CreateTable
CREATE TABLE [dbo].[Terminal] (
    [id] INT NOT NULL IDENTITY(1,1),
    [capacity] INT NOT NULL,
    CONSTRAINT [Terminal_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Flight] (
    [id] INT NOT NULL IDENTITY(1,1),
    [estimated_departure_date] DATETIME2 NOT NULL,
    [estimated_arrival_date] DATETIME2 NOT NULL,
    [origin] NVARCHAR(1000) NOT NULL,
    [destination] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Flight_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Flight_Instance] (
    [id] INT NOT NULL IDENTITY(1,1),
    [departure_date] DATETIME2 NOT NULL,
    [arrival_date] DATETIME2 NOT NULL,
    [flight_id] INT NOT NULL,
    [plane_id] INT NOT NULL,
    [terminal_id] INT NOT NULL,
    [pilot_cpf] NVARCHAR(1000) NOT NULL,
    [copilot_cpf] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Flight_Instance_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Flight_Instance_flight_id_key] UNIQUE NONCLUSTERED ([flight_id])
);

-- CreateTable
CREATE TABLE [dbo].[Ticket] (
    [id] INT NOT NULL IDENTITY(1,1),
    [price] DECIMAL(32,16) NOT NULL,
    [passenger_id] NVARCHAR(1000) NOT NULL,
    [flight_instance_id] INT,
    CONSTRAINT [Ticket_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [cnpj] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [contact] NVARCHAR(1000) NOT NULL,
    [number_of_planes] INT NOT NULL CONSTRAINT [Company_number_of_planes_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Company_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Company_pkey] PRIMARY KEY CLUSTERED ([cnpj]),
    CONSTRAINT [Company_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Plane] (
    [id] INT NOT NULL IDENTITY(1,1),
    [capacity] INT NOT NULL,
    [model] NVARCHAR(1000) NOT NULL,
    [manufacture_date] DATETIME2,
    [company_cnpj] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Plane_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_Flight_InstanceToFly_Attendant] (
    [A] INT NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_Flight_InstanceToFly_Attendant_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_Flight_InstanceToFly_Attendant_B_index] ON [dbo].[_Flight_InstanceToFly_Attendant]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Flight_Instance] ADD CONSTRAINT [Flight_Instance_terminal_id_fkey] FOREIGN KEY ([terminal_id]) REFERENCES [dbo].[Terminal]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Flight_Instance] ADD CONSTRAINT [Flight_Instance_flight_id_fkey] FOREIGN KEY ([flight_id]) REFERENCES [dbo].[Flight]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Flight_Instance] ADD CONSTRAINT [Flight_Instance_copilot_cpf_fkey] FOREIGN KEY ([copilot_cpf]) REFERENCES [dbo].[Pilot]([cpf]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Flight_Instance] ADD CONSTRAINT [Flight_Instance_pilot_cpf_fkey] FOREIGN KEY ([pilot_cpf]) REFERENCES [dbo].[Pilot]([cpf]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Flight_Instance] ADD CONSTRAINT [Flight_Instance_plane_id_fkey] FOREIGN KEY ([plane_id]) REFERENCES [dbo].[Plane]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [Ticket_flight_instance_id_fkey] FOREIGN KEY ([flight_instance_id]) REFERENCES [dbo].[Flight_Instance]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [Ticket_passenger_id_fkey] FOREIGN KEY ([passenger_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Plane] ADD CONSTRAINT [Plane_company_cnpj_fkey] FOREIGN KEY ([company_cnpj]) REFERENCES [dbo].[Company]([cnpj]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Flight_InstanceToFly_Attendant] ADD CONSTRAINT [_Flight_InstanceToFly_Attendant_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Flight_Instance]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Flight_InstanceToFly_Attendant] ADD CONSTRAINT [_Flight_InstanceToFly_Attendant_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Fly_Attendant]([cpf]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
