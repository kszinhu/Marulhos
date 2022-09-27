-- Trigger to update number_of_planes when a plane is created
CREATE OR REPLACE FUNCTION public.update_number_of_planes() RETURNS TRIGGER AS $$ BEGIN
UPDATE public."Company"
SET number_of_planes = (
  SELECT COUNT(*)
  FROM public."Plane"
  WHERE "Company".cnpj = "Plane".company_cnpj
);
RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to not assign a fly_attendant to a flight_instance if departure_date is before the last_arrival_date
CREATE OR REPLACE FUNCTION public.check_fly_attendant() RETURNS TRIGGER AS $$ BEGIN
  IF NEW.departure_date < (
      SELECT
        arrival_date
      FROM
        public."Flight_Instance" AS fi,
        public."Fly_Attendant" AS fa 
      WHERE
        fi.id = fa.flight_instance_id
        AND fa.cpf = NEW.fly_attendant_cpf
      ORDER BY
        arrival_date DESC
      LIMIT
        1
    ) THEN RAISE EXCEPTION 'Fly attendant is not available at this time' USING ERRCODE='20808';
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers

CREATE TRIGGER check_fly_attendant
BEFORE INSERT OR UPDATE ON public."Flight_Instance" FOR EACH ROW EXECUTE PROCEDURE public.check_fly_attendant();

CREATE TRIGGER update_number_of_planes
AFTER INSERT OR UPDATE OR DELETE ON public."Plane" FOR EACH ROW EXECUTE PROCEDURE public.update_number_of_planes();