import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    const handleSearch = (searchQuery) => {
        const filtered = products.filter((product) => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredProducts(filtered);
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
                        <p>Price: {product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
