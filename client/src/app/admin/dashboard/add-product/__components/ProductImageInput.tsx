"use client"
import { ChangeEvent, useRef } from 'react';
import { HiPhotograph } from 'react-icons/hi';

function ProductImageInput() {
    const imageRef = useRef({} as HTMLInputElement);
    const handleClick = () => {
        imageRef.current.click();
    }
    const handlePhotoUpload = (e:ChangeEvent) => {

    }
  return (
    <div>
        <p className="text-sm font-medium pr-4 pb-4"> Photos of your product </p>
        <div className="p-4 rounded-lg shadow">
            <div onClick={handleClick} className="border-dashed border-2 cursor-pointer py-10 text-center text-gray-400 hover:text-gray-700 transition-all">
                <div className='mx-auto w-full flex justify-center items-center'><HiPhotograph size={80}/></div>
                <p className="text-lg font-medium"> Click here to upload your product images </p>
            </div>
            <input onChange={handlePhotoUpload} ref={imageRef} type="file" name="imageSrc" id="imageSrc" className='hidden' />
        </div>
    </div>
  )
}

export default ProductImageInput