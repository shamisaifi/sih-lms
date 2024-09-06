import { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../assets/logo/gs1.png";

import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useUser } from "@/providers/auth-provider";
import { useGlobalStore } from "@/stores/global-store";

import SearchBar from "./ui/searchBar";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const { user } = useUser();
  const { userType, setUserType, data, setData } = useGlobalStore();

  const handleSelectUserType = (checked) => {
    setUserType(checked ? "instructor" : "student");
  };

  const getData = async (query) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            client_id: "-w9fy9-0wg2Dtrlv1FtsxjRY9i8VKh-hYHUjbYF96LA",
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="px-5 h-18 flex items-center justify-center border-b border-solid border-black ">
      <nav className="flex justify-between items-center w-[100%] md:w-[90%]">

        <span className="text-1xl font-semibold">
          <img src={img1} className="w-[60%]"/>
        </span>

        <div className=" w-full flex justify-center items-center">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        <div className="flex items-center text-xl">
          <ul className="flex items-center  md:space-x-4">
            <li>
              <div className="flex items-center space-x-2">
                <Switch
                  id="userType"
                  checked={userType === "instructor"}
                  onCheckedChange={handleSelectUserType}
                />
                <Label htmlFor="userType">Instructor</Label>
              </div>
            </li>
            <li>
              <Link to="wishlist">
                <FaRegHeart />
              </Link>
            </li>
            <li>
              <Link to="cart">
                <IoMdCart />
              </Link>
            </li>
            <li>
              <Link to="profile">
                <FaBell />
              </Link>
            </li>
          </ul>
          <div className="group cursor-pointer relative p-4">
            <div className="rounded-full p-2  w-10 h-10 flex items-center justify-center">
              <img
                src={user?.user?.photoURL}
                alt="User"
                className="w-full h-full border rounded-full"
              />
            </div>

            <div className="transition-all duration-500 ease-in-out hidden group-hover:block  shadow-2xl absolute top-[102%] right-0 w-[12rem] text-base bg-[#ffffff]">
              <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black">
                {" "}
                Profile
              </div>
              <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black">
                {" "}
                Orders
              </div>
              <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black">
                {" "}
                Wishlist
              </div>
              <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black">
                {" "}
                Cart
              </div>
              <div className="px-4 p-2 hover:scale-[1.009] hover:translate-y-1 hover:bg-slate-200 transition-all hover:text-black">
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
