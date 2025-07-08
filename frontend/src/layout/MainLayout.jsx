import React from 'react'
import Navbar from '../components/Navbar'
import { FloatingBackground } from '../components/floatingComponent'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
	<div className='w-full overflow-x-hidden relative min-h-screen flex-col'>
		<FloatingBackground/>
		<Navbar/>
		<main className='flex-1'>
			<Outlet />
		</main>
		<Footer/>
	</div>
  )
}

export default MainLayout