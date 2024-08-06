"use client"

export default function ButtonContainer({
  viewList,
  toggleViewList,
  getRecipes,
  loading,
}: {
  viewList: boolean
  toggleViewList: () => void
  getRecipes: () => void
  loading: boolean
}) {
  return (
    <div className="button-container flex gap-4 fixed md:w-2/5 xl:w-1/4 bottom-0 p-4 bg-neutral-100 border-2">
      <button
        onClick={getRecipes}
        className={`w-full text-white bg-lime-600 p-4 rounded-lg hover:opacity-80 ${
          loading ? "opacity-80" : "opacity-100"
        } ${viewList ? "block" : "hidden"}`}
        disabled={loading}
      >
        {loading ? "Generating Recipes..." : "Generate Recipes"}
      </button>
      <button
        type="button"
        className={`${
          viewList ? "w-1/2" : "w-full"
        } bg-neutral-500 text-white p-4 rounded-lg block md:hidden`}
        onClick={toggleViewList}
      >
        {viewList ? "View Recipes" : "View Ingredients"}
      </button>
    </div>
  )
}
