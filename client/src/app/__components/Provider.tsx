"use client"
import UserContextProvider from '@/lib/userContext';
import { ReactNode } from 'react';

function Provider({children}:{children:ReactNode}) {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}

export default Provider