import Navbar from './Navbar'
import { Outlet } from 'react-router'

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className='flex flex-grow'>
                
                {/* sidebar */}
                <div className='w-[40px] bg-zinc-900/50'>
                    
                </div>

                {/* the page */}
                <div className="flex mx-auto w-3/4 max-w-[1280px]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout