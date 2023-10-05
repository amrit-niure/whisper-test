import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SidebarLoading = () => {
  return (
    <div className='px-4 py-6 max-h-[100vh] bg-light_bg w-full flex flex-col'>
    <SkeletonTheme baseColor='#e2e8f0' highlightColor="#F5F6F6">
      <div className='flex-1'>
        <div className=' flex gap-2 items-center'>
          <Skeleton height={'60px'} width={'60px'} borderRadius={'50%'} />
          <div>
            <Skeleton height={'20px'} width={'100px'} />
            <Skeleton height={'10px'} width={'200px'} />
          </div>
        </div>
        <Skeleton height={'1px'} width={'100%'} />
        <div className='flex flex-col gap-2'>
          <Skeleton height={'20px'} width={'100px'} />
          <div className='px-4 flex flex-col gap-2'>
            <Skeleton height={'24px'} width={'70%'} />
            <Skeleton height={'24px'} width={'70%'} />
          </div>
        </div>
        <div className='flex flex-col gap-2 py-4'>
          <Skeleton height={'20px'} width={'100px'} />
          <div className='px-4 flex flex-col gap-2'>
            <Skeleton height={'24px'} width={'70%'} />
            <Skeleton height={'24px'} width={'70%'} />
          </div>
        </div>
        <div className='flex flex-col gap-2 py-4'>
          <Skeleton height={'20px'} width={'100px'} />
          <div className='px-4 flex flex-col gap-2'>
            <Skeleton height={'24px'} width={'70%'} />
            <Skeleton height={'24px'} width={'70%'} />
          </div>
        </div>
      </div>
  
      <div className='px-4 flex flex-col gap-2'>
        <Skeleton height={'24px'} width={'50%'} />
        <Skeleton height={'24px'} width={'50%'} />
      </div>

    </SkeletonTheme>
  </div>
  )
}

export default SidebarLoading