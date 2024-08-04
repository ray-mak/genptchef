"use client"

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type IngredientsListProps = {
  ingredients: string[]
  onRemove: (index: number) => void
}

export default function IngredientsList({
  ingredients,
  onRemove,
}: IngredientsListProps) {
  return (
    <div className="p-4 flex flex-wrap gap-2 max-h-40 overflow-auto">
      {ingredients.map((item, index) => {
        return (
          <div key={item} className="flex">
            <p className="bg-lime-600 opacity-80 rounded-l-lg p-1 px-2 text-white">
              {item}
            </p>
            <div
              onClick={() => onRemove(index)}
              className="p-1 px-2 bg-lime-600 rounded-r-lg hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff" }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
