
import { formModels } from "../config/forms";

// Relation has keys with "{modelName}_{primaryKey}" format, e devem ser alteradas para somente "{modelName}"

export default function removeRelationKeys(data: Record<string, any>) {
  const modelKeys = formModels.map(({ name }) => name);

  Object.keys(data).forEach((key) => {
    if (key.includes("_") && modelKeys.includes(key.split("_")[0])) {
      const modelName = key.split("_")[0]
      data[modelName] = data[key]
      delete data[key]
    }
  })
}