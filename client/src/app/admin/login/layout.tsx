export const metadata = {
  title: 'Login - Admin',
  description: 'Login as Admin',
}

function RootLayout(props: React.PropsWithChildren) {
  return (
    <div className="p-4">
        {props.children}
    </div>
  )
}

export default RootLayout;