import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
const HomePage = () => {
  const {authUser}=useAuthStore();
  return (
    <div>
      HomePage
    </div>
  )
}

export default HomePage
