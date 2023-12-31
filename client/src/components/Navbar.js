import React, { useEffect } from 'react';
import Login from '../pages/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from "../images/logo.png"

export default function Navbar() {
    const [state, setState] = useState(false)
    const { logout } = useLogout()

    const { user } = useAuthContext();
    const handleClick = () => {
        logout()
    }

    return (
        <nav className="bg-gray-800 w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to='/dash'>
                        <img
                            src={logo}
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </Link>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        <li className="text-gray-100 hover:text-indigo-600">
                            <Link to='/'><button className='inline-block rounded-full border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>Home</button></Link>
                        </li>
                        {user?.publisher && <li className="text-gray-100 hover:text-indigo-600">
                            <Link to='/publisher'><button className='inline-block rounded-full border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>Publisher</button></Link>
                        </li>}
                        <li className="text-gray-100 hover:text-indigo-600">
                            <Link to='/viewer'><button className='inline-block rounded-full border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>Viewer</button></Link>
                        </li>
                    </ul>
                </div>
                {user && (
                    <>
                        <span className='font-semibold text-2xl block mx-4 text-white'>Hello <span className='text-red-700'>{user.name}!</span>  </span>
                        <div className="hidden md:inline-block">
                            <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow" onClick={handleClick}>
                                Logout
                            </button>
                        </div>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login">
                            <div className="hidden md:inline-block mx-5">
                                <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow">
                                    Login
                                </button>
                            </div>
                        </Link>
                        <Link to="/register">
                            <div className="hidden md:inline-block mx-5">
                                <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow">
                                    Signup
                                </button>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}