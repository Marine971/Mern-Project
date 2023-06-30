import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);

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
                    setUpdatedUser(response.data.user);
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

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleUpdateProfile = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:3000/profile', updatedUser, {
                headers: {
                    Authorization: token,
                },
            });

            setEditing(false);
            setUser(updatedUser);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (event) => {
        setUpdatedUser({
            ...updatedUser,
            [event.target.name]: event.target.value,
        });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    // Vérifier la valeur de isAdmin dans la session
    const isAdmin = user.isAdmin;

    return (
        <div>
            {editing ? (
                <form onSubmit={handleUpdateProfile}>
                    <h1>Modifier le profil</h1>
                    <div>
                        <label>Prénom:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={updatedUser.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Nom de famille:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={updatedUser.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Téléphone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={updatedUser.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Enregistrer</button>
                </form>
            ) : (
                <div>
                    <h1>Profile</h1>
                    <p>Prénom: {user.firstName}</p>
                    <p>Nom de famille: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Téléphone: {user.phone}</p>
                    <button onClick={handleEditProfile}>Modifier</button>
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            )}

            {isAdmin && <button onClick={() => navigate('/admin/')}>Administration</button>}
        </div>
    );
}

export default Profile;
