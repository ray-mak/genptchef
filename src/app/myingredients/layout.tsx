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
        <div className="w-full mt-16 md:mt-0">{children}</div>
      </div>
    </>
  )
}
