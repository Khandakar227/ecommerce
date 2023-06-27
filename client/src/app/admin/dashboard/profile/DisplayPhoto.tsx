"use client"
import { AiFillCamera } from 'react-icons/ai'
import { getDPName } from "@/lib"
import { useUser } from "@/lib/userContext"
import { ChangeEvent, useRef } from 'react';

function DisplayPhoto() {
    const imageRef = useRef({} as HTMLInputElement);
    const { user } = useUser();

    const handleClick = () => {
        imageRef.current.click();
    }
    const handlePhotoUpload = (e:ChangeEvent) => {

    }
    return (
        <>
        <h3 className="py-2 text-lg font-medium">Profile picture</h3>
        <div onClick={handleClick} className="bg-white p-3 text-center rounded-full max-w-xs shadow relative select-none cursor-pointer">
            {
                !user.displayPhoto ? 
                <span className="grid justify-center items-center bg-green-400 text-9xl font-semibold p-8 rounded-full aspect-square">
                    {getDPName(user.name)}
                </span>
                :
                <img src={user.displayPhoto} alt={user.name} />
            }
            <span className='absolute bottom-[10%] left-[8%] text-green-950'>
                <AiFillCamera size={50}/>
            </span>
        </div>
        <input onChange={handlePhotoUpload} className='hidden' type="file" name="photo" accept="image/*" ref={imageRef} />
        </>
  )
}

export default DisplayPhoto