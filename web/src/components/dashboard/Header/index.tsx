import React, { useEffect, useState } from 'react'
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'

import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
import { useLogout } from '@refinedev/core'
import { UserIcon } from '@heroicons/react/24/outline'


export const Header: React.FC = () => {
    const [pageTitle, setPageTitle] = useState<string>(document.title.split('-')[0])
    const { mutate: logout } = useLogout()

    const logoutUser = () => {
        logout()
    }

    useEffect(() => {
        setPageTitle(document.title.split('-')[0])
    }, [document.title]);

    return (
        <>
            <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        <Bars3Icon className="h-5 inline-block w-5" /></label>
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>

                <div className="flex-none ">

                    {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

                    {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}


                    {/* Light and dark theme selection toogle **/}
                    {/* <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")} />
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")} />
                    </label> */}


                    {/* Notification icon */}
                    <button className="btn btn-ghost ml-4  btn-circle">
                        <div className="indicator">
                            <BellIcon className="h-6 w-6" />
                            {3 > 0 ? <span className="indicator-item badge badge-primary badge-sm">{3}</span> : null}
                        </div>
                    </button>


                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <UserIcon />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                                <Link to={'/app/settings-profile'}>
                                    Profile Settings
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={logoutUser}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header