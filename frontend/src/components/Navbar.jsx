import React from "react";
import { User, Code, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "../store/useAuthStore";


const Navbar = () => {
  
  const { authUser } = useAuthStore();

  return (
    <>
    {/* text-[#dc989b] */}
      <div className="navbar bg-base-100 w-screen">
        <div className="flex-1 flex-row flex items-center ">
          <Link className="flex flex-row items-center m-4"> 
          <img src="codeher.svg" alt="" className="h-8 w-8 " />
          <p className="btn btn-ghost text-3xl pointer-events-none montserrat-bold text-white -ml-2">
          CodeHer
          </p> 
          </Link>

          <div className="ml-8 flex items-stretch gap-10">
          
            <button className="btn btn-ghost text-lg" >
              <Link to="/problems">Problems</Link>
            </button>
            <button className="btn btn-ghost text-lg"><Link to="/sets">Sets</Link></button>
            <button className="btn btn-ghost text-lg"><Link to="/dashboard">Dashboard</Link></button>
            
        </div>
        </div>

        
        
        <div className="flex-none">
          
          <div className="dropdown dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={authUser?.image || "https://avatar.iran.liara.run/public/girl"}
                  className="object-cover"

                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                 
                </a>
              </li>
              {
                authUser?.role === "ADMIN" && (
                  <li>
                    <Link to="/add-problem"
                      className="">
                        Add Problem
                      </Link>
              </li>
                )
              }
              <li>
                <a>Settings</a>
              </li>
              
              <li>
                <LogoutButton className="hover:bg-warning hover:text-white">Logout</LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar