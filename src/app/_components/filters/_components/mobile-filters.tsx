import { Sport } from "@prisma/client"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { GoFilter } from "react-icons/go";
import SortBy from "./sortBy";
import CategoryFilters from "./categories";
import SportsFilter from "./sport";


interface MobileFiltersProps{
    category:string,
    onCategoryChange:(selectCategory:string) =>void
    sports: Sport[]
    sport: string
    onSportChange:(sport:Sport) => void
    sort:string
    onSortByChange:(selectedSport:string)=>void
    dir:string
    onDirectionChange:()=>void
    
}


function MobileFilters({category, onCategoryChange, sports,
    onSportChange,
    sport,
    sort,
    onSortByChange,
    dir,
    onDirectionChange
    
}:MobileFiltersProps){

    const [open, setOpen] = useState(false)
  
    
  const closeAfter = (callback: (params: any) => any) => {
    return (params: any) => {
      callback(params);
      setOpen(false);
    };
  };
    return(
        <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="flex justify-end w-full">
          <Button
            className="bg-yellow-500 cursor-pointer border-2 border-black"
            onClick={() => setOpen(true)}
          >
            <GoFilter className="w-4 h-4 mr-2" />
            filtros
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-4 flex flex-col gap-4">
          <CategoryFilters
            category={category}
            onCategoryChange={closeAfter(onCategoryChange)}
          />
  
          <SportsFilter
            sports={sports}
            sport={sport}
            onSportChange={closeAfter(onSportChange)}
          />
  
          <SortBy
            sort={sort}
            dir={dir}
            onSortByChange={closeAfter(onSortByChange)}
            onDirectionChange={closeAfter(onDirectionChange)}
          />
        </DrawerContent>
      </Drawer>
    )
}


export default MobileFilters