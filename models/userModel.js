const connection = require('../views/pages/connexion/dbConnect');
const util = require('util');

class Users {

    static async getUserById(userId) {
        let rows;
        const query = util.promisify(connection.query).bind(connection);
        try {
            rows = await query('SELECT * FROM Utilisateurs WHERE id = ?', userId);
        } catch (exception) {
            console.error(exception)
            throw exception
        }
        return rows[0];

    }

    static async isUserAdmin(userId) {
        let rows;
        const query = util.promisify(connection.query).bind(connection);
        try {
            rows = await query('SELECT * FROM Utilisateurs WHERE id = ? AND admin=1', userId);
        } catch (exception) {
            console.error(exception)
            throw exception
        }
        return rows.length > 0;
    }

}

module.exports = Users;