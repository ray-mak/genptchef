"use server"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

type Ingredient = {
  ingredient: string
}

//to do: check for duplicate ingredients. Delete ingredient. Ingredient input on frontend

export default async function addIngredientDB(ingredient: string) {
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
