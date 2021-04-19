const path = require('path');
const express = require('express');
const app = express();
const connection = require('../views/pages/connexion/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const AdminRecettes = require ('../models/adminModel')

exports.homePage = (req, res) => {
    AdminRecettes.getRecettes(req, res)
}
exports.accueil = (req, res) => {
    AdminRecettes.accueilRecette(req, res)
}
exports.showConnexion = (req, res) => {
    AdminRecettes.showConnex (req, res)
}
exports.apropos =(req, res) => {
    AdminRecettes.aproposRecette(req , res)
}
exports.recettes = (req, res) => {
    AdminRecettes.recette (req,res)
}
exports.connexionAdmin = (req, res) => {
    AdminRecettes.connexionRecette(req,res)
}
exports.recettesAdmin = (req, res) => {
    AdminRecettes.recetteAdmin(req,res)
}
exports.utilisateursAdmin =(req, res) => {
    AdminRecettes.utilisateurAdmin(req,res)
}
exports.connexion = async (req, res) => {
   AdminRecettes.connex(req,res)
}
exports.CommAdmin =(req, res) => {
    AdminRecettes.CommAdmin(req,res)
}

exports.deleteComm = (req, res) => { 
     AdminRecettes.deleteComm (req,res)

}
exports.deleteUtilisateur = (req, res) => { 
    AdminRecettes.deleteUtilisateur (req,res)

}
exports.profilAdmin = (req, res) => { 
    AdminRecettes.profilAdmin (req,res)

}

