CREATE OR REPLACE FUNCTION company_planes_function() RETURNS trigger AS 
'
BEGIN
  IF (TG_OP = "INSERT") THEN
    UPDATE Company SET number_of_planes = number_of_planes + 1 WHERE cnpj = NEW.company_cnpj;
  ELSEIF (TG_OP = "DELETE") THEN 
  UPDATE Company SET number_of_planes = number_of_planes - 1 WHERE cnpj = OLD.company_cnpj;
  ELSE
    UPDATE Company SET number_of_planes = number_of_planes + 1 WHERE cnpj = NEW.company_cnpj;
    UPDATE Company SET number_of_planes = number_of_planes - 1 WHERE cnpj = OLD.company_cnpj;
  END IF;
END
'
LANGUAGE plpgsql;

UPDATE public."Company" SET "number_of_planes" = (SELECT COUNT(*) FROM public."Plane" WHERE "Company"."cnpj" = "Plane"."company_cnpj");

CREATE TRIGGER trigger_company_planes
AFTER INSERT OR UPDATE OR DELETE ON public."Company"
FOR EACH ROW
EXECUTE PROCEDURE company_planes_function();