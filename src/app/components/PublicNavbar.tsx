"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode, useState } from "react"

export function PublicNavbar({ children }: { children: ReactNode }) {
  const [hamburgerMenu, setHamburgerMenu] = useState(false)

  function toggleHamburger() {
    setHamburgerMenu((prevState) => !prevState)
  }
  return (
    <nav className="navbar w-full h-20 bg-neutral-100 text-neutral-800 flex justify-center items-center p-4 md:p-0">
      <div className="w-full md:w-2/3 flex">
        <div className="flex">
          <img src="/logo.svg" alt="Logo" className="w-40" />
        </div>
        <div
          onClick={toggleHamburger}
          className={`hamburger ${hamburgerMenu ? "opened" : ""}`}
        >
          <span className="bar bg-neutral-950"></span>
          <span className="bar bg-neutral-950"></span>
          <span className="bar bg-neutral-950"></span>
        </div>
        <div className={`dimmer ${hamburgerMenu ? "opened" : ""}`}></div>
        <div
          className={`navmenu flex ml-auto ${hamburgerMenu ? "opened" : ""}`}
        >
          {children}
        </div>
      </div>
    </nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathName = usePathname()
  return (
    <Link
      {...props}
      className={`p-2 md:p-4 hover:opacity-80 ${
        pathName === props.href && "underline"
      }`}
    />
  )
}
