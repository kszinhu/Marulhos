import { HTTPError } from "midori/errors";
import { EStatusCode } from "midori/http";
import { z, ZodSchema } from "zod";

export interface Relation {
  type: string;
  model: ModelDAO<any>;
  key: string;
}

export interface ModelDAO<T> {
  // Model Definition as Public Property
  definition: {
    name: string;
    primary_key: {
      name: string;
      validate: ZodSchema<any>;
    };
    schemaValidator: ZodSchema<any>;
  };
  all(args?: any): Promise<T[] | [number, T[]]>;
  create(data: any): Promise<T>;
  get(args: any): Promise<T | null>;
  save(id: any, data: any): Promise<T>;
  delete(id: any): Promise<T>;
  validate(data: any): boolean;
}

export const validate = (data: any, schema: z.ZodObject<any>): boolean => {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.formErrors.fieldErrors);

      throw new HTTPError(
        "Dados não correspondem ao formato esperado",
        EStatusCode.UNPROCESSABLE_ENTITY
      );
    }

    return false;
  }
};
