
import { Sport } from "@prisma/client"
import CategoryFilters from "./categories"
import SportsFilter from "./sport"
import SortBy from './sortBy'

interface DesktopFiltersProps{
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

export default function DesktopFilters({category, onCategoryChange, sports,
    onSportChange,
    sport,
    sort,
    onSortByChange,
    dir,
    onDirectionChange
    
}:DesktopFiltersProps){
    return(
        <div className="flex w-full justify-between">
            <div className="flex gap-8">
                <CategoryFilters category={category} onCategoryChange={onCategoryChange}/>
                {/* <SportsFilter sport={sport} sports ={sports} onSportChange={onSportChange}/> */}
                <SportsFilter 
                sport={sport} 
                sports={sports} 
                     onSportChange={(selectedSport) => onSportChange(sports.find(s => s.name === selectedSport) ?? { name: selectedSport, id: 0, paralympic: false, code: '' })} 
/>

                <SortBy sort={sort} onSortByChange={onSortByChange} dir={dir} onDirectionChange={onDirectionChange}/>
            </div>
        </div>
    )
}