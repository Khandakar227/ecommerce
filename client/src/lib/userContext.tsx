"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { request } from ".";
import { API_ENDPOINT } from "./config";
import { useRouter } from "next/navigation";

export interface UserType {
  name: string;
  phoneNumber: string;
  email: string;
  authType: string;
  role: string;
  displayPhoto: string;
  address: {
    apartment: string;
    area: string;
    city: string;
    country: string;
  };
  verified: string;
  createdAt: string;
  signedInAt: string;
  [key: string]: any;
};
type UserContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
  signUp: Function;
  signIn: (name: string, password: string, role: "admin" | "user") => void;
  logOut: Function;
};
export const userContext = createContext<UserContextType>(
  {} as UserContextType
);

export function useUser() {
  return useContext(userContext);
}

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, _setUser] = useState({} as UserType);
  const router = useRouter();

  useEffect(() => {
    try {
      const UserData = JSON.parse(
        localStorage.getItem("user") || "{}"
      ) as UserType;
      
      const signedInAt = Date.parse(UserData.signedInAt);
      if (signedInAt + UserData.expiredIn >= Date.now()) {
        localStorage.removeItem("user");
        return;
      }
      setUser(UserData);
      // console.log(UserData)
    } catch (error) {
      console.log(error);
    }
  }, []);

  function signUp() {
    console.log("sign Up");
  }

  const signIn = async (
    email: string,
    password: string,
    role: "admin" | "user"
  ) => {
    const res = await request({
      method: "POST",
      data: { email, password, role },
      url: `${API_ENDPOINT}/user/login`,
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    router.push("/admin/dashboard");
  };

  const logOut = async () => {
    try {
      await request({
        method: "POST",
        url: `${API_ENDPOINT}/user/logout`,
      });
      setUser({} as UserType);
      localStorage.removeItem("user");
      router.push("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  function setUser (user: UserType) {
    _setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  return (
    <userContext.Provider value={{ user, setUser, signIn, signUp, logOut }}>
      {children}
    </userContext.Provider>
  );
}
