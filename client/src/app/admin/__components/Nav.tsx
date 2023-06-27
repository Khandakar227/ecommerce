"use client"
import { useUser } from "@/lib/userContext"
import Link from "next/link"
import ProfileButton from "./ProfileButton";

function Nav() {
  const { user } = useUser();
  
  return (
    <header className="shadow-sm sticky top-0 bg-green-100 z-10">
      <div className="max-w-5xl mx-auto p-2 flex justify-between items-center gap-8">
        <Link href={"/admin/dashboard"} className="text-xl font-semibold">APanel</Link>
        <nav className="flex justify-between items-center gap-8">
            <ul className="flex gap-4 justify-center">
                {/* <li><Link href="/products" className="font-medium">Products</Link></li> */}
            </ul>
            {
              user.email ?
              <ProfileButton/>
              :
              <Link href={"/admin/login"} className="font-medium shadow-sm rounded-sm py-1 px-2 bg-white"> Login </Link>
            }
        </nav>
      </div>
    </header>
  )
}

export default Nav