// src/components/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import svg from '../image/404 Erro.svg';
import "../style/NotFound.css";

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="cont-404">
            <img src={svg} alt="404 Error" />
            <button onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default NotFound;

