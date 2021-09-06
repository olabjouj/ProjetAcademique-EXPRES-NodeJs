const mysql = require('mysql');

//-----------conexion DB----------------//


const connection = mysql.createConnection({
    host :'localhost',
    user :'recette_avec_rabi_db_user_name',
    database: 'RecettesAvecRABI',
    password :'Yasserrabi1994@'

});
connection.connect()

module.exports = connection;

