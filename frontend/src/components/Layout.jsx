import Navbar from './Navbar'
import { Outlet } from 'react-router'
import { useState } from 'react';
import Sidebar from './Sidebar';

function Layout() {

    const [showSidebar, setShowSidebar] = useState(false);
    const [allActiveFiles, setAllActiveFiles] = useState([]);
    const [allActiveFilesUrls, setAllActiveFilesUrls] = useState([]);
    //use a state to pass the active files from outlet (using context instead of prop drilling) to the sidebar
    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <div className="h-full flex flex-col">
            <Navbar />

            <div className='flex flex-grow'>

                {/* sidebar */}
                <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} allActiveFiles={allActiveFiles} setAllActiveFiles={setAllActiveFiles} isProcessing={isProcessing} setIsProcessing={setIsProcessing} allActiveFilesUrls={allActiveFilesUrls} setAllActiveFilesUrls={setAllActiveFilesUrls}/>

                {/* the page */}
                <div className={`flex flex-grow mx-auto w-3/4 max-w-[1280px] ${showSidebar ? "pl-[250px]" : null} transition-all`}>
                    <Outlet context={{allActiveFiles, setAllActiveFiles, isProcessing, setIsProcessing, setAllActiveFilesUrls}}/>
                </div>

            </div>
        </div>
    )
}

export default Layout