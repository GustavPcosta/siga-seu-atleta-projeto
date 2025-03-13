"use server";

import { Athlete } from "@prisma/client";
import db from "../../prisma/db";
import { ATHLETES_PER_PAGE } from "./constantes";

export type AthleteWithSports = Athlete & {
  sport: { name: string };
};

interface FindAthletesParams {
  offset?: number;
  limit?: number;
  searchText?: string;
  category?: "all" | "paralympic" | "olympic";
  sport?: string;
  sort?: "followers" | "name" | "sport";
  dir?: "desc" | "asc";
}

function getSortOrderBy(
  sort?: FindAthletesParams["sort"],
  dir?: FindAthletesParams["dir"]
) {
  if (sort === "followers") {
    return { instagramFollowersCount: dir || "desc" };
  } else if (sort === "name") {
    return { name: dir || "asc" };
  } else if (sort === "sport") {
    return { sport: { name: dir || "asc" } };
  }
  return undefined; 
}

export async function findAthletes({
  offset = 0,
  limit = ATHLETES_PER_PAGE,
  searchText = "",
  category,
  sport,
  sort,
  dir,
}: FindAthletesParams): Promise<AthleteWithSports[]> { 
  return db.athlete.findMany({
    skip: offset,
    take: limit,
    include: { sport: { select: { name: true } } },
    where: {
      AND: [
        searchText
          ? {
              OR: [
                { instagramName: { contains: searchText } }, // Removido o mode
                { instagramBio: { contains: searchText } }, // Removido o mode
              ],
            }
          : {},
    
        sport
          ? {
              sport: {
                code: sport,
              },
            }
          : {},
    
        category !== "all"
          ? {
              paralympic: category === "paralympic",
            }
        : {},
      ],
    },
    orderBy: getSortOrderBy(sort, dir),
  }) as Promise<AthleteWithSports[]>; }