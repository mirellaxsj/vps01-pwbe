const con = require('../CONNECTION/connect');

const read = (req, res) => {
    con.query('SELECT * FROM Telefone', (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

module.exports = {
    read
}