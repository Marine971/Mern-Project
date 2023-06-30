const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;
const Users = require('../models/Users.js');
const cors = require('cors');
const Products = require("../models/Products.js");
const jwt = require('jsonwebtoken');
const {ObjectId} = require("mongodb");
require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false
}));

// Connexion à la base de données MongoDB
const dbURI = "mongodb+srv://marine:TjDG1LsIFcvtbceV@cluster0.cinj6vw.mongodb.net/mern-project";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected');
        // Démarrer le serveur une fois la connexion établie
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    // Crée une nouvelle instance du modèle User avec les données d'inscription
    const newUsers = new Users({
        firstName,
        lastName,
        phone,
        email,
        password
    });
    console.log(newUsers)

    // Enregistre l'utilisateur dans la base de données
    newUsers.save()
        .then(() => {
            res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to register user' });
        });
});
const jwtSecret = 'key';
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ email, password })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                const token = jwt.sign({ userId: user._id }, jwtSecret);
                req.session.isAdmin = user.isAdmin; // Stocker la variable isAdmin dans la session


                res.status(200).json({ message: 'Signin successful', token });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to signin' });
        });
});

/*********************  Products  ***********************/


app.get('/products', (req, res) => {
    Products.find()
        .then((Products) => {
            res.status(200).json(Products);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch products' });
        });
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    Products.findById(id)
        .then((Product) => {
            res.status(200).json(Product);
        })
        .catch((error) => {
            res.status(404).json({ error: 'Product not found' });
        });

});
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, description, imageUrl, quantity } = req.body;
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            {
                name,
                category,
                price,
                description,
                imageUrl,
                quantity,
            },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

app.get('/profile', (req, res) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        try {
            const decoded = jwt.verify(token, jwtSecret);

            const userId = decoded.userId;
            Users.findById(userId)
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ error: 'User not found' });
                    } else {
                        res.status(200).json({ message: 'Profile information', user });
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Failed to fetch profile' });
                });
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
});

app.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;

        await Products.create(newProduct);

        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Failed to add product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});


app.delete('/products/:productId', (req, res) => {
    const productId = req.params.productId;

    // Effectuer les opérations nécessaires pour supprimer le produit avec l'ID donné
    Products.findOneAndDelete({ _id: productId })
        .then((deletedProduct) => {
            if (deletedProduct) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to delete product' });
        });
});

app.put('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;


    const updatedProduct = {
        id: productId,
        quantity: quantity,
    };

    res.json(updatedProduct);
});

/*********************  Users  ***********************/

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});


app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
});


app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findByIdAndDelete(id);
        if (user) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;

        const updatedUser = await Users.findByIdAndUpdate(id, { name, email }, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
});app.post('/users', async (req, res) => {
    try {
        const { firstName, email, lastName } = req.body;

        const defaultPassword = 'password123';
        const defaultPhone = '11111111'

        // Créer un nouvel utilisateur avec le nom, l'email et le mot de passe par défaut
        const newUser = await Users.create({ firstName, email, lastName, phone : defaultPhone, password: defaultPassword });
        console.log(newUser)
        res.status(200).json({ message: 'User added successfully', newUser });
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});



module.exports = app;
