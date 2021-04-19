const path = require('path');
const express = require('express');
const app = express();
const connection = require('../views/pages/connexion/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const userContorller = require('../controllers/userController')

//---------------- User Routes----------------//

app.get('/mesRecettes', userContorller.mesRecettes)
app.get('/connexion/sinscrire', userContorller.showConnexionSinscrire)

app.get('/updateRecette', userContorller.showUpdateRecette)
app.get('/voirDetailRecette', userContorller.voirDetailRecette)

app.post('/updateRecette', userContorller.updateRecette)
app.get('/deleteRecette', userContorller.deleteRecette)

// app.post('/connexion/sinscrire', upload.single('image'), userContorller.connexionSinscrire)

module.exports= app ;