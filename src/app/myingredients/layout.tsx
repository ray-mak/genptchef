import { NavLink, PublicNavbar } from "../components/PublicNavbar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <PublicNavbar>
        <NavLink href="/myingredients">My Ingredients</NavLink>
        <NavLink href="/community">Community</NavLink>
        <NavLink href="/profile">Profile</NavLink>
      </PublicNavbar>
      <div className="flex">
        <div className="w-full p-4 md:w-2/3 mx-auto my-20 md:my-6">
          {children}
        </div>
      </div>
    </>
  )
}
