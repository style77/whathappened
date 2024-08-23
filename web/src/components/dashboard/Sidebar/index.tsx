import { NavLink, Link, useLocation } from 'react-router-dom';
import { routes } from '../../../routes';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const LeftSidebar: React.FC = () => {
    const location = useLocation();

    const close = () => {
        document.getElementById('left-sidebar-drawer')?.click();
    }

    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-64 bg-black custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full min-h-full text-white border-r border-white/10">
                <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>
                <li className="mb-4 mt-1 font-semibold text-xl items-center">
                    <Link className='text-center justify-center w-min' to={'/dashboard'}>
                        <img src='./logo.svg' className='h-4 w-4' height="16" width="16"></img>
                        whathappened
                    </Link>
                </li>
                {routes.filter((val) => val.showInSidebar).map((route, k) => (
                    <li key={k} className="px-4">
                        <NavLink
                            end
                            to={route.path}
                            className={({ isActive }) => `${isActive ? 'font-semibold bg-white/15' : 'font-normal text-gray-300'}`}
                        >
                            {<route.icon className="h-6 w-6" />} {route.name}
                            {location.pathname === route.path ? (
                                <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md" aria-hidden="true"></span>
                            ) : null}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}