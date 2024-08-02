"use client"

import React, { useState } from "react"
import ingredientsList from "../../../public/ingredients.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

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
  console.log(inputValue)
  return (
    <div className="flex flex-col gap-y-4 text-sm">
      <label htmlFor="addIngredient" className="w-full">
        <p>Add Ingredients</p>
        <div className="w-full flex gap-4 mt-1">
          <input
            id="addIngredient"
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter an ingredient"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeydown}
          />
          <button
            onClick={handleAddIngredientClick}
            className="flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:opacity-80 hover:cursor-pointer"
          >
            Add
          </button>
        </div>
      </label>
      <div className="border-2 rounded-lg shadow-lg">
        <div className="bg-amber-600 p-2 rounded-t-lg">
          <p className="text-white">My Ingredients</p>
        </div>
        <div className="p-4 flex flex-wrap gap-x-6 gap-y-4 max-h-40 overflow-auto">
          {ingredients.map((item, index) => {
            return (
              <div key={item} className="flex">
                <p className="bg-lime-600 opacity-80 rounded-l-lg p-1 px-2 text-white">
                  {item}
                </p>
                <div
                  onClick={() => removeIngredient(index)}
                  className="p-1 px-2 bg-lime-600 rounded-r-lg hover:cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#ffffff" }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
