'use client';
import { CldUploadWidget } from 'next-cloudinary';

export default function UploadImageComponent(props: any) {
  return (
    <CldUploadWidget
      uploadPreset="a4hbvyuw"
      onSuccess={async (result) => {
        await props.setImageInfo(result.info);
      }}
    >
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open();
        }
        return (
          <button className="button" onClick={handleOnClick}>
            Upload
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
