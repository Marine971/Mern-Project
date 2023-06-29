import React from 'react';
import Navbar from './components/Navbar';
import './styles/App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Products from "./components/Products";

function App() {
    return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Products" element={<Products />} />

            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/RegistrationPage" element={<RegistrationPage />} />

        </Routes>

    </div>
    );
}

export default App;
