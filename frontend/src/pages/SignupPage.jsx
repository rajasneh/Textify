import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
const SignupPage = () => {
  const {authUser}=useAuthStore();
  return (
    <div>
      SignupPage
    </div>
  )
}

export default SignupPage
