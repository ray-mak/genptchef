import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CldUploadWidget } from "next-cloudinary"

export default function ShareModal() {
  return (
    <div className="flex flex-col gap-4 border w-fit p-6">
      <div className="flex gap-4 border-b items-center py-2">
        <p>Share this recipe with the community!</p>
        <button aria-label="Close share recipe panel" className="ml-auto">
          <FontAwesomeIcon icon={faXmark} style={{ color: "#f74040" }} />
        </button>
      </div>
      <div className="w-96 h-56 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dpjziksya/image/upload/v1723506819/fyguovvs5f42tdiq6h2c.jpg"
        />
      </div>
      <CldUploadWidget signatureEndpoint="/api/sign-image">
        {({ open }) => {
          return (
            <button
              className="border border-neutral-400 py-1 rounded-md"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          )
        }}
      </CldUploadWidget>
      <p className="text-xl font-semibold">Cumin-Spiced Chicken Pasta Salad</p>
      <label htmlFor="notes">
        <p>Notes (optional):</p>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          className="w-full border rounded-lg shadow-lg mt-1 p-2"
        />
      </label>
      <button
        type="button"
        className="bg-lime-600 text-white p-2 rounded-lg hover:opacity-80"
      >
        Submit Recipe
      </button>
    </div>
  )
}
