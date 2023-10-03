import Image from 'next/image'
import React from 'react'

const Profile = ({name,image="/avatar.jpg",email,line=true}) => {

  return (
    <div className='flex gap-4  flex-col px-4 pt-8'>
      <div className='flex gap-2 items-center'>
        { <Image
          src={image}
          alt="User Photo"
          width={50}
          height={50}
          className='rounded-full'
        />}
      
        <div>
          <h2 className='text-md font-semibold '>{name}</h2>
          <p className='text-sm text-secondary'>{email}</p>
        </div>
      </div>
       {line && <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>}
    </div>
  )
}

export default Profile

