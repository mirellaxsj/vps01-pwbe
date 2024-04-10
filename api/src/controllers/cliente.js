const con = require ('../connect/mysql');

const addCliente = (req, res) => {
    
    const { cpf, nome_cliente } = req.body;
    if (cpf && nome_cliente) {
        con.query('INSERT INTO cliente (cpf, nome_cliente) VALUES (?, ?)',
            [cpf, nome_cliente],
            (err, result) => {
                if (err) {
                    console.error('Erro ao adicionar cliente:', err);
                    res.status(500).json({ error: 'Erro ao adicionar cliente' });
                } else {
                    const newEmployee = { cpf, nome_cliente };
                    res.status(201).json(newEmployee);
                }
            });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }

};

// CRUD - READ

const getClientes = (req, res) => {

    con.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar clientes' });
        } else {
            res.json(result);
        }
    });

}

const getCliente = (req, res) => {
    const sql = "SELECT * FROM cliente WHERE cpf LIKE ?";
    con.query(sql, `%${[req.params.cpf]}%`, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}

// CRUD - UPDATE

const updateCliente = (req, res) => {

    const { cpf, nome_cliente } = req.body;
    if (cpf && nome_cliente) {
        con.query('UPDATE cliente SET nome_cliente = ? WHERE cpf = ?', 
        [nome_cliente, cpf], 
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(req.body);
            }
        });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }

}

// CRUD - DELETE

const deleteCliente = (req, res) => {
    
    const { cpf } = req.params;
    if (cpf) {
        con.query('DELETE FROM cliente WHERE cpf = ?', [cpf], (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Cliente não encontrado' });
                } else {
                    res.status(200).json({ message: 'Cliente removido com sucesso' });
                }
            }
        });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }
    
}

module.exports = {
    addCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente
}