import React from 'react';
import Navbar from './components/Navbar';
import './styles/App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Logout from "./components/LogoutPage";
import Panier from "./components/Panier";
import AdminPanel from "./components/admin/AdminPanel.js";
import AdminProductsPage from "./components/admin/AdminProductsPage";


function App() {
    return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/signin" element={<RegistrationPage />} />
            <Route path="/admin/" element={<AdminPanel />} />
            <Route path="/products/:id" element={<AdminProductsPage />} />
        </Routes>

    </div>
    );
}

export default App;
