import { useState, useRef, useEffect } from "react"
import { IoSend } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { LuAudioLines } from "react-icons/lu";
import { BsFiletypePdf } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

function ChatPage() {

    const [userInput, setUserInput] = useState("");
    const [files, setFiles] = useState([]);
    const addFilesRef = useRef(null);
    const [displayDropItemsWrapper, setDisplayDropItemsWrapper] = useState(false);

    useEffect(() => {
        const handleEscapeDuringDrop = (e) => {
            if (e.key === "Escape" && displayDropItemsWrapper) setDisplayDropItemsWrapper(false);
        }
        window.addEventListener("keydown", handleEscapeDuringDrop);
        return () => window.removeEventListener("keydown", handleEscapeDuringDrop);
    }, [displayDropItemsWrapper]);

    const handleAddFiles = () => {
        addFilesRef.current.click();
    }
    const updInput = (e) => {
        setUserInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.length === 0) return;
        //generate a seperate chat and navigate to it.
        const payload = {
            input: userInput,
            files: files,
        }
        // axios.post(import.meta.env.BACKEND_URL, payload);
    }
    const isValidFile = (file) => {
        const type = file.type;
        if (type.startsWith("image/") || type.startsWith("audio/") || type === "application/pdf") return true;
        return false;
    }
    const updFiles = (e) => {

        //validation
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => isValidFile(file));
        if (validFiles.length < selectedFiles.length) {
            toast.error("Only images, audio, and PDFs are allowed.");
            return;
        }

        //updating files
        setFiles(old => [...old, ...validFiles]);
    }

    const removeFile = (tgt) => {
        setFiles(old => old.filter((file, ind) => ind != tgt));
    }

    const handleDragOver = (e) => { e.preventDefault(); setDisplayDropItemsWrapper(true); }

    const handleDrop = (e) => {
        e.preventDefault();

        setDisplayDropItemsWrapper(false);
        //validate the dropped files
        const droppedFiles = Array.from(e.dataTransfer.files);
        const valid = droppedFiles.filter(isValidFile);
        if (valid.length < droppedFiles.length) {
            toast.error("Only images, audio, and PDFs are allowed.");
            return;
        }

        //update the files
        setFiles((old) => [...old, ...valid]);
    };

    //One error is that if file is dragged on and out then the wrapper remains. how to fix it?
    console.log(files);

    return (
        <>
            <div className="flex flex-col flex-grow min-h-screen py-3 gap-3 items-center" onDragOver={handleDragOver} onDrop={handleDrop}>

                {/* Drag to Upload files wrapper (it is absolute and hidden too, doesnt effect flow of document)*/}
                <div className="absolute top-0 left-0 flex flex-col gap-2 w-full h-full items-center justify-center bg-zinc-900/85 z-50" hidden={!displayDropItemsWrapper}>
                    <img src="../../public/DragWrapperLogo.png" alt="Image" className="w-[200px] object-cover " />
                    <h1 className="text-3xl font-semibold text-white">Drop files</h1>
                    <p className="text-md text-white">Drop the files in here to add them into active files</p>
                </div>

                {/* chat exchange */}
                <div className="flex flex-col px-4 w-3/4 pt-[50px] pb-[80px]">
                    
                </div>

                <div className="fixed bottom-0 pb-2 w-3/4 flex flex-col items-center gap-2 rounded-lg " style={{backgroundColor:"#242424"}}>

                    {/* uploaded files */}
                    <div className="flex gap-2 justify-self-end pt-1">
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

                    {/* input box */}
                    <form onSubmit={handleSubmit} className="bg-zinc-700 rounded-xl px-2 py-2 flex items-center gap-2 w-3/4">

                        <div className="relative group inline-block">
                            <button type="button" className="text-xl rounded-full p-1 hover:cursor-pointer hover:bg-zinc-600" onClick={handleAddFiles}>
                                <AiOutlinePlus />
                            </button>
                            <span className="absolute left-1/2 -translate-y-15 -translate-x-1/2 mt-1 hidden group-hover:block bg-zinc-900/60 text-white text-[13px] px-2 py-1 min-w-[90px] rounded">
                                Upload Files
                            </span>
                        </div>

                        <input type="file" name="files" id="files" ref={addFilesRef} multiple accept="image/*, audio/*, .pdf" hidden={true} onChange={updFiles} />

                        <input type="text" name="userInput" id="userInput" className="flex-1 outline-none" onChange={updInput} value={userInput} />

                        <div className="relative group inline-block">
                            <button className="text-lg rounded-sm p-1 hover:cursor-pointer hover:bg-zinc-600">
                                <IoSend />
                            </button>
                            <span className="absolute left-1/2 -translate-y-15 -translate-x-1/2 mt-1 hidden group-hover:block bg-zinc-900/60 text-white text-[13px] px-2 py-1 rounded">
                                Send
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default ChatPage