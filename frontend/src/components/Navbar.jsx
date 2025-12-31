import React, { useState } from "react";
import { User, Code, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "../store/useAuthStore";


const Navbar = () => {
  
  const { authUser } = useAuthStore();
  const [ activeSection, setActiveSection ] = useState('Problems')

  return (
      <div className="navbar bg-base-100 w-full shadow backdrop-blur ">
        <div className="flex-1 flex-row flex items-center ">
          <Link className="flex flex-row items-center m-4" to={'/'}> 
          <img src="codeher.svg" alt="" className="h-8 w-8 " />
          <p className="btn btn-ghost text-3xl pointer-events-none montserrat-bold dark:text-white -ml-2">
          CodeHer
          </p> 
          </Link>

          <div className="ml-8 flex items-stretch gap-10">
          
            <button 
              className={`btn text-lg rounded-4xl hover:border-secondary ${ activeSection === "Problems" ? "btn-active border-secondary" : "btn-ghost"}`}
              onClick={() => setActiveSection("Problems")}
            >
              <Link to="/home">Problems</Link>
            </button>
            <button className={`btn text-lg rounded-4xl hover:border-secondary ${ activeSection === "Sets" ? "btn-active" : "btn-ghost"}`}
              onClick={() => setActiveSection("Sets")}>
                <Link to="/home/sets">
                Sets
                </Link>
              </button>
            
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
                  src={authUser?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                  className="object-cover"

                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/home/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              {
                authUser?.role === "ADMIN" && (
                  <li>
                    <Link to="/home/add-problem"
                      className="">
                        Add Problem
                      </Link>
              </li>
                )
              }
        
              
              <li>
                <LogoutButton className="hover:bg-warning hover:text-white">Logout</LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};


export default Navbar
