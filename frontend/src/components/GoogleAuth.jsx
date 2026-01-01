import { useAuthStore } from "@/store/useAuthStore";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from '@react-oauth/google';

export const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
	onError: console.log('error occured'),
  });
  const { signinWithGoogle } = useAuthStore()
  return (
    <GoogleLogin
    	onSuccess={credentialResponse => {
    		signinWithGoogle(credentialResponse)
    	}}
    	onError={() => {
    		console.log('Login Failed');
    	}}
    />

  );
};
