import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios.js';
import { useAuth } from "../context/authContext";

import Footer from '../components/footer.jsx'

function Accueil({ children, role }) {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const logOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
            <h1>
                Accueil
            </h1>
            <button type="submit" onClick={logOut} disabled={loading}>
                {loading ? "logging out..." : "Log Out" } 
            </button>
            <Footer />
        </>
    )

}

export default Accueil;