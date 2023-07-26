import React from "react";

const SearchBox = (props) => {
    return (
        <>
            <form className=" sm:w-3/5 lg:w-2/5 justify-center mx-auto p-4 m-4">
                <div className="flex rounded-md overflow-hidden w-full">

                    <input type="text" className="w-full rounded-md rounded-r-none placeholder-gray-500 px-3 text-lg" autoFocus placeholder="Search for any movie..." value={props.value} onChange={(e) => props.setSearchValue(e.target.value)}/>

                    <button className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">Clear</button>
                </div>
            </form>
        </>
    )
}

export default SearchBox;