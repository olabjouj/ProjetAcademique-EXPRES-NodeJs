const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('../views/pages/connexion/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

exports.mesRecettes = (req, res) => {
    let sqlQuery = 'SELECT * FROM Recettes';

    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.render('pages/mesRecettes', { datas: result })
    })
}
exports.showConnexionSinscrire =(req, res) => {
    res.render('pages/connexion/sinscrire')
}

exports.showUpdateRecette =  (req, res) => {
    console.log('hello  my id', req.query.id);
    const idRecette = req.query.id;
    let sqlQuery = 'SELECT * FROM Recettes WHERE id = ?';
    connection.query(sqlQuery, [idRecette], (err, result) => {
        if (err) throw err;
        console.log('my data is number 1==>', result);
        res.render('pages/connexion/updateRecette', { recettes: result })
    });
}
exports.voirDetailRecette =  (req, res) => {
    const idRecette = req.query.id;
    connection.query('SELECT * FROM Recettes WHERE id =?', [idRecette], (error, result1) => {
        connection.query('SELECT * FROM Commentaires WHERE idRecette =?', [idRecette], (error, result2) => {
        if(error) throw error;
        // console.log(result);
       res.render('pages/connexion/voireDetailRecette', {recettes: result1, comments: result2})
    }) 
})
}
exports.updateRecette = (req, res) => {
    console.log('my data is number 2 ==>', req.body)
    let params = [
        req.body,
        req.query.id
    ]
    let sqlQuery = 'UPDATE Recettes SET ? WHERE id = ?';
    connection.query(sqlQuery, params, (err, result) => {
        if (err) throw err;
        res.render('pages/connexion/updateRecette', { message: 'votre recette a été bien Modifier' })
    });
}
exports.deleteRecette = (req, res) => {
    console.log(' my id delete', req.query.id);

    const idRecette = req.query.id;

    let sqlQuery = 'DELETE FROM Recettes WHERE id = ?';
    connection.query(sqlQuery, [idRecette], (err, result) => {
        if (err) throw err;
        console.log('my data is number 1==>', result);
        res.redirect('/recettes-admin')
    });

}
// exports.connexionSinscrire = async (req, res) => {
//     let hashedPassword = await bcrypt.hash(req.body.motDePasse, 8)
//     console.log(hashedPassword);
//     let data = {
//         nom: req.body.firstName,
//         prenom: req.body.lastName,
//         email: req.body.email,
//         telephone: req.body.telephone,
//         motDePasse: hashedPassword,
//         image: req.file.originalname
//     };
//     const confirmMotDePasse = req.body.confirmMotDePasse;

//     connection.query('SELECT email FROM Utilisateurs WHERE email = ?', [data.email], async (error, results) => {
//         console.log('etape1')
//         if (error) {
//             console.log(error)
//         }
//         if (results.length > 0) {
//             return res.render('pages/connexion/sinscrire', {
//                 message: 'Ce Mail est déjà utilisé'
//             })
//         } else if (req.body.motDePasse !== confirmMotDePasse) {
//             return res.render('pages/connexion/sinscrire', {
//                 message: 'Le Mot de passe est incorect'
//             });
//         }
//         connection.query('INSERT INTO Utilisateurs SET ?', data, (error, results) => {
//             console.log('etape2')
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(results);
//                 return res.render('pages/connexion/sinscrire', {
//                     message: "L'utilisateur est enregistré"
//                 });
//             }
//         })
//     });
// }

