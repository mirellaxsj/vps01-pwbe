const con = require('../CONNECTION/connect').con;

const create = (req, res) => {
    const { placa, marca, modelo, tipo, diaria } = req.body;

    const sql = `INSERT INTO Veiculo (placa, marca, modelo, tipo, diaria) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [placa, marca, modelo, tipo, diaria], (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(201).json(req.body);
        }
    })
};


const read = (req, res) => {
    const sql = 'SELECT * FROM Veiculo';
    con.query(sql, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    })
};

const update = (req, res) => {
    const { id } = req.params;
    const { placa, marca, modelo, tipo, diaria } = req.body;

    const sql = `UPDATE Veiculo SET placa = ?, marca = ?, modelo = ?, tipo = ?, diaria = ? WHERE id = ?`;
    con.query(sql, [placa, marca, modelo, tipo, diaria, id], (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(req.body);
        }
    })
};

const del = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Veiculo WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(req.body);
        }
    })
}

module.exports = {
    create,
    read,
    update,
    del
}