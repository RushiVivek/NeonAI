import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { useEffect, useState } from "react";
import { LuAudioLines } from "react-icons/lu";
import { BsFiletypePdf } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router";
import toast from "react-hot-toast";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { PiNotePencilDuotone } from "react-icons/pi";

function Sidebar({ setShowSidebar, showSidebar, allActiveFiles, setAllActiveFiles, isProcessing, setIsProcessing, allActiveFilesUrls, setAllActiveFilesUrls }) {

    const id = useParams();
    const [showAllChats, setShowAllChats] = useState(true);
    const [showAllActiveFiles, setShowAllActiveFiles] = useState(true);

    //No need to fetch anything HERE, the showAllActiveFiles will get updated in outlet (chat page) and hence active files will be fetched there

    const removeFile = async (tgt) => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const res = await axios.post(`${import.meta.env.BACKEND_URL}/usersChat/fileID_method=DELETE`);
        } catch (err) {
            // toast.error("Oops something went wrong deleting the file");
            // console.log(err.details);
        } finally {
            setAllActiveFiles(old => old.filter((file, ind) => ind != tgt));
            URL.revokeObjectURL(allActiveFilesUrls[tgt]);
            setAllActiveFilesUrls(old => old.filter((url, ind) => ind != tgt));
            setIsProcessing(false);
        }
    }

    return (
        <>
            <div className={`fixed top-0 left-0 h-screen z-20 pt-15 px-2 flex items-start justify-start flex-col transition-all duration-300 w-[250px] ${showSidebar ? "translate-x-0" : "-translate-x-[210px]"} bg-zinc-900/90 `}>

                {/* sidebar toggle button */}
                <div className="relative group inline-block self-end">
                    <button onClick={() => setShowSidebar(old => !old)} className="text-2xl cursor-pointer">
                        {showSidebar ? < GoSidebarExpand /> : <GoSidebarCollapse />}
                    </button>
                    <span className="absolute left-1/2 -translate-y-1/2 whitespace-nowrap translate-x-1/4 mt-1 hidden group-hover:block bg-zinc-900/90 text-white text-[10px] px-2 py-1 rounded w-[90px]">
                        {showSidebar ? "Collapse" : "Expand"} Sidebar
                    </span>
                </div>

                {/* sidebar contents */}
                <>
                    <div className={`h-full w-full transition-all text-left flex flex-col gap-3 duration-300 ${showSidebar ? "opacity-100" : "opacity-0"}`}>
                        <Link to="/" className="text-lg flex items-center gap-1"> <PiNotePencilDuotone /> New Chat</Link>

                        {
                            id?.id &&
                            <div className="w-full">
                                <h1 className="text-lg text-zinc-400 flex items-center hover:cursor-pointer pb-1" onClick={() => setShowAllActiveFiles(old => !old)}>
                                    Active files {showAllActiveFiles ? <MdExpandLess /> : <MdExpandMore />}
                                </h1>
                                {
                                    showAllActiveFiles &&
                                    <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto scrollbar">
                                        {
                                            allActiveFiles.length > 0 &&
                                            allActiveFiles.map((file, ind) => {
                                                return (
                                                    <div key={ind} className="relative flex justify-start items-center rounded-xl">
                                                        <div className="h-[60px] w-full bg-zinc-700 flex gap-2 items-center px-2 mr-1 rounded-lg">
                                                            {
                                                                (file.type.startsWith("image/")) ?
                                                                    <img className="h-[55px] w-[80px] object-cover" src={allActiveFilesUrls[ind]} alt={file.name} draggable={false} />
                                                                    :
                                                                    <div className="bg-red-600 text-2xl p-1 rounded-lg">
                                                                        {file.type.startsWith("audio/") ? <LuAudioLines /> : <BsFiletypePdf />}
                                                                    </div>
                                                            }
                                                            <div className="text-start flex flex-col">
                                                                <h1 className="text-sm">{file.name.length > 13 ? file.name.slice(0, 13) + "..." : file.name}</h1>
                                                                <span className="text-[12px]">
                                                                    {file.type.startsWith("audio/") ? "Audio" : file.type.startsWith("image/") ? "Image" : "PDF"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button type="button" onClick={() => removeFile(ind)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full bg-red-500 transition hover:cursor-pointer hover:bg-red-600" disabled={isProcessing}> <MdCancel className="text-zinc-700 text-xl" /> </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        }

                        {/* FRAGILE MATERIAL DO NOT TOUCH (spent ~1hr to make the chats overflow work somehow.) */}
                        <div className="w-full flex-1 pb-[40px] flex flex-col overflow-y-auto">
                            <h1 className="text-lg text-zinc-400 hover:cursor-pointer flex items-center" onClick={() => setShowAllChats(old => !old)}>
                                Chats {showAllChats ? <MdExpandLess /> : <MdExpandMore />}
                            </h1>
                            {
                                showAllChats &&
                                <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar">
                                    <Link className="text-sm" to="/c/1">display chat1</Link>
                                    <Link className="text-sm" to="/c/2">display chat2</Link>
                                    <Link className="text-sm" to="/c/2">display chat3</Link>
                                    <Link className="text-sm" to="/c/1">display chat4</Link>
                                    
                                </div>
                            }
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default Sidebar