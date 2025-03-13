
import Image from "next/image"
import About from "./About/about"
export default function NavBar(){
    return(
        <nav className="flex items-center justify-between p-4 mb-10 w-full">
        <a href="/" className="text-lg font-semibold">
           <Image src="/logo.svg" alt="Logo" width={200} height={200} /> 
        </a>
        <div className="flex items-center space-x-4">
          <About /> 
        </div>
      </nav>
    )
}