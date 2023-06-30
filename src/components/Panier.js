import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Panier() {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []); // Empty dependency array

    useEffect(() => {
        setCartTotal(getTotalPrice());
    }, [cartItems]);

    const handleEmptyCart = () => {
        sessionStorage.removeItem('cartItems');
        setCartItems([]);
        setCartTotal(0);
    };

    const getTotalPrice = () => {
        let total = 0;
        if (cartItems.length > 0) {
            total = cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
        }
        return total;
    };

    const handleValider = async () => {
        try {
            let hasStock = true;
            for (const item of cartItems) {
                if (item.quantity === 0) {
                    setValidationMessage(`Impossible d'acheter ${item.name}, il n'y a plus de stock.`);
                    hasStock = false;
                    continue;
                }

                const matchingCartItem = cartItems.find((cartItem) => cartItem.productId === item.productId);
                if (!matchingCartItem) {
                    console.error(`Matching cart item not found for product ID: ${item.productId}`);
                    continue;
                }

                // Récupérer la quantité actuelle du produit dans la base de données
                const response = await axios.get(`http://localhost:3000/products/${item.productId}`);
                const currentQuantity = response.data.quantity;

                const updatedQuantity = currentQuantity - item.quantity;

                // Mettre à jour la quantité du produit dans la base de données
                await axios.put(`http://localhost:3000/products/${item.productId}`, {
                    quantity: updatedQuantity,
                });

                console.log(`Updated quantity for ${item.name}: ${updatedQuantity}`);
            }

            // Clear the cart
            if (hasStock) {
                sessionStorage.removeItem('cartItems');
                setCartItems([]);
                setCartTotal(0);
                setValidationMessage('Votre commande a été enregistrée.');
            }
        } catch (error) {
            console.error('Error updating quantities:', error);
        }
    };


    return (
        <div className="panier-container">
            <h2>Panier</h2>
            <ul className="panier-items">
                {cartItems.map((item) => (
                    <li className="panier-item" key={item.productId}>
                        <span className="panier-item-name">{item.name}</span>
                        <span className="panier-item-quantity">Quantité: {item.quantity}</span>
                    </li>
                ))}
            </ul>
            <p className="panier-total">Total: {cartTotal} €</p>
            <button onClick={handleEmptyCart}>Vider le panier</button>
            <button onClick={handleValider} disabled={cartItems.some((item) => item.quantity === 0)}>
                Valider
            </button>
            {validationMessage && <p>{validationMessage}</p>}
        </div>
    );
}

export default Panier;
