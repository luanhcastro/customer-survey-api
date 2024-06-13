import { Prisma } from '@prisma/client';

export function convertJsonValueToObject(jsonValue: Prisma.JsonValue): object {
  return jsonValue as object;
}
