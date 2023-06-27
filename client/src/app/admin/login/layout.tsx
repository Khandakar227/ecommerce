"use client"
import { useUser } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata = {
  title: 'Login - Admin',
  description: 'Login as Admin',
}

function LoginLayout(props: React.PropsWithChildren) {
  return (
    <div className="p-4">
        {props.children}
    </div>
  )
}

export default LoginLayout;