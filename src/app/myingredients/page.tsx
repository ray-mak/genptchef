"use client"

import React, { useState } from "react"
import ingredientsList from "../../../public/ingredients.json"
import IngredientInput from "./_components/IngredientInput"
import IngredientsList from "./_components/IngredientsList"
import RecipeStyle from "./_components/RecipeStyle"

export default function MyIngredientsPage() {
  const [recipeStyle, setRecipeStyle] = useState<string>("5")
  const [ingredients, setIngredients] = useState<string[]>(ingredientsList)
  const [inputValue, setInputValue] = useState<string>("")
  const [specialInstructions, setSpecialInstructions] = useState<string>("")

  function recipeStyleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecipeStyle(e.target.value)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleAddIngredientClick() {
    if (inputValue.trim()) {
      addIngredient(inputValue.trim().toLocaleLowerCase())
      setInputValue("")
    }
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputValue.trim()) {
        addIngredient(inputValue.trim().toLocaleLowerCase())
        setInputValue("")
      }
    }
  }

  function addIngredient(ingredient: string) {
    if (ingredients.includes(ingredient)) {
      setInputValue("")
      return
    } else {
      setIngredients((prevData) => [...prevData, ingredient])
    }
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  function updateInstructions(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSpecialInstructions(e.target.value)
  }

  console.log(recipeStyle)
  return (
    <div className="flex flex-col gap-y-6 text-sm">
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
        Special Instructions
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          value={specialInstructions}
          onChange={updateInstructions}
          rows={5}
          className="border-2 rounded-lg shadow-lg mt-1 p-2"
        />
      </label>
    </div>
  )
}
