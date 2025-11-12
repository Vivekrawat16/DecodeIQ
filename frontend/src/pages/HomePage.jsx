import axios from 'axios'
import React from 'react'
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">HomePage</h1>

      {/* Show Login button when logged out */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn btn-primary">
            Login
          </button>
        </SignInButton>
      </SignedOut>

      {/* Show User Profile button when logged in */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}

export default HomePage;
