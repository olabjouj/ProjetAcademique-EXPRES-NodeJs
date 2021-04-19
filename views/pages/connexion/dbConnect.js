const mysql = require('mysql');

//-----------conexion DB----------------//


const connection = mysql.createConnection({
    host :'localhost',
    user :'root',
    database: 'RecettesAvecRABI',
    password :'Yasserrabi1994@'

});
connection.connect()

module.exports = connection;

