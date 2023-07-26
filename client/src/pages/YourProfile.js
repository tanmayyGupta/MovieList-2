import React, { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import WatchedMovieList from "./WatchedMovieList";

function Profile () {

    const navigate = useNavigate();
    const [details, setDetails] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if(!token) {
            navigate('/login')
        }

        if(token) {
            const user = jwt_decode(token);

            if(!user) {
                sessionStorage.removeItem('token');
                navigate('/login');
            }
            else{
                console.log(user);
                setDetails(user);
            }
        }
        // eslint-disable-next-line
    }, []);

    const email = details.email;
    const [movies, setMovies] = useState([]);
    const [listType, setListType] = useState();

    // const token = sessionStorage.getItem('token');
    // const user = jwt_decode(token);
    // const email = user.email;
    
    async function getList(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:8001/getlist', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                listType,
            }),
        })
        const responseJson = await response.json();
        // console.log(responseJson);

        if(responseJson.movielist) {
            setMovies(responseJson.movielist);
        }
    };

    function doNothing() {

    }
    function logout() {
        sessionStorage.clear();
        navigate('/login');
    }
    return(
        <>
            <div className="isolate min-h-screen bg-gradient-to-bl from-purple-50 via-violet-50 to-indigo-50">
                <h1 className=" xs:text-3xl tracking-tight sm:text-5xl py-4">Welcome <span className="text-3xl underline"> {details.name}</span></h1>
                <div className="w-10/12 mx-auto py-20">
                    {/* <input type="submit" value="Log-Out" onClick={logout} /> */}
                    <form onSubmit={getList} className=" flex justify-evenly">
                        <input type="submit" value="Watched" onClick={() =>{setListType(1)}}
                        className="bg-[#3173bf] text-gray-100 hover:bg-gray-700 focus:bg-gray-800 focus:text-white focus:drop-shadow-xl px-3 py-2 rounded-l-sm text-md font-medium no-underline w-1/2"/>
                        <input type="submit" value="Plan to Watch" onClick={() =>{setListType(0)}}
                        className="bg-[#3173bf] text-gray-100 hover:bg-gray-700 focus:bg-gray-800 focus:text-white focus:drop-shadow-xl px-3 py-2 rounded-r-sm text-md font-medium no-underline w-1/2"/>
                    </form>
                </div>
                <div className="d-flex row">
                    <WatchedMovieList movies = {movies} handleClick = {doNothing}/>
                </div>
            </div>
        </>
    )
}

export default Profile;