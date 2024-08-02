"use client"

import React, { useState } from "react"
import ingredientsList from "../../../public/ingredients.json"
import IngredientInput from "./_components/IngredientInput"
import IngredientsList from "./_components/IngredientsList"

export default function MyIngredientsPage() {
  const [ingredients, setIngredients] = useState<string[]>(ingredientsList)
  const [inputValue, setInputValue] = useState<string>("")

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

  return (
    <div className="flex flex-col gap-y-4 text-sm">
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
    </div>
  )
}
