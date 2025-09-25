import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { Link } from "react-router";

function Navbar() {
    return (
        <div className="px-2 flex mt-2 justify-between">
            <Link className='text-2xl text-gray-200 font-semibold' to="/">NeonAI</Link>
            <button><MdDarkMode className="text-2xl"/></button>
            {/* <button><MdOutlineLightMode /></button> */}
        </div>
    )
}

export default Navbar