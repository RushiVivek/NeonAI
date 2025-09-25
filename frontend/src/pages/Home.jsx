import { useState, useRef, useEffect } from "react"
import { IoSend } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

function Home() {

    const [userInput, setUserInput] = useState("");
    const [files, setFiles] = useState([]);
    const addFilesRef = useRef(null);
    const [displayDropItemsWrapper, setDisplayDropItemsWrapper] = useState(false);

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
            // images: images,
            // docs: docs,
            // audio : audio,
        }
        // axios.post(import.meta.env.backendURL, payload);
    }
    const isValidFile = (file) => {
        const type = file.type;
        if (type.startsWith("image/") || type.startsWith("audio/") || type === "application/pdf") return true;
        return false;
    };
    const updFiles = (e) => {

        //validation
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => isValidFile(file));
        if (validFiles.length < selectedFiles.length) {
            alert("Only images, audio, and PDFs are allowed.");
            return;
        }

        //updating files
        setFiles(old => [...old, ...validFiles]);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setDisplayDropItemsWrapper(true);
    }

    const handleDrop = (e) => {
        e.preventDefault();

        //validate the dropped files
        const droppedFiles = Array.from(e.dataTransfer.files);
        const valid = droppedFiles.filter(isValidFile);
        if (valid.length < droppedFiles.length) {
            alert("Only images, audio, and PDFs are allowed.");
            return;
        }

        //update the files
        setFiles((old) => [...old, ...valid]);
    };

    console.log(files);

    return (
        <>
            <div className="absolute l-0 t-0 flex flex-1 flex-col items-center justify-center gap-3 py-3 bg-blue-400" hidden={!displayDropItemsWrapper}>

            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-3" onDragOver={handleDragOver} onDrop={handleDrop}>
                {/* welcome design */}
                <h1 className="text-4xl mb-4">Welcome to NeonAI :D</h1>

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