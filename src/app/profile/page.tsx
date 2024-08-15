"use client"
import { useAuth } from "@clerk/nextjs"
import { Recipe } from "../myingredients/page"
import { useEffect, useState } from "react"
import { deleteRecipeDB, getSavedRecipes } from "../actions/recipeActions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowUpFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import ShareModal from "../components/ShareModal"
import Link from "next/link"

export default function ProfilePage() {
  const { isSignedIn } = useAuth()

  const [myRecipes, setMyRecipes] = useState<Recipe[]>([])
  const [recipe, setRecipe] = useState<Recipe | null>()
  const [recipeVisible, setRecipeVisible] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    const fetchRecipes = async () => {
      if (isSignedIn) {
        try {
          const result = await getSavedRecipes()
          if (result.error) {
            console.log(result.error)
          } else if (result.myRecipes) {
            setMyRecipes(result.myRecipes)
          }
        } catch (error) {
          console.error("Error fetching recipes: ", error)
        }
      }
    }
    fetchRecipes()
  }, [isSignedIn])

  async function deleteSavedRecipe(id: string) {
    const recipeToDelete = myRecipes.find((recipe) => recipe.id === id)
    const recipeToDeleteIndex = myRecipes.findIndex(
      (recipe) => recipe.id === id
    )
    if (!recipeToDelete) return console.error("Recipe not found")

    setMyRecipes(myRecipes.filter((recipe) => recipe.id !== id))
    try {
      const result = await deleteRecipeDB(id)
      console.log(result)
    } catch (error) {
      const updatedRecipes = [...myRecipes]
      updatedRecipes.splice(recipeToDeleteIndex, 0, recipeToDelete)
      setMyRecipes(updatedRecipes)
      console.error("Error deleting recipe: ", error)
    }
  }

  function showRecipe(index: number) {
    setRecipe(myRecipes[index])
    setRecipeVisible(true)
  }

  function closeRecipe() {
    setRecipeVisible(false)
  }

  function viewModal() {
    setModalVisible(true)
  }

  function hideModal() {
    setModalVisible(false)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="border p-2 bg-lime-600 mt-12 rounded-md md:min-w-96">
          <p className="text-white font-medium text-lg p-2 text-center">
            Saved Recipes
          </p>
          <div className="bg-white rounded-md">
            {myRecipes.map((recipe, index) => {
              return (
                <div
                  key={recipe.id}
                  className={`flex p-2 gap-12 ${
                    index % 2 ? "bg-neutral-200" : ""
                  }`}
                >
                  <button
                    onClick={() => showRecipe(index)}
                    aria-label="Show recipe details"
                  >
                    {recipe.title}
                  </button>
                  <button
                    onClick={() => deleteSavedRecipe(recipe.id)}
                    className="ml-auto cursor-pointer"
                    aria-label="Delete recipe"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: "#f74040" }}
                    />
                  </button>
                </div>
              )
            })}
            {myRecipes.length < 1 && (
              <div className="p-6 m-auto max-w-lg">
                <img
                  src="/recipeicon.png"
                  alt="recipe icon"
                  width={100}
                  className="m-auto"
                />
                <p className="mt-6 text-center">
                  You do not have any saved recipes. Generate some recipes in
                  the{" "}
                  <Link href="/myingredients" className="underline">
                    My Ingredients
                  </Link>{" "}
                  page and save them first!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {recipe && recipeVisible && (
        <div className="absolute top-28 w-full flex justify-center">
          <div className="max-w-3xl relative bg-white p-6 border rounded-lg shadow-lg">
            <button onClick={closeRecipe} className="absolute right-4 top-4">
              <FontAwesomeIcon icon={faXmark} style={{ color: "#f74040" }} />
            </button>
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-xl">{recipe.title}</p>
              <button
                className="px-2 py-1 rounded-md"
                aria-label="Share recipe"
                onClick={viewModal}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </button>
            </div>
            <p className="text-neutral-600 text-left">{recipe.cookTime}</p>
            <p className="text-lg font-semibold mt-2">Ingredients:</p>
            {recipe.ingredients.map((ingredient) => {
              return <p key={ingredient}>- {ingredient}</p>
            })}
            <div className="flex flex-col gap-y-2 mt-2">
              <p className="text-lg font-semibold">Instructions: </p>
              {recipe.instructions.map((instruction, index) => {
                return (
                  <p key={index}>
                    {index + 1}. {instruction}
                  </p>
                )
              })}
            </div>
          </div>
          {modalVisible && (
            <div className="absolute">
              <div className="relative z-5">
                <ShareModal
                  title={recipe.title}
                  hideModal={hideModal}
                  recipe={recipe}
                />
              </div>
              <div className="w-full h-full fixed top-0 left-0 opacity-70 bg-black z-4"></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
