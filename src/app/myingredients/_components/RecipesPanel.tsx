"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CardState, Recipe } from "../page"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

type RecipesPanelProps = {
  viewList: boolean
  recipes: Recipe[] | undefined
  expandedCards: CardState[]
  toggleExpanded: (index: number) => void
}

export default function RecipesPanel({
  viewList,
  recipes,
  expandedCards,
  toggleExpanded,
}: RecipesPanelProps) {
  return (
    <div
      className={`recipe-panel flex flex-col gap-y-4 p-6 pb-32 md:pb-6 md:w-3/5 xl:w-3/4 overflow-y-scroll ${
        viewList ? "close-list" : "view-list"
      }`}
    >
      {!recipes && (
        <div className="w-3/5 m-auto">
          <img
            src="/recipeicon.png"
            alt="recipe icon"
            width={100}
            className="m-auto"
          />
          <p className="text-center text-2xl font-medium text-neutral-700 mt-6">
            Add ingredients and click "Generate Recipes" to get started. Every
            ingredient you add unlocks more unique recipes!
          </p>
        </div>
      )}
      {recipes &&
        recipes.map((item: Recipe, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col border-2 border-amber-600 rounded-lg p-6 shadow-lg"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div>
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-neutral-600">Cook time: {item.cookTime}</p>
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-auto transition-transform ${
                    expandedCards[index]?.open ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`recipe-card ${
                  expandedCards[index]?.open ? "expanded" : ""
                }`}
              >
                <div>
                  <div className="my-2">
                    <p className="text-lg font-semibold">Ingredients:</p>
                    {item.ingredients.map((ingredient) => {
                      return <p key={ingredient}>- {ingredient}</p>
                    })}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-lg font-semibold">Instructions: </p>
                    {item.instructions.map((instruction, index) => {
                      return (
                        <p key={index}>
                          {index + 1}. {instruction}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
