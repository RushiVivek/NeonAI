import Navbar from './Navbar'
import { Outlet } from 'react-router'
import { useState } from 'react';
import Sidebar from './Sidebar';

function Layout() {

    const [showSidebar, setShowSidebar] = useState(false);
    const [allActiveFiles, setAllActiveFiles] = useState([]);
    //use a state to pass the active files from outlet (using context instead of prop drilling) to the sidebar
    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <div className="h-full flex flex-col">
            <Navbar />

            <div className='flex flex-grow'>

                {/* sidebar */}
                <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} allActiveFiles={allActiveFiles} setAllActiveFiles={setAllActiveFiles} isProcessing={isProcessing} setIsProcessing={setIsProcessing}/>

                {/* the page */}
                <div className="flex flex-grow mx-auto w-3/4 max-w-[1280px]">
                    <Outlet context={{setAllActiveFiles, isProcessing, setIsProcessing}}/>
                </div>

            </div>
        </div>
    )
}

export default Layout