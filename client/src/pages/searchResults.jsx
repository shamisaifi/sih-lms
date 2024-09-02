import React from "react";
import { useGlobalStore } from "@/stores/global-store";

const SearchResults = () => {
  const { data } = useGlobalStore();
  console.log("data from search results: ", data);

  return (
    <div className="border w-full h-screen flex justify-center items-center flex-wrap ">
      {data?.results?.length == 0 ? (
        <div>no data found</div>
      ) : (
        data?.results?.map((item, index) => {
          return (
            <div key={index} className="p-3">
              <img src={item.urls.full} alt="" width="50%" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
