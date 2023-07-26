import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate();
    useEffect(() => {
        // const token = sessionStorage.getItem('token');
        sessionStorage.clear();
        navigate('/');
    })
}

export default SignOut;