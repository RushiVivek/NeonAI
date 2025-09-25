import Navbar from './Navbar'
import { Outlet } from 'react-router'

function Layout() {
    return (
        <div className="min-h-screen flex flex-col my-auto">
            <Navbar />
            <div className="my-auto flex flex-grow">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout