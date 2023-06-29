"use client"
import Link from "next/link"

function Aside() {
  return (
    <div className="bg-white rounded-lg shadow px-1 py-4 min-w-[230px]">
        <ul>
            <li> <Link href={"/admin/dashboard"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Dashboard </Link> </li>
            <li> <Link href={"/admin/dashboard"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Users </Link> </li>
            <li> <Link href={"/admin/dashboard"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Products </Link> </li>
            <li> <Link href={"/admin/dashboard/add-product"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Add new product </Link> </li>
            <li> <Link href={"/admin/dashboard"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Orders </Link> </li>
            <li> <Link href={"/admin/dashboard"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Ratings & Reviews </Link> </li>
            <li> <Link href={"/admin/dashboard"} className="my-1 py-1 block transition-all hover:bg-green-100 px-8 font-medium"> Settings </Link> </li>
        </ul>
    </div>
  )
}

export default Aside