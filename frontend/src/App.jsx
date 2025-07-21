import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

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
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    console.log( "authUser", authUser);
    
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
    <div className="flex flex-col items-center justify-start dark:text-white w-full h-screen overflow-auto">
      <Toaster />
      <Routes>

        <Route path="/"
          element={
            authUser ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }/>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/home" replace /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={
              authUser ? <Navigate to="/home" replace /> : <SignupPage />
            }
          />
        </Route>

        <Route path="/home" element={<MainLayout />}>

          <Route
            index
            element={
              authUser ? <HomePage /> : <Navigate to={"/login"} replace />
            }
          />

          <Route element={< AdminRoute />}>
            <Route 
              path="add-problem"
              element={<AddProblem/>}
            />
          </Route>
        
          <Route 
              path="landing"
              element={<LandingPage/>}
          />
        </Route>

         <Route
            path={`problem/id/:id`}
            element={<ProblemPage/>}
          />
        
        
      </Routes>
    </div>
  );
}

export default App;
