import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {
  return (

    <nav className="shadow-sm bg-white z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-8 p-2">
            <Link href={"/"}><img className="w-full h-9" src="/logo.png" alt="Logo" /></Link>
            <SearchBar />        
            <ul>

            </ul>
        </div>
    </nav>
  )
}

export default Navbar

const SearchBar = () => {

    return (
        <>
            <form className="flex items-center shadow-sm rounded-lg w-full focus-within:border">
                <input type="search" name="search" className="outline-none w-full p-2 rounded-lg" placeholder="Search for any product..." />
                <button className="p-3" type="submit"><AiOutlineSearch/></button>
            </form>
        </>
    )
}