import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { useEffect, useState } from "react";
import { LuAudioLines } from "react-icons/lu";
import { BsFiletypePdf } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router";

function Sidebar({ setShowSidebar, showSidebar }) {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        //send req to backend to request the active files.
        const fetchData = async () => {
            // try{
            //     const data = await axios.get(...);
            //     setFiles(data.res);
            // }catch(err){
            //     console.log(err);
            //     toast.error("Something went wrong!");
            // }finally{

            // }
        }
        fetchData();
    })

    const removeFile = (tgt) => {
        //also send a deletion request to the backend.
        //axios.post(import.meta.env.BACKEND_URL/someRoute_method=DELETE, payload);
        setFiles(old => old.filter((file, ind) => ind != tgt));
    }

    return (
        <>

            <div className={`fixed top-12 left-0 h-full z-50 pt-3 px-2 flex items-start justify-start flex-col transition-all duration-300 w-[250px] ${showSidebar ? "translate-x-0" : "-translate-x-52"} bg-zinc-900/90`}>

                {/* sidebar toggle button */}
                <div className="relative group inline-block self-end">
                    <button onClick={() => setShowSidebar(old => !old)} className="text-2xl">
                        {showSidebar ? < GoSidebarExpand /> : <GoSidebarCollapse />}
                    </button>
                    <span className="absolute left-1/2 -translate-y-1/2 translate-x-1/4 mt-1 hidden group-hover:block bg-zinc-900/90 text-white text-[10px] px-2 py-1 rounded w-[90px]">
                        {showSidebar ? "Collapse" : "Expand"} Sidebar
                    </span>
                </div>

                {/* sidebar contents */}
                <>
                    <div className={`h-full transition-all duration-300 ${showSidebar ? "opacity-100" : "opacity-0"} `}>
                        <div className="min-h-2/5 w-full">
                            <h1 className="text-lg">Currently active files:</h1>
                            {/* HOPEFULLY THIS WORKS WELL, I HAVENT TESTED THIS YET.  */}
                            <div className="flex flex-col gap-1">
                                {
                                    files.length > 0 &&
                                    files.map((file, ind) => {
                                        return (
                                            <div key={ind} className="relative flex justify-start items-center rounded-xl overflow-hidden">
                                                {
                                                    (file.type.startsWith("image/")) ?
                                                        <img className="h-[60px] w-[80px] object-cover" src={URL.createObjectURL(file)} alt={file.name} draggable={false} />
                                                        :
                                                        <div className="h-[60px] w-[180px] bg-zinc-700 flex gap-2 items-center px-2">
                                                            <div className="bg-red-600 text-2xl p-1 rounded-lg">
                                                                {file.type.startsWith("audio/") ? <LuAudioLines /> : <BsFiletypePdf />}
                                                            </div>
                                                            <div className="text-start flex flex-col">
                                                                <h1 className="text-sm">{file.name.length > 13 ? file.name.slice(0, 13) + "..." : file.name}</h1>
                                                                <span className="text-[12px]">{file.type.startsWith("audio/") ? "Audio" : "PDF"}</span>
                                                            </div>
                                                        </div>
                                                }
                                                <button type="button" onClick={() => removeFile(ind)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full bg-red-500 transition hover:cursor-pointer hover:bg-red-600"> <MdCancel className="text-zinc-700 text-xl" /> </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-full text-left">
                            <h1 className="text-lg ">Chats: </h1>
                            <div className="flex flex-col gap-1">
                                <Link className="text-sm" to="/c/1">display chat1</Link>
                                <Link className="text-sm" to="/c/2">display chat2</Link>
                                <Link className="text-sm" to="/c/3">display chat3</Link>
                                <Link className="text-sm" to="/c/4">display chat4</Link>
                            </div>
                        </div>
                    </div>

                </>

            </div>
        </>
    )
}

export default Sidebar