const mongoose = require('mongoose');

// Définition du schéma pour les produits de sports
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},
    { collection : 'Products'}
);

// Création du modèle pour les produits de sports
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
