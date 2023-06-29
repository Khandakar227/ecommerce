"use client";
import { request } from "@/lib";
import { API_ENDPOINT } from "@/lib/config";
import { useUser } from "@/lib/userContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface UserData {
  name: string;
  phoneNumber: string;
  apartment: string;
  area: string;
  city: string;
  country: string;
  [key: string]: any;
}

const defaultValue = {
    name: "",
    phoneNumber: "",
    apartment: "",
    area: "",
    city: "",
    country: ""
  }

function ProfileInfo() {
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState(defaultValue);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setUserData({
      name: user.name || "",
      phoneNumber: user.phoneNumber || "",
      apartment: user.address?.apartment || "",
      area: user.address?.area || "",
      city: user.address?.city || "",
      country: user.address?.country || "",
    });
  }, [user, user.name]);

  useEffect(() => {
    matchUserObjects();
  }, [userData]);

  function matchUserObjects() {
    if (
      userData.name !== user.name ||
      userData.phoneNumber !== (user.phoneNumber || "") ||
      userData.apartment !== (user.address?.apartment || "") ||
      userData.city !== (user.address?.city || "") ||
      userData.country !== (user.address?.country || "") ||
      userData.area !== (user.address?.area || "")
    )
      setIsUpdate(true);
    else setIsUpdate(false);
  }

  const handleChange = (e: ChangeEvent) => {
    const el = e.target as HTMLInputElement;
    setUserData((u) => {
      return {
        ...u,
        [el.id]: el.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let data: any = {};
    formData.forEach((value, key) => {
      if (!key.includes(".")) data[key] = value;
      else {
        const [parentKey, childKey] = key.split(".");
        if (!data[parentKey]) data[parentKey] = {};
        data[parentKey][childKey] = value;
      }
    });
    console.log(data)
    try {
        const res = await request({
            method: "PUT",
            url: `${API_ENDPOINT}/user/update`,
            data,
        })
        console.log(res);
        setUser(res.data.user);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="p-3 shadow rounded-md max-w-sm w-full bg-white">
      <form onSubmit={handleSubmit}>
        <h1 className="w-full text-xl font-semibold pb-1">Profile</h1>
        <hr className="mb-4" />
        <div className="my-3">
          <label htmlFor="email" className="text-sm">
            Email:
          </label>
          <input
            id="email"
            className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none"
            type="email"
            disabled
            defaultValue={user.email}
          />
        </div>
        <div className="my-3">
          <label htmlFor="name" className="text-sm">
            User name:
          </label>
          <input
            id="name"
            onChange={handleChange}
            className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none"
            type="text"
            name="name"
            value={userData.name}
          />
        </div>
        <div className="my-3">
          <label htmlFor="phoneNumber" className="text-sm">
            Contact number:
          </label>
          <input
            id="phoneNumber"
            onChange={handleChange}
            className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none"
            type="text"
            name="phoneNumber"
            pattern="[0-9+]+"
            value={userData.phoneNumber}
          />
        </div>
        <div className="my-3">
          <h2 className="font-medium mb-2">Address:</h2>
          <div className="my-2 pl-4">
            <label htmlFor="apartment" className="text-sm">
              Apartment:
            </label>
            <input
              id="apartment"
              onChange={handleChange}
              className="w-full px-2 py-1 border shadow-sm rounded-md focus:border-green-600 outline-none"
              type="text"
              name="address.apartment"
              value={userData.apartment}
            />
            <label htmlFor="area" className="text-sm">
              Area:
            </label>
            <input
              id="area"
              onChange={handleChange}
              className="w-full px-2 py-1 border shadow-sm rounded-md focus:border-green-600 outline-none"
              type="text"
              name="address.area"
              value={userData.area}
            />
            <label htmlFor="city" className="text-sm">
              City:
            </label>
            <input
              id="city"
              onChange={handleChange}
              className="w-full px-2 py-1 border shadow-sm rounded-md focus:border-green-600 outline-none"
              type="text"
              name="address.city"
              value={userData.city}
            />
            <label htmlFor="country" className="text-sm">
              Country:
            </label>
            <input
              id="country"
              onChange={handleChange}
              className="w-full px-2 py-1 border shadow-sm rounded-md focus:border-green-600 outline-none"
              type="text"
              name="address.country"
              value={userData.country}
            />
          </div>
        </div>

        <div className="text-end font-medium">
          <button
            type="submit"
            disabled={!isUpdate}
            className="text-white bg-green-600 p-2 rounded-md shadow disabled:opacity-75"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileInfo;
