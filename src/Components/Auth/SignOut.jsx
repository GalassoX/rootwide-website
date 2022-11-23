import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SignOut = ({ reload }) => {

    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.removeItem('token');
        reload(true);
        navigate('/');
    });

    return (
        <></>
    )
}

export default SignOut;