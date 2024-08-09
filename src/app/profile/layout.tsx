export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="w-full flex justify-center">
        {children}
        <div className="max-w-7xl mt-16 md:mt-0"></div>
      </div>
    </>
  )
}
