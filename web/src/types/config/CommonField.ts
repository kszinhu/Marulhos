export enum FieldType {
  text = "text",
  number = "number",
  date = "date",
  select = "select",
  radio = "radio",
  modelSelect = "model-select",
  modelTable = "model-table",
}

// TODO: Refactor this to add conditional props
type ConditionalFieldProps = {
  type: FieldType.modelSelect | FieldType.modelTable;
  endpoint: string;
  enableCreate?: boolean;
};
