"use client"
import {SessionProvider} from 'next-auth/react'
import React from 'react'
import { Provider } from "react-redux";
import {store} from '@/state/store'

const Providers = ({children}) => {
  return (
    <div>
      <Provider  store={store}>
        <SessionProvider>{children}</SessionProvider>
        </Provider>
    </div>
  )
}

export default Providers
