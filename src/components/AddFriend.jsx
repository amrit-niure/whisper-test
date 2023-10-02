'use client'
import React from 'react'
import { Toaster, toast } from 'react-hot-toast';
import * as yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'


const AddFriend = () => {
  const handleAddFriend = async (values, onSubmitProps) => {
    try {
      const res = await axios.post('/api/friend/add/', values)
      toast.success(res.data?.message)
      onSubmitProps.resetForm()
    } catch (error) {
      console.log("Error Here ", error)
      toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
      onSubmitProps.resetForm()
    }
  }
  const emailValidition = yup.object().shape({
    email: yup.string().email().required("Required"),
  })


  return (
    <div>
      <Toaster />
       <Formik
      onSubmit={handleAddFriend}
      initialValues={{ email: '' }}
      validationSchema={emailValidition}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        resetForm,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit} className='flex flex-col' >
          <h2 className="text-lg font-semibold mb-2">Add Friend</h2>
          <input
            type="text"
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Add friend by email"
            className={`p-2 border-2 mb-2 outline-none ${touched.email && errors.email ? ' border-red-600' : ''}`}
          />
          <button className="bg-primary hover:bg-secondary text-white w-fit  py-2 px-4" >
            Add
          </button>
        </form>
      )}
    </Formik>




    </div>
  )
}

export default AddFriend