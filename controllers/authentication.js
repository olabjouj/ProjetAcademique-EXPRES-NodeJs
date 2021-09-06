
const jwt = require('jsonwebtoken');
const connection = require('../views/pages/connexion/dbConnect');
const bcrypt = require('bcryptjs');

class Authentication {

    static logout(req, res) {
        const cookieOptions = {
            expires: new Date(Date.now()),
            httpOnly: true
        }
        res.cookie('jwt', 'expired_token_holder', cookieOptions)
        res.redirect("/connexion");
    }

    static login(req, res) {
        try {
            let data = {
                email: req.body.email,
                motDePasse: req.body.motDePasse,
            }
            if (!data.email || !data.motDePasse) {
                return res.status(400).render('pages/connexion/connexion', {
                    message: 'Vérifiez ton mail ou mot de passe SVP'
                })
            } else {
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
                        console.debug('The token is: ' + token);

                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                            ),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookieOptions)
                        res.redirect("/connexion/admin");
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = Authentication;