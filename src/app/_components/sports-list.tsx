"use client";
import { Sport } from "@prisma/client";

interface SportListProps {
  initialData: Sport[];
}

export default function SportList({ initialData }: SportListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {initialData.map((sport) => (
        
        <div
          key={sport.id}
          className=""
        >
          <h2 className="">{sport.name}</h2>
        </div>
      ))}
    </div>
  );
}
