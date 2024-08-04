"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type IngredientProps = {
  ingredients: { seasonings: string[]; vegetables: string[]; meats: string[] }
  addIngredient: (ingredient: string) => void
}

export default function QuickIngredients({
  ingredients,
  addIngredient,
}: IngredientProps) {
  return (
    <div className="border-2 rounded-lg shadow-lg">
      <div className="bg-amber-600 p-2 rounded-t-lg">
        <p className="text-white">Quick Add Ingredients</p>
      </div>
      <div className="p-4 flex flex-col gap-y-6 max-h-80 overflow-auto">
        <div className="flex flex-col gap-2  border-2 p-2">
          <p className="text-lg font-medium w-full border-b-2">
            Seasoning, Sauces & Oils
          </p>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
            {ingredients.seasonings.map((item) => {
              return (
                <div key={item} className="flex">
                  <p className="bg-lime-600 opacity-80 rounded-l-lg p-1 px-2 text-white">
                    {item}
                  </p>
                  <div className="p-1 px-2 bg-lime-600 rounded-r-lg hover:cursor-pointer">
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#ffffff" }}
                      onClick={() => addIngredient(item)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-2 p-2">
          <p className="text-lg font-medium w-full border-b-2">
            Veggies, Greens & Legumes
          </p>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
            {ingredients.vegetables.map((item) => {
              return (
                <div key={item} className="flex">
                  <p className="bg-lime-600 opacity-80 rounded-l-lg p-1 px-2 text-white">
                    {item}
                  </p>
                  <div className="p-1 px-2 bg-lime-600 rounded-r-lg hover:cursor-pointer">
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#ffffff" }}
                      onClick={() => addIngredient(item)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2  border-2 p-2">
          <p className="text-lg font-medium w-full border-b-2">
            Meats, Fish & Dairy
          </p>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
            {ingredients.meats.map((item) => {
              return (
                <div key={item} className="flex">
                  <p className="bg-lime-600 opacity-80 rounded-l-lg p-1 px-2 text-white">
                    {item}
                  </p>
                  <div className="p-1 px-2 bg-lime-600 rounded-r-lg hover:cursor-pointer">
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#ffffff" }}
                      onClick={() => addIngredient(item)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
