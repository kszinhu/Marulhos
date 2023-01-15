import { ZodSchema } from "zod";

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
  all(args?: any): Promise<T[]>;
  create(data: any): Promise<T>;
  get(args: any): Promise<T | null>;
  save(id: any, data: any): Promise<T>;
  delete(id: any): Promise<T>;
  validate(data: any): boolean;
}
