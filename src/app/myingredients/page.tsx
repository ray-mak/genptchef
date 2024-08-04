"use client"

import React, { useState } from "react"
import ingredientsList from "../../../public/ingredients.json"
import IngredientInput from "./_components/IngredientInput"
import IngredientsList from "./_components/IngredientsList"
import RecipeStyle from "./_components/RecipeStyle"
import QuickIngredients from "./_components/QuickIngredients"
import commonIngredients from "../../../public/common_ingredients.json"
import ButtonContainer from "./_components/ButtonContainer"

export default function MyIngredientsPage() {
  const [recipeStyle, setRecipeStyle] = useState<string>("5")
  const [ingredients, setIngredients] = useState<string[]>(ingredientsList)
  const [inputValue, setInputValue] = useState<string>("")
  const [specialInstructions, setSpecialInstructions] = useState<string>("")
  const [viewList, setViewList] = useState<boolean>(false)

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
          addIngredient={addIngredient}
        />
      </div>
      <ButtonContainer viewList={viewList} toggleViewList={toggleViewList} />
      <div className={`recipe-panel  ${viewList ? "close-list" : "view-list"}`}>
        <h1>This is for the recipe</h1>
      </div>
    </div>
  )
}
