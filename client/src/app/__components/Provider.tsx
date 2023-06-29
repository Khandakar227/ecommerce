"use client"
import { request } from '@/lib';
import UserContextProvider from '@/lib/userContext';
import { ReactNode, useEffect } from 'react';

function Provider({children}:{children:ReactNode}) {
  useEffect(() => {
    // CSRF token request
    if(!localStorage.getItem("_csrf")) {
      request().then((res) => {
        localStorage.setItem("_csrf", res.data._csrf);
      });
    }
  }, [])
  
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}

export default Provider