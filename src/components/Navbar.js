import { Link } from 'react-router-dom';

function Navbar() {
    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">SportShop</Link>

                <ul className="nav-menu">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/products">Produits</Link></li>
                    {isLoggedIn ? (<li><Link to="/panier" className="cart">Panier</Link></li>) : null}
                </ul>

                <div className="user">
                    {isLoggedIn ? (
                        <li>
                            <img src="https://res.cloudinary.com/dyaml7gmu/image/upload/v1688060211/5856_hb57ii.jpg" alt="User Avatar" className="user-avatar" />
                            <Link to="/profile" className="user-link">My profil</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="user-link">Connexion</Link>
                            <Link to="/signin" className="user-link">Inscription</Link>
                        </li>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
