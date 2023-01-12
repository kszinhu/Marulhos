import { ModelDAO } from "@core/dao/BaseDAO.js";

const parseRelation = (relation: { model: ModelDAO<any>, name: string }, data: any) => {
  const { model, name } = relation;

  if (!data[name]?.hasOwnProperty("connect") || !data[name]?.hasOwnProperty("create")) {
    data = {
      ...((typeof data === "string" || typeof data === "number") ? {
        connect: {
          [model.primary_key.name]: data,
        }
      } : {
        create: data,
      })
    }
  }

  return data;
}

export { parseRelation };