"use client"

import React, { useEffect, useState } from "react"
import IngredientInput from "./_components/IngredientInput"
import IngredientsList from "./_components/IngredientsList"
import RecipeStyle from "./_components/RecipeStyle"
import QuickIngredients from "./_components/QuickIngredients"
import commonIngredients from "../../../public/common_ingredients.json"
import ButtonContainer from "./_components/ButtonContainer"
import OpenAI from "openai"
import RecipesPanel from "./_components/RecipesPanel"
import {
  addIngredientDB,
  deleteIngredient,
  getIngredients,
} from "../actions/ingredientActions"
import { useAuth } from "@clerk/nextjs"
import { addRecipeDB } from "../actions/recipeActions"

export type Recipe = {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
  cookTime: string
}

export type CardState = {
  open: boolean
}

export default function MyIngredientsPage() {
  const { isSignedIn } = useAuth()

  const [recipeStyle, setRecipeStyle] = useState<string>("5")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [specialInstructions, setSpecialInstructions] = useState<string>("")
  const [viewList, setViewList] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<Recipe[]>()
  const [expandedCards, setExpandedCards] = useState<CardState[]>(
    (recipes || []).map(() => ({ open: false }))
  )

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // Functions to handle ingredient input/deletion for users vs guests.
  useEffect(() => {
    const fetchIngredients = async () => {
      if (isSignedIn) {
        try {
          const result = await getIngredients()
          if (result.error) {
            console.log(result.error)
          } else if (result.ingredientText) {
            setIngredients(result.ingredientText)
          }
        } catch (error) {
          console.error("Error fetching ingredients: ", error)
        }
      }
    }

    fetchIngredients()
  }, [isSignedIn])

  async function addIngredientToDB(ingredient: string) {
    try {
      const result = await addIngredientDB(ingredient)
      console.log(result)
    } catch (error) {
      console.error("Error adding ingredients: ", error)
    }
  }

  function handleAddIngredientClick() {
    const inputIngredient = inputValue.trim().toLowerCase()
    if (inputIngredient) {
      if (isSignedIn) {
        addIngredientToDB(inputIngredient)
      }
      addIngredientClient(inputIngredient)
      setInputValue("")
    }
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      const inputIngredient = inputValue.trim().toLowerCase()
      if (inputIngredient) {
        if (isSignedIn) {
          addIngredientToDB(inputIngredient)
        }
        addIngredientClient(inputIngredient)
        setInputValue("")
      }
    }
  }

  function quickAddIngredient(ingredient: string) {
    const inputIngredient = ingredient.trim().toLowerCase()
    if (inputIngredient) {
      if (isSignedIn) {
        addIngredientToDB(inputIngredient)
      }
      addIngredientClient(inputIngredient)
      setInputValue("")
    }
  }

  function addIngredientClient(ingredient: string) {
    if (ingredients.includes(ingredient)) {
      setInputValue("")
      return
    } else {
      setIngredients((prevData) => [...prevData, ingredient])
    }
  }

  function removeIngredient(ingredient: string) {
    const deleteIngredientFromDB = async () => {
      setIngredients(ingredients.filter((item) => item !== ingredient))
      if (isSignedIn) {
        try {
          const result = await deleteIngredient(ingredient)
          if (result.error) {
            console.log(result.error)
          } else {
            setIngredients(ingredients.filter((item) => item !== ingredient))
            console.log(result.message)
          }
        } catch (error) {
          console.error("Error deleting ingredient: ", error)
        }
      }
    }
    deleteIngredientFromDB()
  }

  //Handle input logic

  function recipeStyleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecipeStyle(e.target.value)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function updateInstructions(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSpecialInstructions(e.target.value)
  }

  function toggleViewList() {
    setViewList((prevState) => !prevState)
  }

  const filteredIngredients = {
    seasonings: commonIngredients.seasonings.filter(
      (item) => !ingredients.includes(item)
    ),
    vegetables: commonIngredients.vegetables.filter(
      (item) => !ingredients.includes(item)
    ),
    meats: commonIngredients.meats.filter(
      (item) => !ingredients.includes(item)
    ),
  }

  //openAI logic

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  async function getRecipes() {
    setLoading(true)
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a culinary expert with a talent for creating innovative and unique recipes. You will be given a number between 1 and 5 for creativity (creativityScale) when creating recipes. 1 represents clasic recipes using traditional ingredients like chicken curry with jasmine rice or beef stew. 5 represents the most innovative recipe ideas like mashed rice cakes with curry gravy and chicken, or a curry burger with tortillas. You do not have to use all the ingredients provided. Special requests may be included regarding the recipe, which will override these instructions if there are contradictions. Please provide 5 recipes that include the following details: title, ingredients, instructions, and cookTime. Please return the recipe in json format: {recipes: [{title: string, ingredients: string[], instructions: string[], cookTime: string}]}",
          },
          {
            role: "user",
            content: `{
            creativityScale : ${recipeStyle},
            ingredients: ${ingredients},
            specialRequests: ${specialInstructions}
          }`,
          },
        ],
        model: "gpt-4o-mini",
      })
      console.log(completion)
      // console.log(completion.choices[0].message.content)

      const jsonString =
        completion.choices[0].message.content
          ?.replace(/^```json\s*/, "")
          .replace(/```$/, "") || "{}"
      const jsonData = JSON.parse(jsonString)

      setRecipes(jsonData.recipes)
    } catch (error) {
      console.error("Error fetching recipe:", error)
    } finally {
      setLoading(false)
    }
  }

  function toggleExpanded(index: number) {
    setExpandedCards((prevState) =>
      prevState.map((card, i) =>
        i === index ? { ...card, open: !card.open } : card
      )
    )
  }

  useEffect(() => {
    setExpandedCards((recipes || []).map(() => ({ open: false })))
  }, [recipes])

  // saving and sharing recipes logic
  async function saveRecipeToDB(index: number) {
    if (recipes) {
      const { title, ingredients, instructions, cookTime } = recipes[index]
      if (isSignedIn) {
        try {
          const recipe = { title, ingredients, instructions, cookTime }
          const result = await addRecipeDB(recipe)
          console.log(result)
        } catch (error) {
          console.error("Error saving recipe:", error)
        }
      } else {
        alert("You must be signed in to save a recipe!")
      }
    }
  }

  function viewModal() {
    setModalVisible(true)
  }

  function hideModal() {
    setModalVisible(false)
  }

  console.log(recipes)
  return (
    <div className="main-container flex">
      <div
        className={`ingredient-panel md:w-2/5 xl:w-1/4 p-6 pb-32 flex flex-col gap-y-6 text-sm overflow-y-scroll ${
          viewList ? "view-list" : "close-list"
        }`}
      >
        <RecipeStyle
          recipeStyle={recipeStyle}
          recipeStyleChange={recipeStyleChange}
        />
        <label htmlFor="addIngredient" className="w-full">
          <p>Add Ingredients</p>
          <IngredientInput
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onAddClick={handleAddIngredientClick}
            onKeyDown={handleKeydown}
          />
        </label>
        <div className="border-2 rounded-lg shadow-lg">
          <div className="bg-amber-600 p-2 rounded-t-lg">
            <p className="text-white">My Ingredients</p>
          </div>
          <IngredientsList
            ingredients={ingredients}
            onRemove={removeIngredient}
          />
        </div>
        <label htmlFor="specialInstructions" className="flex flex-col">
          Special Requests
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={specialInstructions}
            onChange={updateInstructions}
            rows={5}
            className="border-2 rounded-lg shadow-lg mt-1 p-2"
          />
        </label>
        <QuickIngredients
          ingredients={filteredIngredients}
          addIngredient={quickAddIngredient}
        />
      </div>
      <ButtonContainer
        viewList={viewList}
        toggleViewList={toggleViewList}
        getRecipes={getRecipes}
        loading={loading}
      />
      <RecipesPanel
        viewList={viewList}
        recipes={recipes}
        expandedCards={expandedCards}
        toggleExpanded={toggleExpanded}
        saveRecipe={saveRecipeToDB}
      />
    </div>
  )
}
