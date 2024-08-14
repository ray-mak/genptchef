export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex">
        <div className="w-full flex justify-center mt-20 md:mt-0">
          {children}
        </div>
      </div>
    </>
  )
}
