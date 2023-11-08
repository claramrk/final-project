'use client';
import { CldUploadWidget } from 'next-cloudinary';

export default function UploadImageComponent() {
  return (
    <CldUploadWidget uploadPreset="a4hbvyuw">
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open();
        }
        return (
          <button className="button" onClick={handleOnClick}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
