import { prisma } from "@core/lib/prisma.js";
import { Prisma } from "@prisma/client";

import { HTTPError } from "midori/errors";
import { EStatusCode, Middleware, Request, Response } from "midori/http";
import { Constructor } from "midori/util/types.js";

const globalSchema = Prisma.dmmf.datamodel.models;

/**
 * Body Capture of Requisition and check if it is structured with "Connect" or "Create"
 *
 * Checks if ID exists in the database
 * If it exists, add "Connect" on Body
 * If it doesn't exist, add "Create" on Body
 *
 * @param modelName {string} - Name of the model applied to the middleware
 *
 **/
export default function DataRelationMiddleware(
  modelName: string
): Constructor<Middleware> {
  return class extends Middleware {
    async process(
      req: Request,
      next: (req: Request) => Promise<Response>
    ): Promise<Response> {
      const modelSchema = globalSchema.find(({ name }) => name === modelName);

      if (!modelSchema) {
        throw new HTTPError(
          `Model ${modelName} not found.`,
          EStatusCode.INTERNAL_SERVER_ERROR
        );
      }

      const relationsOnBody = Object.keys(req.parsedBody)
        // get only relations fields name on db
        .filter(
          (keyName) =>
            !!modelSchema.fields.find(
              ({ name, relationFromFields }) =>
                relationFromFields?.length && name === keyName
            )
        )
        .map((keyName) => {
          const fieldSchema = modelSchema.fields.find(
            ({ name }) => name === keyName
          )!;

          return {
            dbName: fieldSchema.relationFromFields![0],
            primaryKey: fieldSchema.relationToFields![0],
            modelName: fieldSchema.type,
            name: fieldSchema.name,
          };
        });

      if (relationsOnBody.length > 0) {
        for (const {
          modelName: relationModelName,
          primaryKey,
          name,
        } of relationsOnBody) {
          const bodyItem = req.parsedBody[name];

          // check if body doesn't have "connect" or "create"
          if (!bodyItem?.connect && !bodyItem?.create) {
            // @ts-ignore
            const alreadyExists = await prisma[relationModelName]!.findUnique({
              where: {
                [primaryKey]: bodyItem[primaryKey] ?? bodyItem,
              },
            });

            if (!alreadyExists) {
              req.parsedBody[name] = {
                create: {
                  [primaryKey]: bodyItem,
                },
              };
            } else {
              req.parsedBody[name] = {
                connect: {
                  [primaryKey]: bodyItem[primaryKey] ?? bodyItem,
                },
              };
            }
          }
        }
      }

      return await next(req);
    }
  };
}
