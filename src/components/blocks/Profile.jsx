import Image from 'next/image'
import React from 'react'

const Profile = ({ name, image = "/avatar.jpg", email, line = true }) => {

  return (
    <div className='flex gap-2 flex-col  pt-2 md:pt-4 '>
      <div className='flex gap-2 items-center '>
        <div className='hidden md:flex'>
          <Image
            src={image}
            alt="User Photo"
            width={50}
            height={50}
            className='rounded-full'
          />
        </div>
        <div className='flex md:hidden'>
          <Image
            src={image}
            alt="User Photo"
            width={35}
            height={35}
            className='rounded-full'
          />
        </div>
        <div>
          <h2 className=' text-sm md:text-md font-semibold '>{name}</h2>
          <p className='text-xs md:text-sm text-secondary'>{email}</p>
        </div>
      </div>
      {line && <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>}
    </div>
  )
}

export default Profile

