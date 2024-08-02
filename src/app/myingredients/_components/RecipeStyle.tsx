"use client"

type RecipeStyleProps = {
  recipeStyle: string
  recipeStyleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RecipeStyle({
  recipeStyle,
  recipeStyleChange,
}: RecipeStyleProps) {
  return (
    <fieldset className="slider-container grid grid-cols-5 w-full relative">
      <div className="green-bar"></div>
      <legend className="mb-4">Recipe Style</legend>
      <label
        htmlFor="style-1"
        className="slider-label flex flex-col items-center justify-center"
      >
        <input
          type="radio"
          id="style-1"
          name="recipeStyle"
          value="1"
          checked={recipeStyle === "1"}
          onChange={recipeStyleChange}
          className="slider-input"
        />
        <div></div>
        <p className="mt-4">Classic</p>
      </label>
      <label
        htmlFor="style-2"
        className="slider-label flex flex-col items-center justify-center"
      >
        <input
          type="radio"
          id="style-2"
          name="recipeStyle"
          value="2"
          checked={recipeStyle === "2"}
          onChange={recipeStyleChange}
          className="slider-input"
        />
        <div></div>
        <p className="opacity-0 mt-4">2</p>
      </label>
      <label
        htmlFor="style-3"
        className="slider-label flex flex-col items-center justify-center"
      >
        <input
          type="radio"
          id="style-3"
          name="recipeStyle"
          value="3"
          checked={recipeStyle === "3"}
          onChange={recipeStyleChange}
          className="slider-input"
        />
        <div></div>
        <p className="opacity-0 mt-4">3</p>
      </label>
      <label
        htmlFor="style-4"
        className="slider-label flex flex-col items-center justify-center"
      >
        <input
          type="radio"
          id="style-4"
          name="recipeStyle"
          value="4"
          checked={recipeStyle === "4"}
          onChange={recipeStyleChange}
          className="slider-input"
        />
        <div></div>
        <p className="opacity-0 mt-4">4</p>
      </label>
      <label
        htmlFor="style-5"
        className="slider-label flex flex-col items-center justify-center"
      >
        <input
          type="radio"
          id="style-5"
          name="recipeStyle"
          value="5"
          checked={recipeStyle === "5"}
          onChange={recipeStyleChange}
          className="slider-input"
        />
        <div></div>
        <p className="mt-4">Innovative</p>
      </label>
    </fieldset>
  )
}
