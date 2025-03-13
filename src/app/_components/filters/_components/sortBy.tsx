import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"


import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { Button } from "@/components/ui/button";
interface SortByParams {
  sort: string;
  onSortByChange: (selectedSort: string) => void;
  dir: string;
  onDirectionChange: (params:any) => void;
}

function SortBy({
    sort,
  onSortByChange,
  dir,
  onDirectionChange
}: SortByParams){
    return(
        <div className="flex flex-col md:flex-row items-center gap-1">
        <span className="text-sm underline decoration-yellow-500 block md:hidden">
        Ordenação:
      </span>
      <div className="flex items-center gap-1">
        <Select
         defaultValue="followers"
         value={sort}
         onValueChange={onSortByChange}
        
        >
        <SelectTrigger className="w-32">
            <SelectValue placeholder="Seguidores">

            </SelectValue>
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="followers">Seguidores</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="sport">Esporte</SelectItem>
        </SelectContent>
        </Select>
        <Button onClick={onDirectionChange} type="button">
          {dir === "desc" ? (
            <GoSortDesc className="w-6 h-6" />
          ) : (
            <GoSortAsc className="w-6 h-6" />
          )}
        </Button>
      </div>
        </div>
    )
}

export default SortBy