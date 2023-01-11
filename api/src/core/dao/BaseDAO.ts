import { ZodSchema } from "zod";

export interface ModelDAO<T> {
  // public variables 
  primary_key: {
    name: string;
    validate: ZodSchema<any>;
  }
  schema: ZodSchema<any>;
  all(args?: any): Promise<T[]>;
  create(data: any): Promise<T>;
  get(args: any): Promise<T | null>;
  save(id: any, data: any): Promise<T>;
  delete(id: any): Promise<T>;
  validate(data: any): boolean;
}
