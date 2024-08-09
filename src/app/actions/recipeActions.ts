"use server"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

type MyRecipeProps = {
  id: string
  title: string
  cookTime: string
  ingredients: string[]
  instructions: string[]
}

type AddRecipeProps = {
  title: string
  cookTime: string
  ingredients: string[]
  instructions: string[]
}

export async function getSavedRecipes(): Promise<{
  myRecipes?: MyRecipeProps[]
  error?: string
}> {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }

  try {
    const userRecipes = await db.recipe.findMany({
      where: { userId },
    })
    const myRecipes = userRecipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        cookTime: recipe.cookTime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      }
    })

    return { myRecipes }
  } catch (error) {
    return { error: "Error fetching user recipes" }
  }
}

export async function addRecipeDB(
  recipe: AddRecipeProps
): Promise<{ message?: string; error?: string }> {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }

  try {
    const recipeData = await db.recipe.create({
      data: {
        userId,
        title: recipe.title,
        cookTime: recipe.cookTime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      },
    })

    return { message: `${recipeData.title} saved!` }
  } catch (error) {
    return { error: "Recipe not saved" }
  }
}

export async function deleteRecipeDB(
  id: string
): Promise<{ message?: string; error?: string }> {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }

  if (!id) {
    return { error: "Missing recipe id" }
  }

  try {
    const foundRecipe = await db.recipe.findUnique({
      where: { id },
    })

    if (foundRecipe) {
      await db.recipe.delete({ where: { id } })
    } else {
      return { error: "Recipe for user not found" }
    }
    revalidatePath("/")
    return { message: `${foundRecipe.title} deleted` }
  } catch (error) {
    return { error: "Recipe not deleted" }
  }
}
