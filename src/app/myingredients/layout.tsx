import { NavLink, PublicNavbar } from "../components/PublicNavbar"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex">
        <div className="w-full mt-16 md:mt-0">{children}</div>
      </div>
    </>
  )
}
