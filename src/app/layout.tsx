import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { NavLink, PublicNavbar } from "./components/PublicNavbar"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Recipe Generator",
  description: "Generate recipes based on your ingredients",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className}`}>
          <PublicNavbar>
            <NavLink href="/myingredients">My Ingredients</NavLink>
            <NavLink href="/community">Community</NavLink>
            <SignedIn>
              <NavLink href="/profile">Profile</NavLink>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 mx-2 md:my-auto bg-lime-600 text-white rounded-lg hover:opacity-80">
                  Login
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 mx-2 md:my-auto border-2 border-lime-600 rounded-lg hover:bg-lime-600 hover:text-white hover:opacity-80">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </PublicNavbar>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
