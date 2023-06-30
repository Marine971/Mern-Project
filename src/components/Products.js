import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(
            products.map((product) => {
                const existingCartItem = cartItems.find((item) => item.productId === product._id);
                return {
                    ...product,
                    quantity: existingCartItem ? existingCartItem.quantity : product.quantity,
                };
            })
        );
    }, [products, cartItems]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleSearch = (searchQuery) => {
        const filtered = products.filter((product) => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredProducts(filtered);
    };

    const handleAddToCart = (productId, price) => {
        const existingCartItemIndex = cartItems.findIndex((item) => item.productId === productId);

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity += 1;

            setCartItems(updatedCartItems);

            sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            const newCartItem = {
                productId: productId,
                name: products.find((p) => p._id === productId).name,
                quantity: 1,
                price: price,
            };

            const updatedCartItems = [...cartItems, newCartItem];

            setCartItems(updatedCartItems);

            sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }

        const clickedProduct = products.find((p) => p._id === productId);
        const addedQuantity = existingCartItemIndex !== -1 ? cartItems[existingCartItemIndex].quantity + 1 : 1;
        console.log('Produit cliqué :', {
            id: clickedProduct._id,
            name: clickedProduct.name,
            price: clickedProduct.price,
            quantity: addedQuantity,
        });
        console.log('Panier :', cartItems);
    };

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const navigate = useNavigate();

    const handleViewCart = () => {
        navigate('/panier');
    };

    return (
        <div className="products">
            <SearchBar onSearch={handleSearch} />

            <h2>Products</h2>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product._id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: {product.price} €</p>
                        {isLoggedIn && (
                            <button onClick={() => handleAddToCart(product._id, product.price)}>
                                Ajouter au panier
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {isLoggedIn && (
                <div>
                    <button onClick={handleViewCart}>Voir le panier</button>
                </div>
            )}
        </div>
    );
}

export default Products;
