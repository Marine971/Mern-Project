import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:3000/signin', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setSuccessMessage(response.data.message);
            navigate('/profile'); // Redirect to /profile
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h2>Connexion</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-login">Se connecter</button>
                </form>
                <div className="signup-link">
                    <p>Vous n'avez pas de compte ? <a href="/RegistrationPage">Inscrivez-vous</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
