import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";




export default function CategoryFilters({category, onCategoryChange}:{category:string, onCategoryChange:(selectCategory:string) =>void}){
    return (
        <div className="flex flex-col md:flex-row items-center gap-1 mt-10 md:mt-0">
        <span className="text-sm underline decoration-yellow-500 block md:hidden">
        Categoria:
      </span> 
        <ToggleGroup type="single" value={category} onValueChange={onCategoryChange}>
            <ToggleGroupItem value="all" area-label="toggle-all">
                Todos
            </ToggleGroupItem>

            <ToggleGroupItem value="olympic" area-label="toggle-all">
                Olímpicos
            </ToggleGroupItem>
            <ToggleGroupItem value="paralympic" area-label="toggle-all">
                Paralímpicos
            </ToggleGroupItem>
        </ToggleGroup>

        </div>
    )
}