import React from 'react'
import Navbar from '../components/Navbar'
import { FloatingBackground } from '../components/FloatingComponent'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
	<div className='w-full overflow-auto flex flex-col relative min-h-screen'>
		<FloatingBackground/>
		<Navbar/>
		<main className='flex w-full flex-grow'>
			<Outlet />
		</main>
		<Footer/>
	</div>
  )
}

export default MainLayout
