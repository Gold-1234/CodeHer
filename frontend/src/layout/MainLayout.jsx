import React from 'react'
import Navbar from '../components/Navbar'
import { FloatingBackground } from '../components/floatingComponent'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
	<div className='w-full overflow-auto flex flex-col'>
		<FloatingBackground/>
		<Navbar/>
		<main className='flex w-full'>
			<Outlet />
		</main>

		<Footer/>
	</div>
  )
}

export default MainLayout