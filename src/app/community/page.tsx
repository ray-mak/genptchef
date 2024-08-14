import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getPosts } from "../actions/postActions"
import { faClock } from "@fortawesome/free-regular-svg-icons"

export default function CommunityPage() {
  return (
    <div>
      <h1>Community Recipes</h1>
      <div className="grid grid-cols-4 gap-4">
        <RecipeCard />
      </div>
    </div>
  )
}

async function RecipeCard() {
  const posts = await getPosts()
  console.log(posts)
  const postData = posts.postsData
  if (postData) {
    return postData.map((post) => (
      <div className="shadow-2xl rounded-lg overflow-hidden">
        <div className="w-full h-auto aspect-video overflow-hidden">
          <img src={post.imageUrl} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-lg font-medium">{post.title}</p>
          <div className="flex gap-2">
            <FontAwesomeIcon icon={faClock} className="w-4" />
            <p>{post.cookTime}</p>
          </div>
          <button
            type="button"
            className="mt-2 border-2 border-2 border-lime-600 text-lime-600 rounded-lg hover:text-white hover:bg-lime-600"
          >
            View Recipe
          </button>
        </div>
      </div>
    ))
  }
}
