"use client"

import { CldUploadWidget } from "next-cloudinary"

export default function CommunityPage() {
  return (
    <CldUploadWidget uploadPreset="<Your Upload Preset>">
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>
      }}
    </CldUploadWidget>
  )
}
