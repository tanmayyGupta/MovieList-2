import React from "react";

function NotFound() 
{
    return(
        <>
            <div className="jumbotron p-5 mt-2 mb-0">
            <h1 className="display-1 "> Page does not exist !!!</h1>
            </div>

            <div className=" object-cover sm:2/3 md:w-5/12 justify-center mx-auto my-0">
                <img src = "notfound.jpeg" alt = "404" />
            </div>
        </>
    )
}

export default NotFound;