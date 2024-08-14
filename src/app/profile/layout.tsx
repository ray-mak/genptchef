export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center mt-16 md:mt-0">
          {children}
        </div>
      </div>
    </>
  )
}
