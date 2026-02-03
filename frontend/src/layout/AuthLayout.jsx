import { Outlet } from 'react-router-dom';
import { FloatingBackground } from '../components/FloatingComponent';
import ModelViewer from '../components/ModelViewer';

const AuthLayout = () => {
  return (
    <div className='h-screen w-screen items-center justify-center  relative'>
		<FloatingBackground/>
		<div className='h-screen w-screen grid grid-cols-2 items-center overflow-hidden' >
			<Outlet/>
			<ModelViewer className='z-50'/>
		</div>
	</div>
  );
};

export default AuthLayout;
