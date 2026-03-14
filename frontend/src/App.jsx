import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { GoogleOAuthProvider } from '@react-oauth/google';

import LoginPage from "./page/LoginPage";
import { HomePage } from "./page/HomePage";
import SignupPage from "./page/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";
import { LandingPage } from "./page/LandingPage";
import { ProblemPage } from "./page/ProblemPage";
import { SetsPage } from "./page/SetsPage";
import { ListPage } from "./page/ListPage";
import { ProfilePage } from "./page/ProfilePage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>

    <div className="flex flex-col items-center justify-start dark:text-white w-full h-screen overflow-auto">
      <Toaster />
      <Routes>
        {/* Root - Landing Page */}
        <Route path="/" element={authUser ? <Navigate to="/home" replace/>: <LandingPage/>} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/home" replace /> : <LoginPage/> }
          />
          <Route
            path="/signup"
            element={
              authUser ? <Navigate to="/home" replace /> : <SignupPage />
            }
          />
        </Route>
        


        {/* Protected routes */}
        <Route path="/home" element={authUser ? <MainLayout /> : <Navigate to="/login" replace/>}>
          <Route
            index
            element={
              authUser ? (
                <HomePage user={authUser} />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route path="sets" element={<SetsPage />} />
          <Route path="list/:id" element={<ListPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route element={<AdminRoute />}>
            <Route path="add-problem" element={<AddProblem />} />
          </Route>
          <Route path="landing" element={<LandingPage />} />
        </Route>

        {/* Problem routes */}
        <Route path="problem/id/:id" element={<ProblemPage />} />
        <Route path="problem/edit/:id" element={<AddProblem />} />
      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
