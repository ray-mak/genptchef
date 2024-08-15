import Link from "next/link"

export default function Home() {
  return (
    <div className="flex">
      <div className="landing mt-20 md:mt-0 w-full flex items-center justify-center">
        <div className="flex flex-col gap-8 bg-neutral-100 p-12 max-w-lg mx-8 items-center rounded-lg">
          <p className="text-xl md:text-3xl font-bold text-center">
            Endless Innovative Recipe Ideas from Your Pantry
          </p>
          <p className="text-center">
            Unleash the full potential of your ingredients. Generate unexpected,
            unique and delicious recipe ideas using what you already have.{" "}
          </p>
          <Link
            href="/myingredients"
            className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:opacity-80"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
