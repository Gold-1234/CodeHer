import React from 'react'
import { useAuthStore } from "../store/useAuthStore"

const LogoutButton = ({ children }) => {
  const { logout } = useAuthStore();

  const onLogout = async() => {
    console.log('logout');
    
    await logout();
  }

  return (
    <button className='btn bg-secondary text-amber-50' onClick={onLogout}>
      {children}
    </button>
  )
}

export default LogoutButton