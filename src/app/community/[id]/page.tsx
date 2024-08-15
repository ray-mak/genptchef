import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function RecipePage({
  params: { id },
}: {
  params: { id: string }
}) {
  console.log(id)
  const post = await db.post.findUnique({ where: { id } })
  if (post === null) return notFound()
  console.log(post)

  return (
    <div className="max-w-2xl border my-8">
      <div className="w-full aspect-video">
        <img
          src={post.imageUrl}
          alt={`Picture of ${post.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <div className="flex">
          <p>by {post.name}</p>
          <p className="ml-auto">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="border-y pt-2 pb-4">
          <p className="text-lg font-medium mb-2">Ingredients</p>
          {post.ingredients.map((ingredient) => (
            <p key={ingredient}>- {ingredient}</p>
          ))}
        </div>
        <p className="text-lg font-medium">Instructions</p>
        <div className="flex flex-col gap-2">
          {post.instructions.map((step, index) => (
            <p key={index}>
              {index + 1}. {step}
            </p>
          ))}
        </div>
        {post.notes !== "" && (
          <div className="mt-4">
            <p className="text-lg font-medium">User Notes</p>
            <p className="italic">{post.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
