"use client"
import { useUser } from "@/lib/userContext"
import { FormEvent } from "react";

function ProfileInfo() {
  const { user } = useUser();

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let data:any = {}
    formData.forEach((value, key) => {
        if (!key.includes(".")) data[key] = value;
        else {
            const [parentKey, childKey] = key.split(".");
            if (!data[parentKey]) {
                data[parentKey] = {};
            }

            data[parentKey][childKey] = value;
        }
    })
    console.log(data);
  }

  return (
    <div className="p-3 shadow rounded-md max-w-sm w-full bg-white">
        <form onSubmit={handleSubmit}>
            <h1 className="w-full text-xl font-semibold pb-1">Profile</h1>
            <hr className="mb-4" />
            <div className="my-3">
                <label htmlFor="email" className="text-sm">Email:</label>
                <input className="w-full p-2 border shadow-sm rounded-md" type="email" disabled defaultValue={user.email} />
            </div>
            <div className="my-3">
                <label htmlFor="email" className="text-sm">User name:</label>
                <input className="w-full p-2 border shadow-sm rounded-md" type="text" name="name" defaultValue={user.name} />
            </div>
            <div className="my-3">
                <label htmlFor="email" className="text-sm">Contact number:</label>
                <input className="w-full p-2 border shadow-sm rounded-md" type="text" name="phoneNumber" pattern="[0-9+]+" defaultValue={user.phoneNumber} />
            </div>
            <div className="my-3">
                <h2 className="font-medium mb-2">Address:</h2>
                <div className="my-2 pl-4">
                    <label htmlFor="email" className="text-sm">Apartment:</label>
                    <input className="w-full px-2 py-1 border shadow-sm rounded-md" type="text" name="address.apartment" defaultValue={ user.address?.apartment } />
                    <label htmlFor="email" className="text-sm">Area:</label>
                    <input className="w-full px-2 py-1 border shadow-sm rounded-md" type="text" name="address.area" defaultValue={ user.address?.area } />
                    <label htmlFor="email" className="text-sm">City:</label>
                    <input className="w-full px-2 py-1 border shadow-sm rounded-md" type="text" name="address.city" defaultValue={ user.address?.city } />
                    <label htmlFor="email" className="text-sm">Country:</label>
                    <input className="w-full px-2 py-1 border shadow-sm rounded-md" type="text" name="address.country" defaultValue={ user.address?.country } />
                </div>
            </div>
            
            <div className="text-end font-medium">
                <button type="submit" className="text-white bg-green-600 p-2 rounded-md shadow">Update</button>
            </div>
        </form>
    </div>
  )
}

export default ProfileInfo