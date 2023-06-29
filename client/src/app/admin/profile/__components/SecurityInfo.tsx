"use client"
import { useUser } from "@/lib/userContext";

function SecurityInfo() {
    const { user } = useUser();

    return (
        <>
        <div className="p-3 shadow rounded-md max-w-sm w-full bg-white my-4">
            <div className="mb-3">
                <p>
                    Role: <span className="font-semibold text-lg">{user.role?.toUpperCase()}</span>
                </p>
            </div>
            <div className="my-3 flex justify-between items-center">
                <p className="text-sm">Status:
                    <span className={`font-medium text-sm ${user.verified ? "text-green-500" : "text-red-500"}`}>
                        {user.verified ? " Verified" : " Not verified"}
                    </span>
                </p>
                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded-md"> Send verification mail </button>
            </div>
        </div>
        </>
    )
}

export default SecurityInfo