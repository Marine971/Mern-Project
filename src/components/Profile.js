import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    throw new Error('Failed to fetch profile');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        // Effacer le token du localStorage ou effectuer toute autre action de déconnexion nécessaire
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/logout');
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/logout');
        }
    }, [isLoggedIn, navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    // Vérifier la valeur de isAdmin dans la session
    const isAdmin = user.isAdmin;
    console.log(isAdmin);

    return (
        <div>
            <div>
            <h1>Profile</h1>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={handleLogout}>Déconnexion</button>
            </div>
            {isAdmin && <button onClick={() => navigate('/admin/')}>Administration</button>}

        </div>

);
}
export default Profile;
