"use client"

import { CldUploadWidget } from "next-cloudinary"

export default function CommunityPage() {
  const handleUploadSuccess = (result: any) => {
    console.log(result)
  }

  return (
    <div>
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
