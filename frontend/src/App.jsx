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
     <div className="App">
      <h1>Welcome to the App</h1>

      {/* 👇 Shown when user is signed out */}
      <SignedOut>
        <p>Please sign in to continue.</p>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      </SignedOut>

      {/* 👇 Shown when user is signed in */}
      <SignedIn>
        <h2>You are logged in 🎉</h2>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  )
}

export default App
