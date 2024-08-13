"use client"

import { CldUploadWidget } from "next-cloudinary"
import ShareModal from "../components/ShareModal"

export default function CommunityPage() {
  const handleUploadSuccess = (result: any) => {
    console.log(result)
  }

  return (
    <div>
      <ShareModal />
      <CldUploadWidget
        signatureEndpoint="/api/sign-image"
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>
        }}
      </CldUploadWidget>
    </div>
  )
}
