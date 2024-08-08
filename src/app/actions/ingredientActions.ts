"use server"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

//to do: fix addIngredient function on page

export async function getIngredients(): Promise<{
  ingredientText?: string[]
  error?: string
}> {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }

  try {
    const ingredients = await db.ingredient.findMany({
      where: { userId },
    })
    const ingredientText = ingredients.map((item) => item.text)
    return { ingredientText }
  } catch (error) {
    return { error: "Error fetching ingredients" }
  }
}

export async function addIngredientDB(ingredient: string) {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }

  try {
    const duplicate = await db.ingredient.findFirst({
      where: { text: ingredient, userId },
    })

    if (duplicate) {
      return { error: "Ingredient already exists for this user" }
    }

    const ingredientData = await db.ingredient.create({
      data: {
        text: ingredient,
        userId,
      },
    })

    revalidatePath("/")
    return { data: `${ingredientData.text} saved!` }
  } catch (error) {
    return { error: "Ingredient not added" }
  }
}

export async function deleteIngredient(ingredient: string): Promise<{
  message?: string
  error?: string
}> {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }
  try {
    const foundIngredient = await db.ingredient.findFirst({
      where: { text: ingredient, userId },
    })

    if (foundIngredient) {
      await db.ingredient.delete({
        where: { id: foundIngredient.id },
      })
    } else {
      return { error: "Ingredient for user not found" }
    }

    return { message: `${foundIngredient.text} deleted for user ${userId}` }
  } catch (error) {
    return { error: "Ingredient not deleted" }
  }
}
