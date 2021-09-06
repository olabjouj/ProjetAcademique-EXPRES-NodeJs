const connection = require('../views/pages/connexion/dbConnect');
const path = require('path');
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { log } = require('console');

class AdminRecettes {

    static getRecettes(req, res) {
        res.render('index')
    }
    static accueilRecette(req, res) {
        let sqlQuery = 'SELECT * FROM Recettes ORDER BY created_at  DESC  LIMIT 3';
        connection.query(sqlQuery, (err, result) => {
            if (err) throw err;
            res.render('pages/accueil', { datas: result, user: req.user })
        })
    }
    static showConnex(req, res) {
        res.render('pages/connexion/connexion')
    }
    static aproposRecette(req, res) {
        let sqlQuery = 'SELECT * FROM Recettes ORDER BY created_at  DESC  LIMIT 6';

        connection.query(sqlQuery, (err, result) => {
            if (err) throw err;
            res.render('pages/apropos', { datas: result })
        })
    }
    static recette(req, res) {
        res.render('pages/recettes', { user: req.user })
    }
    static connexionRecette(req, res) {
        res.render('pages/connexion/admin', { user: req.user })
    }
    static recetteAdmin(req, res) {

        let sqlQuery = 'SELECT * FROM Recettes';

        connection.query(sqlQuery, (err, result) => {
            if (err) throw err;
            res.render('pages/mesRecettes-admin', { datas: result, user: req.user })
        })
    }
    static utilisateurAdmin(req, res) {
        let sqlQuery = 'SELECT * FROM Utilisateurs';

        connection.query(sqlQuery, (err, result) => {
            if (err) throw err;
            res.render('pages/utilisateurs-admin', { datas: result, user: req.user })
        })
    }

    static CommAdmin(req, res) {
        let sqlQuery = 'SELECT * FROM Commentaires';

        connection.query(sqlQuery, (err, result) => {
            if (err) throw err;
            res.render('pages/Comm-Admin', { datas: result, user: req.user })
        })

    }
    static updateUser(req, res) {
        let user = {
            id: req.query.userId,
            admin: req.query.admin,

        }
        let sqlQuery = 'UPDATE Utilisateurs SET ? WHERE id = ?';
        connection.query(sqlQuery, [user, user.id], (err, result) => {
            if (err) throw err;
            else {
                res.status(200).json({ message: 'user updated' })

            }
        });
    }
    static deleteComm(req, res) {
        console.log(' my id deleteComm', req.query.id);

        const idRecette = req.query.id;

        let sqlQuery = 'DELETE FROM Commentaires WHERE idCommentaire = ?';
        connection.query(sqlQuery, [idRecette], (err, result) => {
            if (err) throw err;
            console.log('deleteComm==>', result);
            res.redirect('/admin/commentaire')
        });
    }
    static deleteRecette(req, res) {
        console.log(' my id delete', req.query.id);
        let params = [
            req.body,
            req.query.id
        ]

        let sqlQuery = 'DELETE FROM Recettes ? WHERE id = ?';
        connection.query(sqlQuery, params, (err, result) => {
            if (err) throw err;
            res.redirect('admin/recettes-admin', { user: req.user })
        });

    }
    static deleteUtilisateur(req, res) {
        console.log(' my utilisateur id delete', req.query.id);

        const id = req.query.id;

        let sqlQuery = 'DELETE FROM Utilisateurs WHERE id = ?';
        connection.query(sqlQuery, [id], (err, result) => {
            if (err) throw err;
            console.log('my data is number 1==>', result);
            res.redirect('/admin/utilisateurs-admin')
        });
    }
    static profilAdmin(req, res) {

        console.log('hello  my id profil', req.query.id);
        const idUtilisateur = req.query.id;
        let sqlQuery = 'SELECT * FROM Utilisateurs WHERE id = ?';
        connection.query(sqlQuery, [idUtilisateur], (err, result) => {
            if (err) throw err;
            console.log('my data is profil number 1==>', result);
            res.render('pages/profilAdmin', { datas: result, user: req.user })
        });
    }
}


module.exports = AdminRecettes;