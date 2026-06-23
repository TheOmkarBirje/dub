import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getProgramSlugs = cache(async () => {
  try {
    return await prisma.program.findMany({
      select: {
        slug: true,
      },
      orderBy: {
        applications: {
          _count: "desc",
        },
      },
      take: 250,
    });
  } catch (error) {
    console.warn("Failed to fetch program slugs for static generation:", error.message);
    return [];
  }
});
