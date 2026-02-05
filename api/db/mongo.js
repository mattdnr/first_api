const { MongoDBNamespace } = require('mongodb');
const mongoose = require('mongoose');

const clientOptions = {
    dbName          : 'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        /* ATTENTION : il faut ajouter la variable d'environnement URL_MONGO dans
        le fichier .env ; La variable prend pour valeur la chaîne de connexion de votre cluster mongoDB.
        */
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
};