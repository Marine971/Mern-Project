import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        imageUrl: '',
        quantity: 0
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/products', newProduct);
            setSuccessMessage('Le produit a été ajouté avec succès.');
            setNewProduct({
                name: '',
                category: '',
                price: '',
                description: '',
                imageUrl: '',
                quantity: 0
            });
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${productId}`);
            const productData = response.data;

            setEditProductId(productId);
            setNewProduct({
                name: productData.name,
                category: productData.category,
                price: productData.price,
                description: productData.description,
                imageUrl: productData.imageUrl,
                quantity: productData.quantity
            });
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:3000/products/${editProductId}`, newProduct);
            setSuccessMessage('Le produit a été mis à jour avec succès.');
            setEditProductId(null);
            setNewProduct({
                name: '',
                category: '',
                price: '',
                description: '',
                imageUrl: '',
                quantity: 0
            });
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="admin-products">
            <h2 className="admin-products__title">Administration des produits</h2>
            {successMessage && <p className="admin-products__success-message">{successMessage}</p>}
            <ul className="admin-products__list">
                {products.map((product) => (
                    <li key={product._id} className="admin-products__item">
                        <div className="admin-products__info">
                            {product.name} - {product.price} €
                        </div>
                        <div className="admin-products__actions">
                            <button
                                className="admin-products__edit-button"
                                onClick={() => handleEditProduct(product._id)}
                            >
                                Modifier
                            </button>
                            <button
                                className="admin-products__delete-button"
                                onClick={() => handleDeleteProduct(product._id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <form
                className="admin-products__form"
                onSubmit={editProductId ? handleUpdateProduct : handleAddProduct}
            >
                <h3 className="admin-products__form-title">
                    {editProductId ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </h3>
                <div className="admin-products__form-group">
                    <label className="admin-products__form-label">Nom:</label>
                    <input
                        className="admin-products__form-input"
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-products__form-group">
                    <label className="admin-products__form-label">Catégorie:</label>
                    <input
                        className="admin-products__form-input"
                        type="text"
                        name="category"
                        value={newProduct.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-products__form-group">
                    <label className="admin-products__form-label">Prix:</label>
                    <input
                        className="admin-products__form-input"
                        type="text"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-products__form-group">
                    <label className="admin-products__form-label">Description:</label>
                    <textarea
                        className="admin-products__form-textarea"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="admin-products__form-group">
                    <label className="admin-products__form-label">URL de l'image:</label>
                    <input
                        className="admin-products__form-input"
                        type="text"
                        name="imageUrl"
                        value={newProduct.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-products__form-group">
                    <label className="admin-products__form-label">Quantité:</label>
                    <input
                        className="admin-products__form-input"
                        type="number"
                        name="quantity"
                        value={newProduct.quantity}
                        onChange={handleChange}
                    />
                </div>
                <button className="admin-products__form-submit" type="submit">
                    {editProductId ? 'Mettre à jour' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
}

export default AdminProductsPage;
