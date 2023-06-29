const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;
const Users = require('../models/Users.js');
const cors = require('cors');
const Products = require("../models/Products.js");

app.use(express.json()); // Middleware pour parser le corps des requêtes en tant que JSON
app.use(cors()); // Autoriser les requêtes cross-origin

// Configuration du middleware de session
app.use(session({
    secret: 'your-secret-key',
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

// Route principale ("/")
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    // Créez une nouvelle instance du modèle User avec les données d'inscription
    const newUsers = new Users({
        firstName,
        lastName,
        phone,
        email,
        password
    });
    console.log(newUsers)

    // Enregistrez l'utilisateur dans la base de données
    newUsers.save()
        .then(() => {
            res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to register user' });
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Recherchez l'utilisateur dans la base de données par son email
    Users.findOne({ email })
        .then((user) => {
            if (!user) {
                // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur
                res.status(404).json({ error: 'User not found' });
            } else {
                // Vérifiez si le mot de passe correspond
                if (user.password === password) {
                    // Stockez l'utilisateur dans la session
                    req.session.user = user;
                    res.status(200).json({ message: 'Login successful' });
                } else {
                    res.status(401).json({ error: 'Invalid password' });
                }
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to login' });
        });
});

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



// Autres routes et logique de l'application...

module.exports = app;
