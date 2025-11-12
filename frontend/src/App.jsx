import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <h1>Welcome to the app</h1>
   <SignInButton mode='modal'/>
    </>
  )
}

export default App
