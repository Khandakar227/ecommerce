"use client";
import Link from "next/link";
import { AiFillDashboard, AiFillSetting } from "react-icons/ai";
import { HiClipboardList, HiOutlinePencilAlt, HiOutlineViewGrid, HiStar, HiUser } from "react-icons/hi";

function Aside() {
  return (
    <div className="bg-white rounded-lg shadow px-1 py-4 min-w-[250px] sticky top-16">
      <ul>
        <li>
          <Link
            href={"/admin/dashboard"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <AiFillDashboard/>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <HiUser/>
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <HiOutlineViewGrid />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard/add-product"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <HiOutlinePencilAlt />
            <span>Add new product</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <HiClipboardList />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <HiStar/>
            <span>Ratings & Reviews</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard"}
            className="my-1 py-2 flex items-center gap-2 transition-all hover:bg-green-100 px-8 font-medium border-b"
          >
            <AiFillSetting/>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Aside;
