import React from 'react'
import Navbar from '../components/Navbar'
import { FloatingBackground } from '../components/floatingComponent'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
	<div className='h-screen w-full overflow-x-hidden'>
		<FloatingBackground/>
		<Navbar/>
		<Outlet/>
		<Footer/>
	</div>
  )
}

export default MainLayout