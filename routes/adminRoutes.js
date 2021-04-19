const path = require('path');
const express = require('express');
const app = express();
const connection = require('../views/pages/connexion/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const adminController = require('../controllers/adminController')


//---------------- Admin Routes----------------//

app.get('/', adminController.homePage)
app.get('/accueil', adminController.accueil)
app.get('/connexion', adminController.showConnexion)

app.get('/apropos', adminController.apropos)
app.get('/admin/recettes', adminController.recettes)
app.get('/connexion/admin', adminController.connexionAdmin)
app.get('/admin/recettes-admin', adminController.recettesAdmin)
app.get('/admin/utilisateurs-admin', adminController.utilisateursAdmin)
app.post('/connexion', adminController.connexion)
app.get('/admin/commentaire', adminController.CommAdmin)
app.get('/deleteComm', adminController.deleteComm)
app.get('/deleteUtilisateur', adminController.deleteUtilisateur)
app.get('/admin/profil', adminController.profilAdmin)


module.exports= app ;