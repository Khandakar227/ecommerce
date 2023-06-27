"use client"
import { getDPName } from "@/lib";
import { useUser } from "@/lib/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function ProfileButton() {
  const [userProfile, setUserProfile] = useState("");
  const { user, logOut } = useUser();

  useEffect(() => {
    if (!user.name) return;
    const profileName = getDPName(user.name);
    setUserProfile( profileName );
  },[user.name]);

  const handleLogout = async () => {
    logOut();
  }

  return (
    <>
    <div className="relative group">
        <button>
            <span className="w-8 h-8 rounded-2xl text-sm bg-green-400 shadow border flex justify-center items-center">{userProfile}</span>
        </button>
        <div className="absolute bg-white rounded-md p-2 min-w-[180px] shadow-sm border right-0 transition-all -z-10 opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100 group-hover:z-10">
            <ul className="grid justify-center items-center">
              <li className="border-b hover:bg-green-100 transition-all"><Link href="/admin/dashboard/profile" className="block w-full p-2"> View Profile </Link></li>
              <li className="border-b hover:bg-green-100 transition-all"><button onClick={handleLogout} className="w-full text-left p-2"> Log out </button></li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default ProfileButton