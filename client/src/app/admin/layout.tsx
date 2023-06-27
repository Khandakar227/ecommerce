import Nav from "@/app/admin/__components/Nav"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Admin',
    description: 'Admin panel',
}

function RootLayout(props: React.PropsWithChildren) {
  return (
    <>
        <Nav/>
        <main className="p-4">
          {props.children}
        </main>
    </>
  )
}

export default RootLayout;