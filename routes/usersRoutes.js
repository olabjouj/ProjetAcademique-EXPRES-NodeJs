const path = require('path');
const express = require('express');
const app = express();
const connection = require('../views/pages/connexion/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const userContorller = require('../controllers/userController')
const Authorization = require('../controllers/authorization')

//---------------- User Routes----------------//

app.get('/mesRecettes', userContorller.mesRecettes)
app.get('/connexion/sinscrire', userContorller.showConnexionSinscrire)

app.get('/updateRecette', Authorization.checkLoggin, userContorller.showUpdateRecette)
app.post('/updateRecette', Authorization.checkLoggin, userContorller.updateRecette)


app.get('/voirDetailRecette', userContorller.voirDetailRecette)

// app.get('/deleteRecette', userContorller.deleteRecette)

// app.post('/connexion/sinscrire', upload.single('image'), userContorller.connexionSinscrire)

module.exports = app;