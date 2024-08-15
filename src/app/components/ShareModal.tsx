"use client"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CldUploadWidget } from "next-cloudinary"
import { Recipe } from "../myingredients/page"
import { useState } from "react"
import { addPostDB } from "../actions/postActions"

type ShareModalProps = {
  title: string
  recipe: Recipe
  hideModal: () => void
}

export default function ShareModal({
  title,
  recipe,
  hideModal,
}: ShareModalProps) {
  const [foodImage, setFoodImage] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const handleUploadSuccess = (result: any) => {
    const { secure_url } = result.info
    setFoodImage(secure_url)

    console.log(result)
  }

  const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const shareRecipe = async () => {
    const recipeData = {
      title: recipe.title,
      cookTime: recipe.cookTime,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      imageUrl: foodImage,
      notes,
    }

    try {
      const result = await addPostDB(recipeData)
      hideModal()
      console.log(result)
    } catch (error) {
      console.error("Error saving post:", error)
    }
  }

  return (
    <div className="w-full sm:w-auto flex flex-col gap-4 border w-fit p-6 bg-white rounded-lg">
      <div className="flex gap-4 border-b items-center py-2">
        <p>Share this recipe with the community!</p>
        <button
          onClick={hideModal}
          aria-label="Close share recipe panel"
          className="ml-auto"
        >
          <FontAwesomeIcon icon={faXmark} style={{ color: "#f74040" }} />
        </button>
      </div>
      <div className="w-full h-48 sm:w-96 sm:h-56 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          src={`${foodImage === "" ? "foodicon.png" : foodImage}`}
        />
      </div>
      <CldUploadWidget
        onSuccess={handleUploadSuccess}
        signatureEndpoint="/api/sign-image"
      >
        {({ open }) => {
          return (
            <button
              className="border border-neutral-400 py-1 rounded-md"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          )
        }}
      </CldUploadWidget>
      <p className="text-xl font-semibold max-w-96">{title}</p>
      <label htmlFor="notes">
        <p>Notes (optional):</p>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={handleNotes}
          rows={5}
          className="w-full border rounded-lg shadow-lg mt-1 p-2"
        />
      </label>
      <button
        type="button"
        onClick={shareRecipe}
        className="bg-lime-600 text-white p-2 rounded-lg hover:opacity-80"
      >
        Share Recipe
      </button>
    </div>
  )
}
