import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";


import { useState } from "react";
import { Sport } from "@prisma/client";
import Image from "next/image";

function SportsFilter({
  sports,
  sport,
  onSportChange,
}: {
  sports: Sport[];
  sport: string;
  onSportChange: (sport: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(
    sports.find((s) => s.code === sport) || null
  );

  const handleChange = (name: string) => {
    if (name === selectedSport?.name) {
      setSelectedSport(null);
      setOpen(false);
      onSportChange("");
      return;
    }

    const selected = sports.find((sport) => sport.name === name) || null;

    setSelectedSport(selected);
    setOpen(false);
    onSportChange(selected?.code || "");
  };

  return (
    <div className="flex md:flex-row flex-col items-center gap-1">
      <span className="text-sm underline decoration-yellow-500 block md:hidden">
        Esporte:
      </span>
      <div className="flex items-center space-x-4 h-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-full min-h-10 justify-start"
            >
              {selectedSport ? (
                <>
                  <SportIcon code={selectedSport.code} />
                  {selectedSport.name}
                </>
              ) : (
                <>Todos os esportes</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="top" align="center">
            <Command>
              <CommandInput placeholder="Pesquisar esporte..." />
              <CommandList>
                <CommandEmpty>Esporte não encontrado.</CommandEmpty>
                <CommandGroup>
                  {sports.map((sport) => (
                    <CommandItem
                      key={sport.code}
                      value={sport.name}
                      onSelect={handleChange}
                    >
                      <SportIcon code={sport.code} />
                      <span>{sport.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const SportIcon = ({ code }: { code: string }) => (
  <Image
    src={`https://codante.s3.amazonaws.com/codante-apis/olympic-games/pictograms/${code}.avif`}
    alt={`${code} pictogram`}
    width={20}
    height={20}
    className="mr-2"
  />
);

export default SportsFilter;
