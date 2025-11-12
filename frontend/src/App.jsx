import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignIn, SignInButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Welcome to the App</h1>

      {/* 👇 Only visible if user is signed OUT */}
      <SignedOut>
        <p>Please sign in to continue.</p>
        <SignInButton mode="modal">
          <button className="btn">Sign In</button>
        </SignInButton>
      </SignedOut>

      {/* 👇 Only visible if user is signed IN */}
      <SignedIn>
        <h2>You are logged in 🎉</h2>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  )
}

export default App
