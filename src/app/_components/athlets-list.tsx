"use client";
import { AthleteWithSports, findAthletes } from "@/lib/athlets";
import { useInView } from "react-intersection-observer";
import AthleteCard from "./athlete-card";
import { useEffect, useState } from "react";
import { ATHLETES_PER_PAGE } from "@/lib/constantes";

interface AthletesListProps {
  initialData: AthleteWithSports[];
  filters:{
    searchText?:string,
    category?: 'all' | 'olympic' | 'paralympic'
    sport?: string
    sort: "followers" | "name" | "sport";
    dir:"desc"| "asc"
  }

}

export default function AthletesList({ initialData, filters }: AthletesListProps) {
  const [offset, setOffset] = useState(ATHLETES_PER_PAGE);
  const [athletes, setAthletes] = useState<AthleteWithSports[]>(initialData);
  const [hasMoreData, setMoreData] = useState(
    initialData.length === ATHLETES_PER_PAGE
  );
  const { ref: scrollTrigger, inView: isInView } = useInView();

  const loadMoreAthletes = async () => {
    if (hasMoreData) {
      const apiAthletes = await findAthletes({
        offset,
        ...filters,
      });
  
      console.log("Dados recebidos:", apiAthletes); // Verifique se os dados estão corretos
  
      if (apiAthletes.length === 0) {
        setMoreData(false);
        return;
      }
  
      setAthletes((prevAthletes) => [
        ...prevAthletes,
        ...apiAthletes,
      ] as AthleteWithSports[]); 
  
      setOffset((prevOffset) => prevOffset + ATHLETES_PER_PAGE);
    }
  };
  

  useEffect(() => {
    if (isInView && hasMoreData) {
      loadMoreAthletes();
    }
  }, [isInView, hasMoreData]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>
      <div className="w-full flex justify-center py-4">
        {hasMoreData && <div ref={scrollTrigger}> Carregando... </div>}
      </div>
    </>
  );
}
