import { useState, useRef, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router";
import { IoSend } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { LuAudioLines } from "react-icons/lu";
import { BsFiletypePdf } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

function Home() {

    const [userInput, setUserInput] = useState("");
    const [files, setFiles] = useState([]);
    const addFilesRef = useRef(null);
    const [displayDropItemsWrapper, setDisplayDropItemsWrapper] = useState(false);
    const nav = useNavigate();
    const { setAllActiveFiles } = useOutletContext();

    useEffect(() => {
        const handleEscapeDuringDrop = (e) => {
            if (e.key === "Escape" && displayDropItemsWrapper) setDisplayDropItemsWrapper(false);
        }
        window.addEventListener("keydown", handleEscapeDuringDrop);
        return () => window.removeEventListener("keydown", handleEscapeDuringDrop);
    }, [displayDropItemsWrapper]);

    const updInput = (e) => { setUserInput(e.target.value); }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        
        //generate a seperate chat and navigate to it also send the users message.
        const payload = {
            input: userInput,
            files: files,
        }
        // axios.post(import.meta.env.BACKEND_URL, payload);
        
        const id = Math.floor(Math.random() * 100000);
        setAllActiveFiles([...files]);
        nav(`/c/${id}`, {state:payload});
    }
    
    //files upload and removing handling

    const handleAddFiles = () => { addFilesRef.current.click(); }

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

    const removeFile = (tgt) => { setFiles(old => old.filter((file, ind) => ind != tgt)); }

    //drag and drop of files

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

    return (
        <>
            <div className="flex min-h-screen flex-grow flex-col items-center justify-center gap-3 py-3 pt-[50px]" onDragOver={handleDragOver} onDrop={handleDrop}>

                {/* Drag to Upload files wrapper (it is absolute and hidden too, doesnt effect flow of document)*/}
                <div className="absolute top-0 left-0 flex flex-col gap-2 w-full h-full items-center justify-center bg-zinc-900/85 z-50" hidden={!displayDropItemsWrapper}>
                    <img src="../../public/DragWrapperLogo.png" alt="Image" className="w-[200px] object-cover " />
                    <h1 className="text-3xl font-semibold text-white">Drop files</h1>
                    <p className="text-md text-white">Drop the files in here to add them into active files</p>
                </div>

                {/* welcome design */}
                <h1 className="text-4xl mb-4">Welcome to NeonAI :D</h1>

                {/* uploaded files */}
                <div className="flex gap-2">
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
        </>
    )
}

export default Home