/*
Le app.js reste le plus simple possible
On initialise ici la connexion à MongoDB,
On utilise le package CORS en acceptant toute"s les origines et en exposant le header "Authorization"
(pour récupérer le token de l'utilisateur côté client),
On déclare notre route principale avec pour url de base "/",
On ajoute un retour en cas de requête sur une route inexistante (404).
*/

// import du module express 
const express       = require('express');
// import du module cookie-parser pour travailler avec les cookies
const cookieParser  = require('cookie-parser');
// import du module morgan pour travailler avec les logs
const logger        = require('morgan');
// import du module cors pour récupérer le token côté client
const cors          = require('cors');

// import du fichier de route index.js
const indexRouter = require('./routes/index');
// import du fichier de connexion à MongoDB
const mongodb     = require('./db/mongo');
const { stat } = require('fs');

// initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

// initialisation de l'application express
const app = express();

// déclaration des middlewares utilisées par l'application
// On commence par le middleware qui utilise le module cors
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: "*"
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// la racine de l'application utilisera la route déclarée dans index.js
app.use('/', indexRouter);
// retour sur route inexistante
app.use((req, res, next) => {
    res.status(404).json({name: "API", version: "1.0", status: "error", message: "not_found"});
});

// on exporte l'application qui sera utilisée par le fichier www qui démarre le serveur
module.exports = app;
