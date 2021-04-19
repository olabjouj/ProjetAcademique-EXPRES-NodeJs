const connection = require('../views/pages/connexion/dbConnect');
const path = require('path');
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

class AdminRecettes {

    static getRecettes(req, res){
        res.render('index')
    }
    static accueilRecette(req, res){
        let sqlQuery = 'SELECT * FROM Recettes ORDER BY created_at  DESC  LIMIT 3';
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.render('pages/accueil', { datas: result })
    })
    }
    static showConnex (req, res){
        res.render('pages/connexion/connexion')
    }
    static aproposRecette(req , res){
        let sqlQuery = 'SELECT * FROM Recettes ORDER BY created_at  DESC  LIMIT 6';

    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.render('pages/apropos', { datas: result })
    })
    }
    static recette (req,res){
        res.render('pages/recettes')
    }
    static connexionRecette(req,res){
        res.render('pages/connexion/admin')
    }
    static recetteAdmin(req,res){
        let sqlQuery = 'SELECT * FROM Recettes';

    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.render('pages/mesRecettes-admin', { datas: result })
    })
    }
    static utilisateurAdmin(req,res){
        let sqlQuery = 'SELECT * FROM Utilisateurs';

    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.render('pages/utilisateurs-admin', { datas: result })
    })
    }
    static connex(req,res){
        try {
            let data = {
                email: req.body.email,
                motDePasse: req.body.motDePasse,
            }
            if (!data.email || !data.motDePasse) {
                return res.status(400).render('pages/connexion/connexion', {
                    message: 'Vérifiez ton mail ou mot de passe SVP'
                })
            }
            console.log('etape3', data)
            connection.query('SELECT * FROM Utilisateurs WHERE email = ?', [data.email], async (error, resultas) => {
                console.log('voila mon console', resultas);
                if (resultas.length < 1 || !(await bcrypt.compare(data.motDePasse, resultas[0].motDePasse))) {
    
                    res.status(401).render('pages/connexion/connexion', {
                        message: 'Le mail ou le mot de passe est incorrect'
                    })
                } else {
                    const id = resultas[0].id;
    
                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    console.log('The token is: ' + token);
    
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                        ),
                        httpOnly: true
                    }
                    console.log('le fedrinier toto')
                    res.redirect("/connexion/admin");
                    res.cookie('jwt', token, cookieOptions)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    static CommAdmin(req,res){
        let sqlQuery = 'SELECT * FROM Commentaires';

    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.render('pages/Comm-Admin', { datas: result })
    })
    
    }
    static deleteComm(req,res){
        console.log(' my id deleteComm', req.query.id);

    const idRecette = req.query.id;

    let sqlQuery = 'DELETE FROM Commentaires WHERE idCommentaire = ?';
    connection.query(sqlQuery, [idRecette], (err, result) => {
        if (err) throw err;
        console.log('deleteComm==>', result);
        res.redirect('/commentaire')
    });
    }
    static deleteUtilisateur (req, res){
        console.log(' my utilisateur id delete', req.query.id);

    const id = req.query.id;

    let sqlQuery = 'DELETE FROM Utilisateurs WHERE id = ?';
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) throw err;
        console.log('my data is number 1==>', result);
        res.redirect('/utilisateurs-admin')
    });
    }
    static profilAdmin (req, res) {
        
        console.log('hello  my id profil', req.query.id);
    const idUtilisateur = req.query.id;
    let sqlQuery = 'SELECT * FROM Utilisateurs WHERE id = ?';
    connection.query(sqlQuery, [idUtilisateur], (err, result) => {
        if (err) throw err;
        console.log('my data is profil number 1==>', result);
        res.render('pages/profilAdmin', { datas: result })
    });
    }
}


module.exports = AdminRecettes ;