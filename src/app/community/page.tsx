import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getPosts } from "../actions/postActions"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="md:w-2/3 mb-20">
      <h1 className="text-center text-2xl font-semibold my-8">
        Community Recipes
      </h1>
      <div className="grid p-6 sm:p-14 md:p-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <RecipeCard />
      </div>
    </div>
  )
}

async function RecipeCard() {
  const posts = await getPosts()
  const postData = posts.postsData
  if (postData) {
    return postData.map((post) => (
      <div className="h-auto shadow-2xl rounded-lg overflow-hidden">
        <div className="w-full h-auto aspect-video overflow-hidden">
          <img
            src={post.imageUrl}
            className="w-full h-full object-cover"
            alt={`Image of ${post.title}`}
          />
        </div>
        <div className="flex flex-col h-36 md:h-44 gap-2 p-4">
          <div className="flex-grow">
            <p className="text-base md:text-lg font-medium">{post.title}</p>
            <div className="flex gap-2 mt-2">
              <FontAwesomeIcon icon={faClock} className="w-4" />
              <p className="text-sm md:text-base">{post.cookTime}</p>
            </div>
          </div>
          <Link
            href={`/community/${post.id}`}
            className="mt-auto w-full text-center py-1 border-2 border-lime-600 text-lime-600 rounded-lg hover:text-white hover:bg-lime-600 text-sm md:text-base"
          >
            View Recipe
          </Link>
        </div>
      </div>
    ))
  }
}
