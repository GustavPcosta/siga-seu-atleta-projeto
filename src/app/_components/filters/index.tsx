"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React, { useState } from "react";
import DesktopFilters from "./_components/desktop";
import { Sport } from "@prisma/client";
import MobileFilters from "./_components/mobile-filters";
import { useMediaQuery } from "@react-hook/media-query";

function Filters({sports}: {sports: Sport[]}) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const isMobile = useMediaQuery("only screen and (max-width: 768px)");
    
    // Initialize state from URL params directly
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
    const [selectedSport, setSelectedSport] = useState(searchParams.get("sport") || "");
    const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "");
    const [sortDirection, setSortDirection] = useState(searchParams.get("dir") || "desc");
    
    // Use only one debounced handler for search
    const handleSearch = useDebouncedCallback((searchString: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (searchString) {
            params.set("q", searchString);
        } else {
            params.delete("q");
        }
    
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    
    const handleCategory = (selectCategory: string) => {
        if(selectCategory.length === 0) {
            return;
        }
        setSelectedCategory(selectCategory);
        const params = new URLSearchParams(searchParams);
        params.set("category", selectCategory);
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSportSelect = (selectedSport: Sport) => {
        const params = new URLSearchParams(searchParams);
        
        if (!selectedSport || selectedSport.code.length === 0) {
            setSelectedSport("");
            params.delete("sport");
        } else {
            setSelectedSport(selectedSport.code);
            params.set("sport", selectedSport.code);
        }
    
        replace(`${pathname}?${params.toString()}`);
    };
    
    const handleSortChange = (selectSort: string) => {
        setSelectedSort(selectSort);
        const params = new URLSearchParams(searchParams);
        params.set("sort", selectSort);
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSortDir = () => {
        const newDirection = sortDirection === "desc" ? "asc" : "desc";
        setSortDirection(newDirection);
        const params = new URLSearchParams(searchParams);
        params.set("dir", newDirection);
        replace(`${pathname}?${params.toString()}`);
    }
    
    return (
        <div className="relative flex flex-row md:flex-col lg:flex-row gap-8">
            <div>
                <input
                    className="w-56 md:w-full lg:w-56 border p-2 rounded"
                    type="text"
                    name="q"
                    placeholder="Pesquisar"
                    value={query}
                    onChange={(event) => {
                        const searchString = event.target.value;
                        setQuery(searchString);
                        handleSearch(searchString);
                    }}
                />
            </div>
            {isMobile ? (
                <MobileFilters
                
                
                sort={selectedSort} 
                dir={sortDirection} 
                onSortByChange={handleSortChange} 
                onDirectionChange={handleSortDir} 
                onSportChange={handleSportSelect} 
                sport={selectedSport} 
                category={selectedCategory} 
                onCategoryChange={handleCategory} 
                sports={sports}
                
                
                
                
                
                
                
                />
           
            
            ) : (
            
            <DesktopFilters 
                sort={selectedSort} 
                dir={sortDirection} 
                onSortByChange={handleSortChange} 
                onDirectionChange={handleSortDir} 
                onSportChange={handleSportSelect} 
                sport={selectedSport} 
                category={selectedCategory} 
                onCategoryChange={handleCategory} 
                sports={sports}
            />
        )}   
        </div>
    );
}

export default Filters;