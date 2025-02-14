import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar () {
    const [isOpen, setIsOpen] = useState(false);
    const {user, isAuthenticated} = useAuthContext();
    const navigate = useNavigate();

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleLoginClick =()=> {
      navigate('/login')
    }
    const handleLogout = () => {
      fetch('http://localhost:3000/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      credentials: "include",
      })
      .then((res) => res.json())
        .then(data => console.log('data', data))
        .catch((err) => console.error(err));
      };
    return(
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end h-16 items-center">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.username}`}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <p className="block px-4 py-2 text-sm text-gray-700 font-semibold">
                        {user.username}
                      </p>
                      <p className="block px-4 py-2 text-sm text-gray-500">
                        {user.email}
                      </p>
                    {isAuthenticated ? (
                      <div className="none"></div>
                    ): 
                      <button
                      onClick={handleLoginClick}
                      className="cursor-pointer w-full text-left block px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      >
                        Login
                      </button>
                    }

                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      );
    };