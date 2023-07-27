import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Search from "./Search";
import Profile from "./YourProfile";

function Home () {
    const navigate = useNavigate();
    const [details, setDetails] = useState('');

    // useEffect(() => {
    //     const token = sessionStorage.getItem('token');

    //     if(!token) {
    //         navigate('/login')
    //     }

    //     if(token) {
    //         const user = jwt_decode(token);

    //         if(!user) {
    //             sessionStorage.removeItem('token');
    //             navigate('/login');
    //         }
    //         else{
    //             console.log(user);
    //             setDetails(user);
    //         }
    //     }
    //     // eslint-disable-next-line
    // }, []);

    <Routes>
        <Route path="/profile" element={<Profile />}/>
    </Routes>

    return (
        <div className="isolate min-h-screen bg-gradient-to-bl from-purple-50 via-violet-50 to-indigo-50">
            <div>
                <Search />
            </div>
        </div>
    )
}

export default Home;