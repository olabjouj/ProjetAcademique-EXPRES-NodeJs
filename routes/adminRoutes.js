const path = require('path');
const express = require('express');
const app = express();
const connection = require('../views/pages/connexion/dbConnect');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const adminController = require('../controllers/adminController')
const Authorization = require('../controllers/authorization')
const Authentication = require('../controllers/authentication')

//---------------- Admin Routes----------------//

app.get('/', adminController.homePage)
app.get('/accueil', adminController.accueil)

// Show login page
app.get('/connexion', adminController.showConnexion)
// Check login credentials
app.post('/connexion', adminController.connexion)

app.get('/apropos', adminController.apropos)
app.get('/admin/recettes',Authorization.checkLoggin,adminController.recettes)
app.get('/connexion/admin', Authorization.checkLoggin,adminController.connexionAdmin)
app.get('/admin/recettes-admin', Authorization.checkLoggin,Authorization.isAdmin, adminController.recettesAdmin)
app.get('/admin/utilisateurs-admin',Authorization.checkLoggin, Authorization.isAdmin,adminController.utilisateursAdmin)
app.get('/admin/commentaire', Authorization.checkLoggin,Authorization.isAdmin,adminController.CommAdmin)
app.get('/deleteComm',Authorization.checkLoggin,Authorization.isAdmin, adminController.deleteComm)
app.get('/deleteRecette', Authorization.checkLoggin,Authorization.isAdmin,adminController.deleteRecette)
app.get('/deleteUtilisateur', Authorization.checkLoggin,Authorization.isAdmin,adminController.deleteUtilisateur)
app.get('/admin/profil',Authorization.checkLoggin, adminController.profilAdmin)
app.get('/logout',Authorization.checkLoggin, Authentication.logout)
app.post('/updateUser',Authorization.checkLoggin,Authorization.isAdmin,adminController.updateUser)

module.exports= app ;