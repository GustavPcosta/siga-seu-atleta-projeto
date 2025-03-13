import AthletesList from "./_components/athlets-list";
import { findAthletes } from "../lib/athlets";
import { Suspense } from "react";
import Filters from "./_components/filters";
import { findSports } from "../lib/sport";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>; // Ajuste na tipagem
}) {
  const searchText = searchParams.q || ""; 
  const category = searchParams.category as "all" | "olympic" | "paralympic" || "all"; 
  const sport = searchParams.sport || ""; 
  const sort = (searchParams.sort as "followers" | "name" | "sport") || "followers";
  const dir = (searchParams.dir as "desc" | "asc") || "desc";

  console.log("Search Params:", searchParams); // Debug para checar os parâmetros recebidos

  const athletes = await findAthletes({
    searchText,
    category,
    sport,
    sort,
    dir,
  });

  const sports = await findSports();

  return (
    <main className="p-4 flex flex-col gap-12">
      <Filters sports={sports} />
      <Suspense key={searchText + category + sport + sort + dir} fallback={<div>Carregando...</div>}>
        <AthletesList filters={{ searchText, category, sport, sort, dir }} initialData={athletes} />
      </Suspense>
    </main>
  );
}
