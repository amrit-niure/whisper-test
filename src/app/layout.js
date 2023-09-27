import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Socket IO Chat App',
  description: 'Amrit Niure Chat App - Wishper',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}  >
      <Provider>{children}</Provider></body>
    </html>
  )
}
