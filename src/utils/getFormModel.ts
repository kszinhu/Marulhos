import { formModels } from "../config/forms"

export const getFormModel = (modelName: string) => formModels.find(({ name }) => name === modelName)