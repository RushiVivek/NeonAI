import Navbar from './Navbar'
import { Outlet } from 'react-router'
import { useState } from 'react';
import Sidebar from './Sidebar';

function Layout() {

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="h-full flex flex-col">
            <Navbar />

            <div className='flex flex-grow'>

                {/* sidebar */}
                <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

                {/* the page */}
                <div className="flex flex-grow mx-auto w-3/4 max-w-[1280px]">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Layout