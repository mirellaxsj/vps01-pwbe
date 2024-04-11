const con = require('../CONNECTION/connect');

const read = (req, res) => {
    con.query('SELECT * FROM Aluguel', (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

const create = (req, res) => {
    const { placa, cpf, reserva, retirada, devolucao, subtotal} = req.body;
    const sql = 'INSERT INTO Aluguel (placa, cpf, reserva, retirada, devolucao, subtotal) VALUES (?,?, ?, ?, ?, ?)';

    con.query(sql, [placa, cpf, reserva, retirada, devolucao, subtotal], (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { placa, cpf, reserva, retirada, devolucao, subtotal } = req.body;
    let query = `UPDATE Aluguel SET placa = ?, cpf = ?, reserva = ?, retirada = ?, devolucao = ?, subtotal = ? WHERE id = ?`;

    con.query(query, [placa, cpf, reserva, retirada, devolucao, subtotal, id], (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

const del = (req, res) => {
    const { id } = req.params;

    con.query('DELETE FROM Aluguel WHERE id = ?', [id], (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result); 
    });
};

const readReservados = (req, res) => {
    con.query('SELECT * FROM vw_alugueis_reservados', (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

const readAlugados = (req, res) => {
    con.query('SELECT * FROM vw_alugueis_em_andamento', (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

const readRelatorio = (req, res) => {
    con.query('SELECT * FROM vw_todos_os_alugueis_com_status', (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    });
};

module.exports = {
    read,
    create,
    update,
    del,
    readReservados,
    readAlugados,
    readRelatorio
};