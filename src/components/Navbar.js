import { Link } from 'react-router-dom';

function Navbar() {
    const isLoggedIn = false;
    // Vous pouvez ajouter la logique pour vérifier l'état de connexion de l'utilisateur et mettre à jour la variable isLoggedIn

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">SportShop</Link>

                <ul className="nav-menu">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/Products">Produits</Link></li>
                    <li><Link to="/panier" className="cart">Panier<span className="cart-count">3</span></Link></li>
                </ul>

                <div className="user">
                    {isLoggedIn ? (
                        <>
                            <img src="/path/to/user-avatar.png" alt="User Avatar" className="user-avatar" />
                            <span className="user-name">John Doe</span>
                        </>
                    ) : (
                        <>
                            <Link to="/LoginPage" className="user-link">Connexion</Link>
                            <Link to="/RegistrationPage" className="user-link">Inscription</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
