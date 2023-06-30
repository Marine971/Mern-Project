import React from 'react';
import axios from 'axios';

function RegistrationPage() {
    const handleRegistration = async (e) => {
        e.preventDefault();

        const formData = {
            firstName: e.target.elements.firstName.value,
            lastName: e.target.elements.lastName.value,
            phone: e.target.elements.phone.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        };

        try {
            const response = await axios.post('http://localhost:3000/register', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h2>Inscription</h2>
                <form onSubmit={handleRegistration}>
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom :</label>
                        <input type="text" id="firstName" name="firstName" placeholder="Votre prénom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom :</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Votre nom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone :</label>
                        <input type="tel" id="phone" name="phone" placeholder="Votre numéro de téléphone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input type="email" id="email" name="email" placeholder="Votre email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" placeholder="Votre mot de passe" />
                    </div>
                    <button type="submit" className="btn-login">S'inscrire</button>
                </form>
                <div className="signup-link">
                    <p>Vous avez déjà un compte ? <a href="/LoginPage">Connectez-vous</a></p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
