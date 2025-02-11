import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
const SettingPage = () => {
  const {authUser}=useAuthStore();
  return (
    <div>
      SettingPage
    </div>
  )
}

export default SettingPage
