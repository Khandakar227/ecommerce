import Aside from "./__components/Aside";

export const metadata = {
    title: 'Dashboard - Admin',
    description: 'Admin panel',
  }
  
  function RootLayout(props: React.PropsWithChildren) {
    return (
      <div className="flex p-4 gap-4 items-start">
        <Aside />
        <div className="w-full mx-auto max-w-5xl"> {props.children} </div>
      </div>
    )
  }
  
  export default RootLayout;