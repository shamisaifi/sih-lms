import React from "react";
import { useGlobalStore } from "@/stores/global-store";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { data } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <div className="relative border w-full p-3 ">
      <button onClick={() => navigate(-1)} className=" relative -top-8 -left-8  bg-slate-200 rounded-full p-1 ">
        <MdOutlineKeyboardBackspace className="text-3xl" />
      </button>
      {data?.results?.length == 0 ? (
        <div>no data found</div>
      ) : (
        data?.results?.map((item, index) => {
          return (
            <div key={index} className="py-2">
              <img src={item.urls.full} alt="" width="30%" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
