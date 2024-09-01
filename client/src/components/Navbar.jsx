import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const Navbar = () => {
    return (
        <div className='px-5 flex items-center justify-center border-b border-solid border-black  shadow-xl'>
            <nav className="flex justify-between items-center w-[100%] md:w-[90%]">
                <span className="text-3xl font-semibold">Gyaan<span className="text-[#2f60c2]">Setu</span></span>

                <div className="flex items-center text-xl">

                    <ul className="flex items-center  md:space-x-4">
                        <li><Link to="my-learnigs" >My learnings</Link></li>
                        <li><Link to="wishlist" ><FaRegHeart /></Link></li>
                        <li><Link to="cart" ><IoMdCart /></Link></li>
                        <li><Link to="profile" ><FaBell /></Link></li>
                    </ul>
                    <div className="group cursor-pointer relative p-4">

                        <div className="rounded-full p-2 bg-blue-500  w-10 h-10 flex items-center justify-center text-white text-sm">US</div>

                        <div className="transition-all duration-500 ease-in-out hidden group-hover:block  shadow-2xl absolute top-[102%] right-0 w-[12rem] text-base bg-[#ffffff]">
                            <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black"> Profile</div>
                            <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black"> Orders</div>
                            <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black"> Wishlist</div>
                            <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black"> Cart</div>
                            <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black">Logout</div>
                        </div>
                    </div>
                </div>

            </nav>

        </div>
    )
}

export default Navbar