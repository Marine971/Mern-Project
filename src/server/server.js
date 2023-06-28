const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const User = require('./src/models/User');

app.use(express.json()); // Middleware pour parser le corps des requêtes en tant que JSON

// Connexion à la base de données MongoDB
const dbURI = "mongodb+srv://marine:TjDG1LsIFcvtbceV@cluster0.cinj6vw.mongodb.net/";

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
    const newUser = new User({
        firstName,
        lastName,
        phone,
        email,
        password
    });

    // Enregistrez l'utilisateur dans la base de données
    newUser.save()
        .then(() => {
            res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to register user' });
        });
});

// Autres routes et logique de l'application...

module.exports = app;
