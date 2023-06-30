import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar';

function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/users', newUser);
            setSuccessMessage('L\'utilisateur a été ajouté avec succès.');
            setNewUser({
                name: '',
                email: '',
                role: '',
            });
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            const userData = response.data;

            setEditUserId(userId);
            setNewUser({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
            });
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:3000/users/${editUserId}`, newUser);
            setSuccessMessage('L\'utilisateur a été mis à jour avec succès.');
            setEditUserId(null);
            setNewUser({
                firstName: '',
                lastName: '',
                email: '',
            });
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleSearch = (searchQuery) => {
        const filteredUsers = users.filter(user =>
            user.email.includes(searchQuery)
        );
        setFilteredUsers(filteredUsers);
    };

    const handleChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="admin-users">
            <h2 className="admin-users__title">Administration des utilisateurs</h2>
            {successMessage && <p className="admin-users__success-message">{successMessage}</p>}

            <SearchBar onSearch={handleSearch} />

            <ul className="admin-users__list">
                {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
                    <li key={user._id} className="admin-users__item">
                        <div className="admin-users__info">
                            {user.name} - {user.email}
                        </div>
                        <div className="admin-users__actions">
                            <button
                                className="admin-users__edit-button"
                                onClick={() => handleEditUser(user._id)}
                            >
                                Modifier
                            </button>
                            <button
                                className="admin-users__delete-button"
                                onClick={() => handleDeleteUser(user._id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <form
                className="admin-users__form"
                onSubmit={editUserId ? handleUpdateUser : handleAddUser}
            >
                <h3 className="admin-users__form-title">
                    {editUserId ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur'}
                </h3>
                <div className="admin-users__form-group">
                    <label className="admin-users__form-label">Prénom:</label>
                    <input
                        className="admin-users__form-input"
                        type="text"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-users__form-group">
                    <label className="admin-users__form-label">Email:</label>
                    <input
                        className="admin-users__form-input"
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-users__form-group">
                    <label className="admin-users__form-label">Nom :</label>
                    <input
                        className="admin-users__form-input"
                        type="text"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleChange}
                    />
                </div>

                <button className="admin-users__form-submit" type="submit">
                    {editUserId ? 'Mettre à jour' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
}

export default AdminUsersPage;
