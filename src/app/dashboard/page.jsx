"use client"
import Image from 'next/image';
import React from 'react';
import { Sun } from '@/components/Icons';
import { useSession } from 'next-auth/react';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import AddFriend from '@/components/AddFriend';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { AlignRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  const [create, setCreate] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const { data, status } = useSession()
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today = today.toLocaleDateString("en-US", options);


  const createGroup = async () => {
    if (!create) return
    try {
      const response = await fetch('/api/group/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(create),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message); // Handle the success response
        setCreate('')
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      group: '',
      friend: '',
    },
    validationSchema: yup.object({
      group: yup.string().required('Group Name is required'),
      friend: yup.string().email('Invalid email address').required('Friend Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/group/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message); // Handle the success response
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }

        formik.resetForm();
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (

    <div className='px-8 py-8 flex flex-col text-sm gap-3 bg-light_bg h-full relative'>
      {showSidebar && <div className='absolute left-0 top-0 z-50 h-full'> <div 
      onClick={() => setShowSidebar(false)} 
      className='absolute -right-14 top-10 cursor-pointer bg-primary text-light_bg px-2 py-1'
      >
        Close
        </div> <Sidebar /></div>}
      {/* Good Morning Header */}
      <div className='flex items-center md:items-baseline justify-between'>
        <div className='flex items-center md:hidden gap-2' onClick={() => setShowSidebar(true)}>
        <AlignRight />
        </div>
        <div className='flex items-center md:items-baseline gap-2'>
          <Sun />
          <h1 className='text-big'>Good Morning, <b>{data?.user.name.split(' ')[0]}</b></h1>
        </div>
        <div className='text-sm text-right'>
          {today}
        </div>
      </div>
      {/* recent chats  */}
        <div className='w-full h-[2px] bg-slate-300 bg-opacity-50'></div>
      <div className='flex flex-col-reverse md:flex-col'>

        <div className=' flex flex-col'>
          <h2 className=" text-primary font-semibold">Recent Chats</h2>
          <div className='flex gap-4 py-4 bg-light_bg_chat px-4 cursor-pointer'>
            <div className='flex gap-2 items-center'>
              <Image
                src='/avatar.jpg'
                alt="User Photo"
                width={50}
                height={50}
                className='rounded-full'
              />
              <div>
                <h2 className='text-medium font-semibold '>Name</h2>
                <p className='text-small text-secondary'>Last message</p>
              </div>
            </div>

            <span className='ml-auto text-secondary flex items-center justify-center text-small'>2 mins ago</span>
          </div>
        </div>
        <div className='flex md:items-center gap-8 flex-col-reverse md:flex-row'>
          {/* left side */}
          <div className='flex flex-col gap-4 w-full md:w-1/3'>
            <AddFriend />
            <div className='flex flex-col' >
              <h2 className=" font-semibold mb-2">Create Group</h2>
              <input
                type='text'
                value={create}
                onChange={(e) => setCreate(e.target.value)}
                placeholder={"Group Name"}
                className="p-2 border border-gray-300 mb-2 outline-none"

              />
              <button className="bg-primary hover:bg-secondary text-white w-fit  py-2 px-4"
                onClick={createGroup}
              >
                Create
              </button>
            </div>
          </div>
          {/* divider */}
          <div className='w-[250px] h-[1px] md:w-[2px] md:h-[250px] bg-slate-300 bg-opacity-50'></div>

          {/* right side */}
          <div className='flex flex-col gap-4'>
            <div className="bg-primary text-white w-fit  py-2 px-4">
              Quote of the day
            </div>
            <div className='border-primary border-l-4 flex flex-col  max-w-[700px] bg-white p-2'>
              <BiSolidQuoteLeft className='md:text-lg text-primary' />
              <div className='px-4'>

                <h1 className='md:text-bigger  font-semibold text-primary'>- Winston Churchill</h1>
                <p className='text-secondary md:text-medium text-small'>
                  Success is not final, failure is not fatal: It is the courage to
                  continue that counts.
                </p>
              </div>
              <BiSolidQuoteRight className='self-end md:text-lg text-primary' />
            </div>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className='w-full h-[2px]  bg-slate-300 bg-opacity-50 my-4'></div>
      <div className='flex  gap-2 flex-col '>
        <h2 className='text-lg font-semibold text-primary'>Invite friends to your Group</h2>
        <form className='' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col md:w-1/3 '>
            <h2 className=" font-semibold mb-2">Group</h2>
            <input
              type='text'
              id='group'
              name='group'
              value={formik.values.group}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Group Name"
              className={`p-2 border border-gray-300 mb-2 outline-none ${formik.touched.group && formik.errors.group && "border-red-600"}`}
            />
            <h2 className=" font-semibold mb-2">Friend</h2>
            <input
              type='email'
              id='friend'
              name='friend'
              value={formik.values.friend}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Invite By email"
              className={`p-2 border border-gray-300 mb-2 outline-none ${formik.touched.friend && formik.errors.friend && "border-red-600"}`}
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white w-fit py-2 px-4"
          >
            Invite
          </button>
        </form>
      </div>
    </div>

  )
}

export default Dashboard


