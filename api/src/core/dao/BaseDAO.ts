export interface ModelDAO<T> {
  all(args?: any): Promise<T[]>;
  create(data: any): Promise<T>;
  get(args: any): Promise<T | null>;
  save(id: any, data: any): Promise<T>;
  delete(id: any): Promise<T>;
  validate(data: any): boolean;
}
