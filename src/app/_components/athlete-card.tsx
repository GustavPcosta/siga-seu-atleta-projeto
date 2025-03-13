import {GoPerson} from 'react-icons/go'
import { RxInstagramLogo } from "react-icons/rx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage,  } from "@/components/ui/avatar"


import { AthleteWithSports } from "@/lib/athlets"
import Link from 'next/link'

interface AthleteCardProps{
    athlete: AthleteWithSports
}

function formatFollewersCount(count:number){
    if(count < 1000){
        return count
        }
        return `${(count/1000).toFixed(1)}K`
        
}
function extractInstagramAccount(url:string){
const match = url.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/?]+)/);
  return match ? match[1] : null;
    
}
function AtleteCard({athlete}:AthleteCardProps){
    return(
        <Card className="w-full group">
            <CardHeader className="flex items-start justify-between p-4 flex-row overflow-hidden gap-2">
                <div className="flex items-center space-x-4 truncate">
                    <Avatar className="border-2 border-black w-14 h-14">
                        <AvatarImage src={athlete.instagramImageUrl!}
                        alt="Athlete avatar"
                        />
                    </Avatar>
                    <div className="truncate">
                        <CardTitle className="text-lg font-bold truncate">
                         {athlete.instagramName}
                        </CardTitle>

                        <CardDescription className="text-sm truncate">
                        {athlete.sport.name}
                        </CardDescription>
                
                    </div>

                    <div className="font-medium flex items-center gap-1">
                        <GoPerson className="w-5 h-5"/>
                        {formatFollewersCount(athlete.instagramFollowersCount!)}
                    </div>
                </div>

            </CardHeader>
            <CardContent className="p-4 text-sm text-gray-700 font-light flex-grow">
            <p className="min-h-[7.5em] leading-[1.5em]">{athlete.instagramBio}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t p-4 text-sm">
            <span className="font-bold truncate w-[40%]">
            @{extractInstagramAccount(athlete.instagramUrl!)}
            
            </span>
            
            <Link
             href={athlete.instagramUrl!}
             className="flex items-center space-x-1 text-blue-500"
             prefetch={false}
             target="_blank"
            
            >
            <RxInstagramLogo className="w-4 h-4" />
            <span>Ver no Instagram</span>
            </Link>
            
            </CardFooter>
        </Card>
    )
}


export default AtleteCard