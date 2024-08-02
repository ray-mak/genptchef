"use client"

type IngredientInputProps = {
  inputValue: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function IngredientInput({
  inputValue,
  onInputChange,
  onAddClick,
  onKeyDown,
}: IngredientInputProps) {
  return (
    <div className="w-full flex gap-4 mt-1">
      <input
        id="addIngredient"
        className="w-full p-2 rounded-lg border-2"
        placeholder="Enter an ingredient"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={onAddClick}
        className="flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:opacity-80 hover:cursor-pointer"
      >
        Add
      </button>
    </div>
  )
}
