const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./views/pages/connexion/dbConnect');
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
var upload = multer({ storage: storage });

dotenv.config({ path: '././.env' });

const cookieParser = require('cookie-parser');
const { rootCertificates } = require('tls');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.static('public'))
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

//----------call Admin Routes--------------//
app.use('/',require('./routes/adminRoutes'))
app.use('/',require('./routes/usersRoutes'))

// -----------------------------------//
app.post('/recettes', upload.single('image'), (req, res) => {
    let data = {
        title: req.body.title,
        text: req.body.text,
        temps_preparation: req.body.temps_preparation,
        temps_repos: req.body.temps_repos,
        temps_cuisson: req.body.temps_cuisson,
        ingredients: req.body.ingredients,
        created_at: new Date(),
        image: req.file.originalname

    }
    console.log('la data de recette' , data)
    if (data.title && data.text && data.ingredients) {
        connection.query('INSERT INTO Recettes SET ?', data, (err, result) => {
            if (err) throw err;
            res.render('pages/recettes', { message: 'Votre recette a été bien ajouter. Merci' })
        });
    } else {
        res.render('pages/recettes', { ErrMessage: 'Vous devez remplir tous les champs. Merci' })
    }
})
app.post('/connexion/sinscrire', upload.single('image'), async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.motDePasse, 8)
    console.log(hashedPassword);
    let data = {
        nom: req.body.firstName,
        prenom: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        motDePasse: hashedPassword,
        image: req.file.originalname
    };
    console.log('voici ma data', data)
    const confirmMotDePasse = req.body.confirmMotDePasse;

    connection.query('SELECT email FROM Utilisateurs WHERE email = ?', [data.email], async (error, results) => {
        console.log('etape1')
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render('pages/connexion/sinscrire', {
                message: 'Ce Mail est déjà utilisé'
            })
        } else if (req.body.motDePasse !== confirmMotDePasse) {
            return res.render('pages/connexion/sinscrire', {
                message: 'Le Mot de passe est incorect'
            });
        }
        connection.query('INSERT INTO Utilisateurs SET ?', data, (error, results) => {
            console.log('etape2')
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('pages/connexion/sinscrire', {
                    message: "L'utilisateur est enregistré"
                });
            }
        })
    });
}) 
app.post('/voirDetailRecette', (req, res) => { 
    console.log('je suis la oumayma' ,req.query.id )
    const idRecette = req.query.id;

    let data = {
        userName: req.body.userName,
        comment : req.body.comment,
        created_at: new Date(),
        idRecette : req.query.id
    }
    console.log('je suis la oumayma' ,data )
    if (data.userName && data.comment) {
        connection.query('INSERT INTO Commentaires SET ?', data, (err, result) => {
            if (err) throw err;
            res.render('pages/connexion/voireDetailRecette', { message: 'Votre commentaire a été bien ajouter. Merci' })
        });
    } else {
        res.render('pages/connexion/voireDetailRecette', { ErrMessage: 'Vous devez remplir tous les champs. Merci' })
    }
})
app.listen(8003, () => {

})
