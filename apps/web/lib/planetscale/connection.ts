import { prisma } from "../prisma";

export const conn = {
  execute: async <T = any>(query: string, params?: any[]) => {
    const rows = await prisma.$queryRawUnsafe(query, ...(params || []));
    return { rows: rows as T[] };
  }
};
